import React, { useState } from 'react'
import { bookAppointment } from '../api/api.js'
import { useNotification } from '../context/NotificationContext.jsx'

/**
 * Instant-consultation request form — deliberately short: only Name and
 * Phone Number (Task 10). Used for the "request a call back" flow, where a
 * coordinator arranges the date and time by phone rather than the patient
 * picking a slot online.
 */
function AppointmentFormIC({ onRequested }) {
  const { notify } = useNotification()
  const [values, setValues] = useState({ name: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!/^\+?[0-9\s-]{7,15}$/.test(values.phone)) nextErrors.phone = 'Enter a valid phone number.'
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    try {
      const request = await bookAppointment({ ...values, type: 'instant_consultation' })
      notify('Request received. A coordinator will call you shortly.', 'success')
      setValues({ name: '', phone: '' })
      onRequested?.(request)
    } catch (err) {
      notify(err.message || 'Could not send the request. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="panel" onSubmit={handleSubmit} noValidate>
      <h3>Request a call back</h3>
      <p>Leave your name and number — a StayHealthy coordinator will call to arrange your consultation.</p>

      <div className="field">
        <label htmlFor="ic-name">Name</label>
        <input id="ic-name" name="name" type="text" value={values.name} onChange={handleChange} />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="field">
        <label htmlFor="ic-phone">Phone number</label>
        <input id="ic-phone" name="phone" type="tel" value={values.phone} onChange={handleChange} />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
        {submitting ? 'Sending…' : 'Request call back'}
      </button>
    </form>
  )
}

export default AppointmentFormIC
