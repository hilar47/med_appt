import React from 'react'
import ProfileCard from '../components/ProfileCard.jsx'

function Profile() {
  let storedUser = null
  try {
    storedUser = JSON.parse(localStorage.getItem('stayhealthy_user') || 'null')
  } catch {
    storedUser = null
  }

  return (
    <div className="page">
      <h1>Your profile</h1>
      <ProfileCard user={storedUser || { name: '', email: '', phone: '' }} />
    </div>
  )
}

export default Profile
