import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'

import authService from '../services/authService.js'

import {
  getToken,
  removeToken,
  isTokenExpired,
  setToken,
} from '../utils/jwt.js'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeAuth()
  }, [])

  const initializeAuth = async () => {
    try {
      const token = getToken()

      // no token
      if (!token) {
        setLoading(false)
        return
      }

      // expired token
      if (isTokenExpired(token)) {
        removeToken()
        setLoading(false)
        return
      }

      // fetch logged in user
      const userData = await authService.getMe()

      setUser(userData)
    } catch (error) {
      console.error('Auth init failed:', error)

      removeToken()
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = useCallback(async credentials => {
    const data = await authService.login(credentials)

    // save token
    setToken(data.token)

    // save user state
    setUser(data.user)

    return data
  }, [])

  const logout = useCallback(() => {
    removeToken()
    setUser(null)

    window.location.href = '/login'
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
      setUser,
      isAuthenticated: !!user,
    }),
    [user, loading, login, logout]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}