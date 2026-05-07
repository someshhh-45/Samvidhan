import api from './api.js'

const notificationService = {

  // =====================================
  // GET ALL NOTIFICATIONS
  // =====================================

  getAll: async (email) => {

    return await api.get(
      `/notifications/${email}`
    )
  },

  // =====================================
  // OPTIONAL FUTURE FEATURES
  // =====================================

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