import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth.js'
import ErrorAlert from '../common/ErrorAlert.jsx'

export default function LoginForm() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [form, setForm]     = useState({ username: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ErrorAlert message={error} />

      <div className="form-group" style={{ marginTop: error ? 16 : 0 }}>
        <label className="form-label">Username / Employee ID</label>
        <input
          className="form-input"
          name="username"
          placeholder="Enter your username"
          value={form.username}
          onChange={handleChange}
          required
          autoComplete="username"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          className="form-input"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
      </div>

      <button
        type="submit"
        className="btn-primary"
        style={{ width: '100%', textAlign: 'center', marginTop: 8 }}
        disabled={loading}
      >
        {loading ? 'Authenticating…' : 'Sign In'}
      </button>
    </form>
  )
}
