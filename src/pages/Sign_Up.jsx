import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/api.js'
import { useNotification } from '../context/NotificationContext.jsx'

const initialState = {
  role: 'patient',
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your full name.'
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!/^\+?[0-9\s-]{7,15}$/.test(values.phone)) errors.phone = 'Enter a valid phone number.'
  if (values.password.length < 8) errors.password = 'Password must be at least 8 characters.'
  if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match.'
  return errors
}

function Sign_Up() {
  const navigate = useNavigate()
  const { notify } = useNotification()
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setServerError('')

    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    try {
      // registerUser() is the call to the registration API (Task 5).
      await registerUser({
        role: values.role,
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      })
      notify('Account created. You can now log in.', 'success')
      navigate('/login')
    } catch (err) {
      setServerError(err.message || 'Registration failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page page--narrow">
      <div className="panel">
        <p className="eyebrow-label">Create your account</p>
        <h1>Join StayHealthy</h1>
        <p>Register as a patient or doctor to start booking and managing appointments.</p>

        {serverError && <div className="status-banner status-banner--error">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="role">Role</label>
            <select id="role" name="role" value={values.role} onChange={handleChange}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" type="text" value={values.name} onChange={handleChange} autoComplete="name" />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </div>

          <div className="field">
            <label htmlFor="phone">Phone number</label>
            <input id="phone" name="phone" type="tel" value={values.phone} onChange={handleChange} autoComplete="tel" />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.password ? (
              <span className="field-error">{errors.password}</span>
            ) : (
              <span className="field-hint">At least 8 characters.</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.confirmPassword && <span className="field-error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="form-footer-note">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default Sign_Up
