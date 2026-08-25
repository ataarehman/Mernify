import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as api from '@/admin/adminApi'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)

  const clearSession = useCallback(() => {
    setUser(null)
  }, [])

  const refreshMe = useCallback(async () => {
    try {
      const me = await api.getMe()
      if (me?.authenticated) {
        setUser({
          username: me.username || null,
          email: me.email || null,
        })
        return true
      }
      setUser(null)
      return false
    } catch {
      setUser(null)
      return false
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setChecking(true)
      try {
        await refreshMe()
      } finally {
        if (!cancelled) setChecking(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [refreshMe])

  useEffect(() => {
    api.setUnauthorizedHandler(() => {
      clearSession()
    })
    return () => api.setUnauthorizedHandler(null)
  }, [clearSession])

  const login = useCallback(async (username, password) => {
    const data = await api.login(username, password)
    setUser({
      username: data?.username || username,
      email: data?.email || null,
    })
    return data
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.logout()
    } catch {
      // Still clear local UI even if network fails
    }
    clearSession()
  }, [clearSession])

  const value = {
    user,
    authenticated: Boolean(user),
    checking,
    login,
    logout,
    refreshMe,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
