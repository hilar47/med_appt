import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { NotificationProvider } from './context/NotificationContext.jsx'
import Notification from './components/Notification.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Sign_Up from './pages/Sign_Up.jsx'
import Login from './pages/Login.jsx'
import Appointments from './pages/Appointments.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  return (
    // NotificationProvider + <Notification /> are mounted once here, above
    // the router, so any page or component in the app can call
    // useNotification().notify(...) and the toast shows up application-wide.
    <NotificationProvider>
      <Navbar />
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Sign_Up />} />
        <Route path="/login" element={<Login />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </NotificationProvider>
  )
}

export default App
