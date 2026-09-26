// Central place for all back-end calls. Point this at your real API
// once it's deployed — every component below imports from here rather
// than calling fetch() directly, so this is the only file you need to
// change to switch environments.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

async function handleResponse(response) {
  const contentType = response.headers.get('content-type') || ''
  const body = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    const message = (body && body.message) || `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return body
}

/**
 * Registers a new user.
 * Expected payload: { role, name, email, phone, password }
 */
export async function registerUser(payload) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(response)
}

/**
 * Authenticates a user.
 * Expected payload: { email, password }
 */
export async function loginUser(payload) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(response)
}

/** Clears the locally stored session. Server-side token invalidation, if any, happens here too. */
export async function logoutUser() {
  localStorage.removeItem('stayhealthy_token')
  localStorage.removeItem('stayhealthy_user')
  return true
}

/** Searches doctors by name, specialty, and/or location. */
export async function searchDoctors(query) {
  const params = new URLSearchParams(query)
  const response = await fetch(`${API_BASE_URL}/doctors/search?${params.toString()}`)
  return handleResponse(response)
}

/** Books an appointment. */
export async function bookAppointment(payload) {
  const response = await fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(response)
}

/** Cancels an existing appointment. */
export async function cancelAppointment(appointmentId) {
  const response = await fetch(`${API_BASE_URL}/appointments/${appointmentId}`, {
    method: 'DELETE',
  })
  return handleResponse(response)
}

/** Submits a patient review for a doctor. */
export async function submitReview(payload) {
  const response = await fetch(`${API_BASE_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(response)
}

/** Updates the logged-in patient's profile. */
export async function updateProfile(userId, payload) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse(response)
}
