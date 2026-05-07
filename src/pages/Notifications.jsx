import React, { useEffect } from 'react'

import useNotifications from '../hooks/useNotifications.js'

import notificationService from '../services/notificationService.js'

import { timeAgo } from '../utils/formatDate.js'

import EmptyState from '../components/common/EmptyState.jsx'

export default function Notifications() {

  const {
    notifications,
    setNotifications,
  } = useNotifications()

  useEffect(() => {

    fetchNotifications()

  }, [])

  const fetchNotifications = async () => {

    try {

      const email =
        'admin@gmail.com'

      const response =
        await notificationService.getAll(
          email
        )

      console.log(
        'NOTIFICATION RESPONSE:',
        response
      )

      setNotifications(response)

    } catch (err) {

      console.error(err)

      setNotifications([])
    }
  }

  return (
    <>
      <div className="page-header">

        <h1 className="page-title">
          Notifi<em>cations</em>
        </h1>

        <p className="page-subtitle">
          System alerts, assignment updates,
          and deadline reminders
        </p>

      </div>

      <div className="page-body">

        <div className="dash-panel">

          {notifications &&
          notifications.length > 0 ? (

            notifications.map((n) => (

              <div
                key={n.id}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '16px 20px',
                  borderBottom:
                    '1px solid rgba(255,255,255,0.04)',
                  background:
                    !n.readStatus
                      ? 'rgba(201,168,76,0.03)'
                      : 'transparent',
                }}
              >

                <div
                  style={{
                    paddingTop: 5,
                  }}
                >

                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background:
                        !n.readStatus
                          ? 'var(--gold)'
                          : 'rgba(255,255,255,0.1)',
                    }}
                  />

                </div>

                <div style={{ flex: 1 }}>

                  <div
                    style={{
                      fontSize: 13,
                      color:
                        !n.readStatus
                          ? 'var(--cream)'
                          : 'var(--silver)',
                      marginBottom: 4,
                    }}
                  >

                    <strong>
                      {n.title}
                    </strong>

                    <br />

                    {n.message}

                  </div>

                  <div
                    style={{
                      fontSize: 11,
                      color: 'var(--silver)',
                    }}
                  >

                    {timeAgo(n.createdAt)}

                  </div>

                </div>

                {!n.readStatus && (

                  <span
                    className="status-badge status-pending"
                  >
                    New
                  </span>

                )}

              </div>
            ))

          ) : (

            <EmptyState
              icon="🔔"
              title="No notifications"
              desc="You are all caught up."
            />

          )}

        </div>

      </div>
    </>
  )
}