import axios from 'axios'
import { getToken, removeToken } from '../utils/jwt.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8083/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  config => {
    const token = getToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response.data,

  error => {
    if (error.response?.status === 401) {
      removeToken()

      // Prevent infinite redirect loop
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }

    return Promise.reject(
      error.response?.data || {
        message: 'Something went wrong',
      }
    )
  }
)

export default api