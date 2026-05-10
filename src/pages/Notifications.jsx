import { useEffect, useState } from 'react'

import notificationService from '../services/notificationService'

function Notification() {

  const [notifications, setNotifications] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    console.log("FETCH RUNNING")

    fetchNotifications()

  }, [])

  const fetchNotifications = async () => {

    console.log("API CALL START")

    try {

      const response =
        await notificationService.getAll(
          'admin@gov.in'
        )

      console.log("NOTIFICATION DATA")

      console.log(response)

      setNotifications(

        Array.isArray(response)
          ? response
          : []

      )

    } catch(error) {

      console.error(
        'Notification Error:',
        error
      )

      setNotifications([])

    } finally {

      setLoading(false)
    }
  }

  if(loading) {

    return <p>Loading notifications...</p>
  }

  return (

    <div className="p-4">

      <h2 className="text-xl font-bold mb-4">
        Notifications
      </h2>

      {
        !notifications ||
        notifications.length === 0 ? (

          <p>No notifications found</p>

        ) : (

          notifications.map((notification) => (

            <div
              key={notification.id}
              className="
                border
                rounded
                p-3
                mb-3
                shadow-sm
              "
            >

              <h3 className="font-semibold">

                {notification.title}

              </h3>

              <p>

                {notification.message}

              </p>

              <small>

                {notification.createdAt}

              </small>

            </div>
          ))
        )
      }

    </div>
  )
}

export default Notification