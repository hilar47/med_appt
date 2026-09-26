import React from 'react'
import { useNotification } from '../context/NotificationContext.jsx'
import './Notification.css'

/**
 * Renders every active toast notification. Mounted once in App.jsx so any
 * component in the tree can call useNotification().notify(...) and have it
 * show up in the same place, application-wide.
 */
function Notification() {
  const { notifications, dismiss } = useNotification()

  if (notifications.length === 0) return null

  return (
    <div className="notification-stack" role="status" aria-live="polite">
      {notifications.map((n) => (
        <div key={n.id} className={`notification-toast notification-toast--${n.type}`}>
          <span>{n.message}</span>
          <button
            type="button"
            className="notification-toast__close"
            aria-label="Dismiss notification"
            onClick={() => dismiss(n.id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  )
}

export default Notification
