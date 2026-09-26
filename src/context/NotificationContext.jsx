import React, { createContext, useCallback, useContext, useState } from 'react'

const NotificationContext = createContext(null)

let idCounter = 0

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const dismiss = useCallback((id) => {
    setNotifications((current) => current.filter((n) => n.id !== id))
  }, [])

  const notify = useCallback(
    (message, type = 'info', duration = 4000) => {
      const id = ++idCounter
      setNotifications((current) => [...current, { id, message, type }])
      if (duration) {
        setTimeout(() => dismiss(id), duration)
      }
      return id
    },
    [dismiss],
  )

  return (
    <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}
