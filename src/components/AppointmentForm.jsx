import React, { useState } from 'react'
import { bookAppointment } from '../api/api.js'
import { useNotification } from '../context/NotificationContext.jsx'

/**
 * Full appointment booking form — Name, Phone Number, Date and Time (Task 18).
 * Used when booking directly with a chosen doctor.
 */
function AppointmentForm({ doctor, onBooked }) {
  const { notify } = useNotification()
  const [values, setValues] = useState({ name: '', phone: '', date: '', time: '' })
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
    if (!values.date) nextErrors.date = 'Please choose a date.'
    if (!values.time) nextErrors.time = 'Please choose a time.'
    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    try {
      const appointment = await bookAppointment({ doctorId: doctor?.id, ...values })
      notify('Appointment booked. We will send a reminder before your visit.', 'success')
      setValues({ name: '', phone: '', date: '', time: '' })
      onBooked?.(appointment)
    } catch (err) {
      notify(err.message || 'Could not book the appointment. Please try again.', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="panel" onSubmit={handleSubmit} noValidate>
      <h3>Book an appointment{doctor ? ` with ${doctor.name}` : ''}</h3>

      <div className="field">
        <label htmlFor="appt-name">Name</label>
        <input id="appt-name" name="name" type="text" value={values.name} onChange={handleChange} />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="field">
        <label htmlFor="appt-phone">Phone number</label>
        <input id="appt-phone" name="phone" type="tel" value={values.phone} onChange={handleChange} />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </div>

      <div className="field">
        <label htmlFor="appt-date">Date</label>
        <input id="appt-date" name="date" type="date" value={values.date} onChange={handleChange} />
        {errors.date && <span className="field-error">{errors.date}</span>}
      </div>

      <div className="field">
        <label htmlFor="appt-time">Time</label>
        <input id="appt-time" name="time" type="time" value={values.time} onChange={handleChange} />
        {errors.time && <span className="field-error">{errors.time}</span>}
      </div>

      <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
        {submitting ? 'Booking…' : 'Confirm appointment'}
      </button>
    </form>
  )
}

export default AppointmentForm
