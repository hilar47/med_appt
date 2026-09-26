import React, { useState } from 'react'
import { searchDoctors } from '../api/api.js'
import { useNotification } from '../context/NotificationContext.jsx'
import DoctorCard from './DoctorCard.jsx'

const SPECIALTIES = ['Any specialty', 'General physician', 'Pediatrics', 'Gynecology', 'Dermatology', 'Cardiology']

function FindDoctorSearch({ onSelectDoctor }) {
  const { notify } = useNotification()
  const [name, setName] = useState('')
  const [specialty, setSpecialty] = useState('Any specialty')
  const [location, setLocation] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (event) => {
    event.preventDefault()
    setLoading(true)
    setHasSearched(true)
    try {
      // searchDoctors() implements the doctor search functionality (Task 8).
      const query = {
        ...(name && { name }),
        ...(specialty !== 'Any specialty' && { specialty }),
        ...(location && { location }),
      }
      const doctors = await searchDoctors(query)
      setResults(Array.isArray(doctors) ? doctors : doctors?.results || [])
    } catch (err) {
      notify(err.message || 'Could not search doctors right now.', 'error')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="doctor-search">
      <form className="doctor-search__form" onSubmit={handleSearch}>
        <div className="field">
          <label htmlFor="doctor-name">Doctor name</label>
          <input
            id="doctor-name"
            type="text"
            placeholder="e.g. Dr. Amara Obi"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="specialty">Specialty</label>
          <select id="specialty" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            {SPECIALTIES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            placeholder="Town, district or clinic"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Searching…' : 'Search doctors'}
        </button>
      </form>

      <div className="doctor-search__results">
        {hasSearched && !loading && results.length === 0 && (
          <p className="field-hint">No doctors matched that search. Try a broader specialty or location.</p>
        )}
        {results.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} onSelect={onSelectDoctor} />
        ))}
      </div>
    </section>
  )
}

export default FindDoctorSearch
