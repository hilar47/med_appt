import React, { useState } from 'react'
import { cancelAppointment } from '../api/api.js'
import { useNotification } from '../context/NotificationContext.jsx'
import './DoctorCard.css'

/**
 * Shows a doctor's summary. When `appointment` is passed (i.e. this card is
 * rendered inside "My appointments" rather than search results), it also
 * exposes cancel-appointment logic (Task 19).
 */
function DoctorCard({ doctor, appointment, onSelect, onCancelled }) {
  const { notify } = useNotification()
  const [cancelling, setCancelling] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  const handleCancel = async () => {
    if (!appointment) return
    const confirmed = window.confirm('Cancel this appointment? This cannot be undone.')
    if (!confirmed) return

    setCancelling(true)
    try {
      await cancelAppointment(appointment.id)
      setCancelled(true)
      notify('Appointment cancelled.', 'success')
      onCancelled?.(appointment.id)
    } catch (err) {
      notify(err.message || 'Could not cancel the appointment. Please try again.', 'error')
    } finally {
      setCancelling(false)
    }
  }

  return (
    <article className="doctor-card">
      <div className="doctor-card__avatar" aria-hidden="true">
        {doctor.name?.[0] ?? '?'}
      </div>
      <div className="doctor-card__body">
        <h3>{doctor.name}</h3>
        <p className="doctor-card__meta">
          {doctor.specialty} {doctor.location ? `· ${doctor.location}` : ''}
        </p>

        {appointment && (
          <p className="field-hint">
            Appointment on {appointment.date} at {appointment.time}
            {cancelled && ' — cancelled'}
          </p>
        )}

        <div className="doctor-card__actions">
          {onSelect && !appointment && (
            <button type="button" className="btn btn-primary" onClick={() => onSelect(doctor)}>
              Book appointment
            </button>
          )}
          {appointment && !cancelled && (
            <button type="button" className="btn btn-danger" onClick={handleCancel} disabled={cancelling}>
              {cancelling ? 'Cancelling…' : 'Cancel appointment'}
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

export default DoctorCard
