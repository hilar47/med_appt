import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/api.js'
import { useNotification } from '../context/NotificationContext.jsx'

function Login() {
  const navigate = useNavigate()
  const { notify } = useNotification()
  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = 'Enter a valid email address.'
    if (!values.password) nextErrors.password = 'Enter your password.'
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setServerError('')

    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    try {
      // loginUser() invokes the login authentication API (Task 6).
      const result = await loginUser(values)
      if (result?.token) localStorage.setItem('stayhealthy_token', result.token)
      if (result?.user) localStorage.setItem('stayhealthy_user', JSON.stringify(result.user))
      notify('Welcome back!', 'success')
      navigate('/')
    } catch (err) {
      setServerError(err.message || 'Invalid email or password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page page--narrow">
      <div className="panel">
        <p className="eyebrow-label">Welcome back</p>
        <h1>Log in to StayHealthy</h1>
        <p>Access your appointments, doctors, and health records.</p>

        {serverError && <div className="status-banner status-banner--error">{serverError}</div>}

        <form onSubmit={handleSubmit} noValidate>
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
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            {errors.password && <span className="field-error">{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="form-footer-note">
          New to StayHealthy? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
