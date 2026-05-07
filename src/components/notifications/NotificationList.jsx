import React from 'react'
import useNotifications from '../../hooks/useNotifications.js'
import NotificationCard from './NotificationCard.jsx'

export default function NotificationList({ onClose }) {
  const { notifications, markAllRead } = useNotifications()

  return (
    <div className="notif-dropdown">
      <div className="notif-header">
        <span className="notif-title">Notifications</span>
        <span
          style={{ fontSize: 10, color: 'var(--gold)', cursor: 'pointer', fontFamily: 'Cinzel, serif', letterSpacing: 1 }}
          onClick={markAllRead}
        >
          Mark all read
        </span>
      </div>
      {notifications.length === 0 ? (
        <div style={{ padding: '24px 16px', textAlign: 'center', color: 'var(--silver)', fontSize: 12 }}>
          No notifications
        </div>
      ) : (
        notifications.slice(0, 6).map(n => <NotificationCard key={n.id} notification={n} />)
      )}
    </div>
  )
}
