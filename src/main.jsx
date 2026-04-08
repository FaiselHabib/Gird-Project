import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App               from './App.jsx'
import AdminLogin        from './pages/admin/Login.jsx'
import AdminDashboard    from './pages/admin/Dashboard.jsx'
import ProtectedRoute    from './components/ProtectedRoute.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public landing page */}
        <Route path="/" element={<App />} />

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected admin dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
