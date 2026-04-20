import { useState } from 'react'
import { FaUser, FaSignOutAlt, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import '../styles/TopNavbar.css'

export default function TopNavbar({ isLoggedIn, onLogout }) {
  const [showMenu, setShowMenu] = useState(false)
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <nav className="top-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="28" height="28" rx="6" fill="url(#tealGradient)"/>
              <path d="M7 11L14 7L21 11V19L14 23L7 19V11Z" fill="white"/>
              <path d="M11 13L14 11L17 13V17L14 19L11 17V13Z" fill="url(#tealGradient)"/>
              <defs>
                <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0d9488"/>
                  <stop offset="100%" stopColor="#14b8a6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="brand-text">SmartJobTracker</span>
        </div>

        <div className="navbar-center">
          <ul className="navbar-menu">
            <li><a href="/dashboard" className="nav-link">Dashboard</a></li>
            <li><a href="/applications" className="nav-link">Applications</a></li>
            <li><a href="/analytics" className="nav-link">Analytics</a></li>
            <li><a href="/applications/new" className="nav-link">Blog</a></li>
          </ul>
        </div>

        <div className="navbar-end">
          <button className="theme-toggle-button" onClick={toggleTheme} title="Toggle dark mode">
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          {isLoggedIn ? (
            <div className="user-menu">
              <button className="user-button">
                <FaUser className="user-icon" />
                <span>Profile</span>
              </button>
              <button className="logout-button" onClick={onLogout}>
                <FaSignOutAlt />
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-button">Login</button>
              <button className="signup-button">Sign up</button>
            </div>
          )}
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={() => setShowMenu(!showMenu)}
        >
          {showMenu ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {showMenu && (
        <div className="mobile-menu">
          <a href="/dashboard" className="mobile-nav-link">Dashboard</a>
          <a href="/applications" className="mobile-nav-link">Applications</a>
          <a href="/analytics" className="mobile-nav-link">Analytics</a>
          {isLoggedIn ? (
            <button className="mobile-logout-button" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <>
              <button className="mobile-login-button">Login</button>
              <button className="mobile-signup-button">Sign up</button>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
