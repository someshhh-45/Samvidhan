import api from './api.js'
import { setToken } from '../utils/jwt.js'

const authService = {
  async login({ username, password }) {
    const data = await api.post('/auth/login', { username, password })
    if (data.token) setToken(data.token)
    return data
  },

  async getMe() {
    return api.get('/auth/me')
  },

  async logout() {
    return api.post('/auth/logout')
  },

  async changePassword(payload) {
    return api.post('/auth/change-password', payload)
  },
}

export default authService
