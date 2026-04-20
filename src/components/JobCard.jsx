import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaBookmark, FaRegBookmark, FaTrash, FaEdit } from 'react-icons/fa'
import { formatCurrency, formatDate, statusStyle } from '../utils/helpers'

export default function JobCard({ application, onDelete, onToggleBookmark }) {
  return (
    <motion.article
      className="job-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
    >
      <div className="job-card-head">
        <div className="logo-shell">
          <img
            src={application.logo}
            alt={`${application.company} logo`}
            onError={(event) => {
              // Fallback to a simple colored circle with company initial
              const company = application.company
              event.currentTarget.src = `https://via.placeholder.com/72x72/2f80ed/ffffff?text=${encodeURIComponent(company.charAt(0).toUpperCase())}`
            }}
          />
        </div>
        <div>
          <h3>{application.company}</h3>
          <p>{application.role}</p>
        </div>
        <button className="bookmark-button" type="button" onClick={() => onToggleBookmark(application.id)}>
          {application.bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>

      <div className="job-card-detail">
        <span className={`status-pill ${statusStyle(application.status)}`}>{application.status}</span>
        <span>{application.location}</span>
        <span>{formatCurrency(application.salary)}</span>
      </div>

      <div className="job-card-summary">
        <span>{application.platform}</span>
        <span>{application.locationType}</span>
        <span>{application.interviewDate ? `Interview ${formatDate(application.interviewDate)}` : 'No interview yet'}</span>
      </div>

      <p className="job-card-note">{application.notes ? `${application.notes.slice(0, 100)}${application.notes.length > 100 ? '...' : ''}` : 'No notes yet.'}</p>

      <div className="job-card-meta">
        <div>
          <strong>Applied</strong>
          <p>{formatDate(application.appliedDate)}</p>
        </div>
        <div>
          <strong>Status</strong>
          <p>{application.status}</p>
        </div>
      </div>

      <div className="job-card-actions">
        <button type="button" onClick={() => onDelete(application.id)}>
          <FaTrash /> Delete
        </button>
        <Link className="button-secondary" to={`/applications/${application.id}`}>
          <FaEdit /> Edit
        </Link>
      </div>
    </motion.article>
  )
}
