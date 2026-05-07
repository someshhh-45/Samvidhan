import React, { useState } from 'react'
import useAuth from '../hooks/useAuth.js'
import RoleBadge from '../components/auth/RoleBadge.jsx'
import ErrorAlert from '../components/common/ErrorAlert.jsx'
import authService from '../services/authService.js'

export default function Profile() {
  const { user, setUser } = useAuth()
  const [form, setForm]   = useState({ name: user?.name || '', email: user?.email || '' })
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' })
  const [msg,   setMsg]   = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true); setMsg(''); setError('')
    try {
      const updated = await authService.updateProfile?.(form) || { ...user, ...form }
      setUser(updated)
      setMsg('Profile updated successfully.')
    } catch (err) {
      setError(err.message || 'Failed to update profile.')
    } finally {
      setSaving(false)
    }
  }

  const handlePw = async (e) => {
    e.preventDefault()
    if (pwForm.newPw !== pwForm.confirm) { setError('New passwords do not match.'); return }
    setSaving(true); setMsg(''); setError('')
    try {
      await authService.changePassword({ current: pwForm.current, newPassword: pwForm.newPw })
      setMsg('Password changed successfully.')
      setPwForm({ current: '', newPw: '', confirm: '' })
    } catch (err) {
      setError(err.message || 'Failed to change password.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <h1 className="page-title">My <em>Profile</em></h1>
        <p className="page-subtitle">Manage your account settings and security preferences</p>
      </div>

      <div className="page-body">
        <div className="grid-2">
          {/* Profile Info */}
          <div className="card">
            <div className="card-title">Account Information</div>
            <ErrorAlert message={error} />
            {msg && <div style={{ background: 'rgba(46,139,106,0.1)', border: '1px solid rgba(46,139,106,0.3)', color: 'var(--jade-light)', padding: '10px 14px', fontSize: 13, marginBottom: 16 }}>{msg}</div>}

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(201,168,76,0.1)' }}>
              <div style={{ width: 52, height: 52, background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>
                👤
              </div>
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 14, color: 'var(--cream)', marginBottom: 4 }}>{user?.name || user?.username}</div>
                <RoleBadge role={user?.role} />
              </div>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input className="form-input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input className="form-input" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.gov.in" />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input className="form-input" value={user?.department || ''} disabled style={{ opacity: 0.5 }} />
              </div>
              <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
            </form>
          </div>

          {/* Change Password */}
          <div className="card">
            <div className="card-title">Security</div>
            <form onSubmit={handlePw}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input className="form-input" type="password" value={pwForm.current} onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))} placeholder="Enter current password" autoComplete="current-password" />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input className="form-input" type="password" value={pwForm.newPw} onChange={e => setPwForm(f => ({ ...f, newPw: e.target.value }))} placeholder="Enter new password" autoComplete="new-password" />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input className="form-input" type="password" value={pwForm.confirm} onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))} placeholder="Confirm new password" autoComplete="new-password" />
              </div>
              <button type="submit" className="btn-secondary" disabled={saving}>{saving ? 'Updating…' : 'Change Password'}</button>
            </form>

            <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="card-title" style={{ marginBottom: 12 }}>Session Info</div>
              <div style={{ fontSize: 12, color: 'var(--silver)', lineHeight: 2 }}>
                <div>Username: <span style={{ color: 'var(--cream)' }}>{user?.username}</span></div>
                <div>Role: <span style={{ color: 'var(--gold)' }}>{user?.role}</span></div>
                <div>Last login: <span style={{ color: 'var(--cream)' }}>{new Date().toLocaleDateString('en-IN')}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
