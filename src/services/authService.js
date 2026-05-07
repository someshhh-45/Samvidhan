import api from './api.js'

import {
  setToken,
  removeToken,
} from '../utils/jwt.js'

const authService = {
  async login({
    email,
    password,
  }) {
    const data = await api.post(
      '/auth/login',
      {
        email,
        password,
      }
    )

    // store jwt
    if (data.token) {
      setToken(data.token)
    }

    return data
  },

  async getMe() {
    return api.get('/auth/me')
  },

  async logout() {
    try {
      await api.post('/auth/logout')
    } finally {
      removeToken()
    }
  },

  async changePassword(payload) {
    return api.post(
      '/auth/change-password',
      payload
    )
  },
}

export default authService