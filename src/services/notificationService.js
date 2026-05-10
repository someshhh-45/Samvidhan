import api from './api.js'

const notificationService = {

  getAll: async (email) => {

    const response = await api.get(
      `/notifications/${email}`
    )

    return response
  },

  markRead: async (id) => {

    return await api.patch(
      `/notifications/${id}/read`
    )
  },

  markAllRead: async () => {

    return await api.patch(
      '/notifications/read-all'
    )
  },

  delete: async (id) => {

    return await api.delete(
      `/notifications/${id}`
    )
  },
}

export default notificationService