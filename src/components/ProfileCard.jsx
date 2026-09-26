import React, { useState } from 'react'
import { updateProfile } from '../api/api.js'
import { useNotification } from '../context/NotificationContext.jsx'
import './ProfileCard.css'

function ProfileCard({ user }) {
  const { notify } = useNotification()
  const [editing, setEditing] = useState(false)
  const [values, setValues] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  })
  const [saving, setSaving] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (event) => {
    event.preventDefault()
    setSaving(true)
    try {
      await updateProfile(user?.id, values)
      notify('Profile updated.', 'success')
      setEditing(false)
    } catch (err) {
      notify(err.message || 'Could not save your changes.', 'error')
    } finally {
      setSaving(false)
    }
  }

  if (editing) {
    return (
      <form className="panel profile-card" onSubmit={handleSave}>
        <h3>Edit profile</h3>

        <div className="field">
          <label htmlFor="profile-name">Name</label>
          <input id="profile-name" name="name" type="text" value={values.name} onChange={handleChange} />
        </div>

        <div className="field">
          <label htmlFor="profile-email">Email</label>
          <input id="profile-email" name="email" type="email" value={values.email} onChange={handleChange} />
        </div>

        <div className="field">
          <label htmlFor="profile-phone">Phone number</label>
          <input id="profile-phone" name="phone" type="tel" value={values.phone} onChange={handleChange} />
        </div>

        <div className="profile-card__actions">
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving…' : 'Save changes'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)} disabled={saving}>
            Cancel
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="panel profile-card">
      <div className="profile-card__avatar" aria-hidden="true">
        {values.name?.[0] ?? '?'}
      </div>
      <h3>{values.name || 'Your name'}</h3>
      <p>{values.email}</p>
      <p>{values.phone}</p>
      <button type="button" className="btn btn-secondary" onClick={() => setEditing(true)}>
        Edit profile
      </button>
    </div>
  )
}

export default ProfileCard
