import React from 'react'
import { timeAgo } from '../../utils/formatDate.js'
import useNotifications from '../../hooks/useNotifications.js'

export default function NotificationCard({ notification }) {
  const { markRead } = useNotifications()
  const { id, text, message, createdAt, read } = notification

  return (
    <div className="notif-item" onClick={() => !read && markRead(id)}>
      {!read && <div className="notif-dot" />}
      <div style={{ flex: 1 }}>
        <div className="notif-text">{text || message}</div>
        <div className="notif-time">{timeAgo(createdAt)}</div>
      </div>
    </div>
  )
}
