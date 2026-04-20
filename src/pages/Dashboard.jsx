import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { useApplications } from '../hooks/useApplications'
import Loader from '../components/Loader'
import EmptyState from '../components/EmptyState'
import { formatCurrency } from '../utils/helpers'

const COLORS = ['#0d9488', '#3b82f6', '#fbbf24', '#ef4444']

function buildStageMetrics(applications) {
  const counts = { Applied: 0, 'Interview Scheduled': 0, 'Offer Received': 0, Rejected: 0 }
  applications.forEach((application) => {
    counts[application.status] = (counts[application.status] || 0) + 1
  })
  return [
    { name: 'Applied', value: counts.Applied },
    { name: 'Interview Scheduled', value: counts['Interview Scheduled'] },
    { name: 'Offer Received', value: counts['Offer Received'] },
    { name: 'Rejected', value: counts.Rejected },
  ]
}

function buildMonthlySeries(applications) {
  const monthMap = {}
  applications.forEach((application) => {
    const date = new Date(application.appliedDate)
    const month = date.toLocaleString('default', { month: 'short', year: 'numeric' })
    monthMap[month] = (monthMap[month] || 0) + 1
  })
  return Object.entries(monthMap)
    .sort(([a], [b]) => new Date(a) - new Date(b))
    .map(([month, count]) => ({ month, count }))
}

export default function Dashboard() {
  const { applications, isLoading } = useApplications()

  if (isLoading) {
    return <Loader />
  }

  if (!applications.length) {
    return <EmptyState title="No applications available" description="Add a new job application to start tracking your pipeline." />
  }

  const interviewCount = applications.filter((app) => app.status === 'Interview Scheduled').length
  const offerCount = applications.filter((app) => app.status === 'Offer Received').length
  const rejectedCount = applications.filter((app) => app.status === 'Rejected').length
  const totalApplications = applications.length
  const stageSeries = buildStageMetrics(applications)
  const monthlySeries = buildMonthlySeries(applications)
  const averageSalary = applications.length ? applications.reduce((sum, app) => sum + app.salary, 0) / applications.length : 0
  const rejectionRate = Math.round((rejectedCount / totalApplications) * 100)
  const activityVelocity = Math.round((interviewCount + offerCount) / totalApplications * 100)

  return (
    <motion.div className="dashboard-page" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h2>Job search progress</h2>
          <p>Track applications, interviews, and offers while keeping your pipeline clean and goal-driven.</p>
        </div>
      </div>

      <div className="metrics-grid">
        <motion.article className="metric-card" whileHover={{ y: -4 }}>
          <span>Total applications</span>
          <strong>{totalApplications}</strong>
          <p>{rejectedCount} rejected, {offerCount} offers</p>
        </motion.article>
        <motion.article className="metric-card" whileHover={{ y: -4 }}>
          <span>Interviews scheduled</span>
          <strong>{interviewCount}</strong>
          <p>{activityVelocity}% of active pipeline</p>
        </motion.article>
        <motion.article className="metric-card" whileHover={{ y: -4 }}>
          <span>Offers received</span>
          <strong>{offerCount}</strong>
          <p>Keep negotiating strong</p>
        </motion.article>
        <motion.article className="metric-card" whileHover={{ y: -4 }}>
          <span>Average salary</span>
          <strong>{formatCurrency(Math.round(averageSalary))}</strong>
          <p>Rejection rate {rejectionRate}%</p>
        </motion.article>
      </div>

      <motion.section className="panel-card quick-actions" whileHover={{ y: -3 }}>
        <header>
          <h3>Quick Actions</h3>
          <span>⚡</span>
        </header>
        <div className="actions-grid">
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/applications/new'}
          >
            <span className="action-icon">➕</span>
            <div>
              <strong>Add Application</strong>
              <p>Track a new job opportunity</p>
            </div>
          </motion.button>
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/applications'}
          >
            <span className="action-icon">📋</span>
            <div>
              <strong>View All</strong>
              <p>Manage your applications</p>
            </div>
          </motion.button>
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = '/analytics'}
          >
            <span className="action-icon">📊</span>
            <div>
              <strong>Analytics</strong>
              <p>View detailed insights</p>
            </div>
          </motion.button>
          <motion.button
            className="action-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              const bookmarked = applications.filter(app => app.bookmarked)
              if (bookmarked.length > 0) {
                window.location.href = '/applications?filter=bookmarked'
              } else {
                alert('No bookmarked applications yet. Bookmark some to see them here!')
              }
            }}
          >
            <span className="action-icon">⭐</span>
            <div>
              <strong>Favorites</strong>
              <p>{applications.filter(app => app.bookmarked).length} bookmarked</p>
            </div>
          </motion.button>
        </div>
      </motion.section>

      <section className="panel-grid">
        <motion.section className="panel-card analytics-card" whileHover={{ y: -3 }}>
          <header>
            <h3>Pipeline breakdown</h3>
          </header>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={stageSeries} dataKey="value" nameKey="name" innerRadius={72} outerRadius={108} paddingAngle={5}>
                {stageSeries.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.section>

        <motion.section className="panel-card chart-card" whileHover={{ y: -3 }}>
          <header>
            <h3>Monthly applications</h3>
          </header>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlySeries} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis dataKey="month" stroke="#9aa3b1" />
              <YAxis stroke="#9aa3b1" />
              <Tooltip />
              <Bar dataKey="count" fill="#2f80ed" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.section>
      </section>

      <motion.section className="panel-card progress-section" whileHover={{ y: -3 }}>
        <header>
          <h3>Progress & Motivation</h3>
          <span>🎯</span>
        </header>
        <div className="progress-content">
          <div className="progress-stats">
            <div className="progress-item">
              <span className="progress-label">Response Rate</span>
              <strong className="progress-value">{totalApplications > 0 ? Math.round(((interviewCount + offerCount + rejectedCount) / totalApplications) * 100) : 0}%</strong>
            </div>
            <div className="progress-item">
              <span className="progress-label">Interview Rate</span>
              <strong className="progress-value">{totalApplications > 0 ? Math.round((interviewCount / totalApplications) * 100) : 0}%</strong>
            </div>
            <div className="progress-item">
              <span className="progress-label">Offer Rate</span>
              <strong className="progress-value">{totalApplications > 0 ? Math.round((offerCount / totalApplications) * 100) : 0}%</strong>
            </div>
          </div>
          <div className="motivation-quote">
            <blockquote>
              "Success is not final, failure is not fatal: It is the courage to continue that counts."
            </blockquote>
            <cite>— Winston Churchill</cite>
          </div>
        </div>
      </motion.section>

      <section className="panel-card recent-companies">
        <header>
          <h3>Recent applications</h3>
          <span>{applications.slice(0, 6).length} items</span>
        </header>
        <div className="company-list">
          {applications.slice(0, 6).map((application) => (
            <article key={application.id} className="company-pill">
              <div className="company-avatar">{application.company.slice(0, 2).toUpperCase()}</div>
              <div>
                <strong>{application.company}</strong>
                <p>{application.role}</p>
              </div>
              <div className="pill-chip">{application.status}</div>
            </article>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
