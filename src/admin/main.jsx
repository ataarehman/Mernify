import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AdminApp } from '@/admin/AdminApp'
import { AuthProvider } from '@/admin/AuthContext'
import '@/styles/base/fonts.css'
import '@/admin/admin.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/admin">
      <AuthProvider>
        <AdminApp />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
