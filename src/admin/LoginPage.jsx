import { useState } from 'react'
import { useAuth } from '@/admin/AuthContext'

const LOGO_SRC = '/assets/images/logo/logo-white.webp'

export function LoginPage() {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(username.trim(), password)
      setPassword('')
    } catch (err) {
      setPassword('')
      const msg =
        err?.body?.error ||
        (err?.status === 401 ? 'Invalid credentials' : 'Sign-in failed. Try again.')
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-atmosphere" aria-hidden="true">
        <div className="admin-login-bg" />
        <span className="admin-login-orb admin-login-orb--a" />
        <span className="admin-login-orb admin-login-orb--b" />
        <span className="admin-login-orb admin-login-orb--c" />
        <div className="admin-login-grid" />
        <div className="admin-login-veil" />
      </div>

      <div className="admin-login-stage">
        <div className="admin-login-card">
          <div className="admin-login-brand">
            <img
              className="admin-login-logo"
              src={LOGO_SRC}
              alt="Mernify"
              width={142}
              height={52}
              decoding="async"
              fetchPriority="high"
            />
            <p className="admin-login-tagline">Build Modern. Scale Confidently.</p>
          </div>

          <h1 className="admin-login-title">Blog Admin</h1>
          <p className="admin-login-lead">Sign in to continue.</p>

          {error ? (
            <div className="admin-login-error" role="alert">
              {error}
            </div>
          ) : null}

          <form className="admin-login-form" onSubmit={onSubmit} autoComplete="on">
            <div className="admin-login-field">
              <label htmlFor="admin-username">Username</label>
              <input
                id="admin-username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={submitting}
              />
            </div>
            <div className="admin-login-field">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={submitting}
              />
            </div>
            <button type="submit" className="admin-login-submit" disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
