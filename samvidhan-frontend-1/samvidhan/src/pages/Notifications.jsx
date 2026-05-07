import React, { useEffect } from 'react'
import useNotifications from '../hooks/useNotifications.js'
import notificationService from '../services/notificationService.js'
import { timeAgo } from '../utils/formatDate.js'
import EmptyState from '../components/common/EmptyState.jsx'

const MOCK_NOTIFS = [
  { id: 1, text: 'CIS-2024-0841 has been assigned to you for review.',           createdAt: new Date(Date.now() - 3600000).toISOString(),  read: false },
  { id: 2, text: 'Deadline reminder: Art. 47 Compliance due in 3 days.',          createdAt: new Date(Date.now() - 7200000).toISOString(),  read: false },
  { id: 3, text: 'CIS-2024-0792 approved by senior officer.',                     createdAt: new Date(Date.now() - 86400000).toISOString(), read: true  },
  { id: 4, text: 'New DPSP directive uploaded by Ministry of Finance.',            createdAt: new Date(Date.now() - 172800000).toISOString(),read: true  },
  { id: 5, text: 'System maintenance scheduled for Saturday 02:00 – 04:00 IST.', createdAt: new Date(Date.now() - 259200000).toISOString(),read: true  },
]

export default function Notifications() {
  const { notifications, setNotifications, markAllRead, markRead } = useNotifications()

  useEffect(() => {
    notificationService.getAll()
      .then(data => setNotifications(data?.results || data || MOCK_NOTIFS))
      .catch(() => setNotifications(MOCK_NOTIFS))
  }, [])

  const display = notifications.length > 0 ? notifications : MOCK_NOTIFS

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Notifi<em>cations</em></h1>
        <p className="page-subtitle">System alerts, assignment updates, and deadline reminders</p>
      </div>

      <div className="page-body">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
          <button
            className="action-btn btn-edit"
            onClick={markAllRead}
            style={{ fontFamily: 'Cinzel, serif', fontSize: 10 }}
          >
            Mark All Read
          </button>
        </div>

        <div className="dash-panel">
          {display.length === 0 ? (
            <EmptyState icon="🔔" title="No notifications" desc="You are all caught up." />
          ) : (
            display.map(n => (
              <div
                key={n.id}
                onClick={() => !n.read && markRead(n.id)}
                style={{
                  display: 'flex', gap: 16, padding: '16px 20px',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  background: n.read ? 'transparent' : 'rgba(201,168,76,0.03)',
                  cursor: n.read ? 'default' : 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ paddingTop: 5, flexShrink: 0 }}>
                  {!n.read
                    ? <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--gold)' }} />
                    : <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: n.read ? 'var(--silver)' : 'var(--cream)', marginBottom: 4 }}>
                    {n.text || n.message}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--silver)', fontFamily: 'Cinzel, serif', letterSpacing: 1 }}>
                    {timeAgo(n.createdAt)}
                  </div>
                </div>
                {!n.read && (
                  <span className="status-badge status-pending" style={{ alignSelf: 'flex-start' }}>New</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}
