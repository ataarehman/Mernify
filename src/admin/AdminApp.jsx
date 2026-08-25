import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import { useAuth } from '@/admin/AuthContext'
import { CategoriesPage } from '@/admin/CategoriesPage'
import { LoginPage } from '@/admin/LoginPage'
import { PostEditorPage } from '@/admin/PostEditorPage'
import { PostListPage } from '@/admin/PostListPage'

const LOGO_SRC = '/assets/images/logo/logo-white.webp'

function AuthLoading() {
  return (
    <div className="admin-login admin-login--loading">
      <div className="admin-login-atmosphere" aria-hidden="true">
        <div className="admin-login-bg" />
        <span className="admin-login-orb admin-login-orb--a" />
        <span className="admin-login-orb admin-login-orb--b" />
        <div className="admin-login-veil" />
      </div>
      <div className="admin-login-stage">
        <div className="admin-login-card admin-login-card--compact">
          <p className="admin-login-lead" style={{ margin: 0 }}>
            Checking session…
          </p>
        </div>
      </div>
    </div>
  )
}

function RequireAuth({ children }) {
  const { authenticated, checking } = useAuth()
  if (checking) return <AuthLoading />
  if (!authenticated) return <LoginPage />
  return children
}

function navClass({ isActive }) {
  return isActive ? 'admin-nav-link is-active' : 'admin-nav-link'
}

export function AdminApp() {
  const { user, logout } = useAuth()

  return (
    <RequireAuth>
      <div className="admin-shell">
        <div className="admin-shell-atmosphere" aria-hidden="true">
          <div className="admin-shell-bg" />
          <span className="admin-shell-orb admin-shell-orb--a" />
          <span className="admin-shell-orb admin-shell-orb--b" />
          <div className="admin-shell-veil" />
        </div>

        <header className="admin-header">
          <div className="admin-header-brand">
            <img
              className="admin-header-logo"
              src={LOGO_SRC}
              alt="Mernify"
              width={120}
              height={44}
              decoding="async"
            />
            <div className="admin-header-titles">
              <span className="admin-brand">Blog Admin</span>
              <span className="admin-brand-tagline">Build Modern. Scale Confidently.</span>
            </div>
          </div>

          <nav className="admin-nav" aria-label="Admin">
            <NavLink to="/" end className={navClass}>
              Posts
            </NavLink>
            <NavLink to="/new" className={navClass}>
              New
            </NavLink>
            <NavLink to="/categories" className={navClass}>
              Categories
            </NavLink>
            <a className="admin-nav-link admin-nav-link--external" href="/" target="_blank" rel="noreferrer">
              View site
            </a>
          </nav>

          <div className="admin-header-meta">
            {user?.username ? (
              <span className="admin-user" title={user.email || undefined}>
                {user.username}
              </span>
            ) : null}
            <button type="button" className="admin-btn admin-btn-ghost admin-btn-logout" onClick={() => logout()}>
              Log out
            </button>
          </div>
        </header>

        <main className="admin-main">
          <Routes>
            <Route index element={<PostListPage />} />
            <Route path="new" element={<PostEditorPage />} />
            <Route path="edit/:id" element={<PostEditorPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </RequireAuth>
  )
}
