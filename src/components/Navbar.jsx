import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../api/api.js'
import { useNotification } from '../context/NotificationContext.jsx'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const { notify } = useNotification()
  const [menuOpen, setMenuOpen] = useState(false)

  // In a real deployment this comes from an auth/user context.
  // Kept local + simple here so the component is self-contained.
  const storedUser = typeof window !== 'undefined' ? localStorage.getItem('stayhealthy_user') : null
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(storedUser))

  const handleLogout = async () => {
    try {
      await logoutUser()
      setIsLoggedIn(false)
      notify('You have been logged out.', 'success')
      navigate('/login')
    } catch (err) {
      notify(err.message || 'Could not log out. Please try again.', 'error')
    }
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" onClick={() => setMenuOpen(false)}>
          StayHealthy
        </Link>

        <button
          type="button"
          className="navbar__toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/appointments" onClick={() => setMenuOpen(false)}>
            Appointment
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <button type="button" className="btn btn-secondary navbar__logout" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar__login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary navbar__signup" onClick={() => setMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
