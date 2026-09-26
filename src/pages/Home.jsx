import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page">
      <section className="hero">
        <p className="eyebrow-label">StayHealthy · Go Digital initiative</p>
        <h1>Talk to a doctor, wherever you are.</h1>
        <p className="hero__tagline">
          StayHealthy connects patients in remote and underserved areas with doctors anytime, from anywhere —
          no clinic visit required to get started.
        </p>
        <div className="hero__actions">
          <Link to="/appointments" className="btn btn-primary">
            Book an appointment
          </Link>
          <Link to="/signup" className="btn btn-secondary">
            Create an account
          </Link>
        </div>
      </section>

      <section className="value-grid">
        <div className="panel">
          <h3>Find a doctor nearby</h3>
          <p>Search by name, specialty, or location and see who's available this week.</p>
        </div>
        <div className="panel">
          <h3>Book in minutes</h3>
          <p>Pick a date and time, or request a call back if you'd rather speak to a coordinator first.</p>
        </div>
        <div className="panel">
          <h3>Keep your care in one place</h3>
          <p>Your appointments, doctors, and reviews live in a single, simple profile.</p>
        </div>
      </section>
    </div>
  )
}

export default Home
