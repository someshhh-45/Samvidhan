import React, { useState, useRef, useEffect } from 'react'
import useNotifications from '../../hooks/useNotifications.js'
import NotificationList from './NotificationList.jsx'

export default function NotificationBell() {
  const { unreadCount } = useNotifications()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="notif-bell" ref={ref}>
      <span style={{ fontSize: 20, color: 'var(--silver)' }} onClick={() => setOpen(o => !o)}>
        🔔
      </span>
      {unreadCount > 0 && <span className="notif-count">{unreadCount > 9 ? '9+' : unreadCount}</span>}
      {open && <NotificationList onClose={() => setOpen(false)} />}
    </div>
  )
}
