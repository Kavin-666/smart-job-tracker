import { Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import TopNavbar from './components/TopNavbar'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import AddApplication from './pages/AddApplication'
import EditApplication from './pages/EditApplication'
import Analytics from './pages/Analytics'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import './styles/DarkMode.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <ThemeProvider>
      <div className="app-shell">
        <TopNavbar isLoggedIn={isLoggedIn} onLogout={() => setIsLoggedIn(false)} />
        <div className="app-container">
          <Navbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <button
            className="sidebar-toggle"
            onClick={toggleSidebar}
            type="button"
            aria-label="Toggle sidebar"
          >
            <FaBars />
          </button>
          <main className="app-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/applications" element={<Applications />} />
              <Route path="/applications/new" element={<AddApplication />} />
              <Route path="/applications/:id" element={<EditApplication />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            <ToastContainer position="bottom-right" theme="dark" />
          </main>
          {sidebarOpen && (
            <div
              className="sidebar-overlay"
              onClick={() => setSidebarOpen(false)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Escape' && setSidebarOpen(false)}
              aria-label="Close sidebar"
            />
          )}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
