import { NavLink } from 'react-router-dom'
import { FaChartLine, FaClipboardList, FaPlusCircle, FaTachometerAlt } from 'react-icons/fa'
import { useApplications } from '../hooks/useApplications'

export default function Navbar({ isOpen = false, onClose = () => {} }) {
  const { applications } = useApplications()
  const bookmarked = applications.filter((app) => app.bookmarked).length

  return (
    <>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="brand">
          <div className="brand-mark">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="url(#tealGradient)"/>
                <path d="M8 12L16 8L24 12V20L16 24L8 20V12Z" fill="white"/>
                <path d="M12 14L16 12L20 14V18L16 20L12 18V14Z" fill="url(#tealGradient)"/>
                <defs>
                  <linearGradient id="tealGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0d9488"/>
                    <stop offset="100%" stopColor="#14b8a6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div>
            <h1>Smart Job Tracker</h1>
            <p>Job search dashboard</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')} onClick={onClose}>
            <FaTachometerAlt /> Dashboard
          </NavLink>
          <NavLink to="/applications" className={({ isActive }) => (isActive ? 'active' : '')} onClick={onClose}>
            <FaClipboardList /> Applications
          </NavLink>
          <NavLink to="/applications/new" className={({ isActive }) => (isActive ? 'active' : '')} onClick={onClose}>
            <FaPlusCircle /> Add Application
          </NavLink>
          <NavLink to="/analytics" className={({ isActive }) => (isActive ? 'active' : '')} onClick={onClose}>
            <FaChartLine /> Analytics
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <span>Bookmarked</span>
          <strong>{bookmarked}</strong>
        </div>
      </aside>
    </>
  )
}
