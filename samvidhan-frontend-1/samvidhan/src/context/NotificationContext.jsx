import React, { createContext, useState, useCallback } from 'react'

export const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount]     = useState(0)

  const addNotification = useCallback((notif) => {
    setNotifications(prev => [notif, ...prev])
    if (!notif.read) setUnreadCount(c => c + 1)
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }, [])

  const markRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
    setUnreadCount(c => Math.max(0, c - 1))
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, addNotification, markAllRead, markRead, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  )
}
