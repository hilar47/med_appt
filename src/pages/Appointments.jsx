import React, { useState } from 'react'
import FindDoctorSearch from '../components/FindDoctorSearch.jsx'
import AppointmentForm from '../components/AppointmentForm.jsx'
import AppointmentFormIC from '../components/AppointmentFormIC.jsx'
import DoctorCard from '../components/DoctorCard.jsx'
import GiveReviews from '../components/GiveReviews.jsx'

function Appointments() {
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [myAppointments, setMyAppointments] = useState([])

  const handleBooked = (appointment) => {
    if (appointment) setMyAppointments((prev) => [...prev, appointment])
  }

  const handleCancelled = (appointmentId) => {
    setMyAppointments((prev) => prev.filter((a) => a.id !== appointmentId))
  }

  return (
    <div className="page">
      <h1>Book an appointment</h1>
      <p>Search for a doctor, or request a call back if you're not sure who to see yet.</p>

      <FindDoctorSearch onSelectDoctor={setSelectedDoctor} />

      <div className="appointments-layout">
        <div>
          <AppointmentForm doctor={selectedDoctor} onBooked={handleBooked} />

          {myAppointments.length > 0 && (
            <div style={{ marginTop: 'var(--space-5)' }}>
              <h3>Your appointments</h3>
              {myAppointments.map((appointment) => (
                <DoctorCard
                  key={appointment.id}
                  doctor={selectedDoctor || { name: 'Your doctor' }}
                  appointment={appointment}
                  onCancelled={handleCancelled}
                />
              ))}
            </div>
          )}

          {selectedDoctor && (
            <div style={{ marginTop: 'var(--space-5)' }}>
              <GiveReviews doctor={selectedDoctor} />
            </div>
          )}
        </div>

        <div>
          <AppointmentFormIC />
        </div>
      </div>
    </div>
  )
}

export default Appointments
