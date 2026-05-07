import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken, isTokenExpired } from '../../utils/jwt.js'
import useAuth from '../../hooks/useAuth.js'

export default function SessionGuard({ children }) {
  const { logout } = useAuth()
  const navigate   = useNavigate()

  useEffect(() => {
    const check = () => {
      const token = getToken()
      if (token && isTokenExpired(token)) {
        logout()
        navigate('/login')
      }
    }
    check()
    const interval = setInterval(check, 60000)
    return () => clearInterval(interval)
  }, [logout, navigate])

  return children
}
