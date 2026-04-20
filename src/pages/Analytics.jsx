import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useApplications } from '../hooks/useApplications'
import Loader from '../components/Loader'
import EmptyState from '../components/EmptyState'

const COLORS = ['#2f80ed', '#27ae60', '#f2c94c', '#eb5757']

function buildStageData(applications) {
  const counts = { Applied: 0, 'Interview Scheduled': 0, 'Offer Received': 0, Rejected: 0 }
  applications.forEach((application) => {
    counts[application.status] += 1
  })
  return Object.entries(counts).map(([name, value]) => ({ name, value }))
}

function buildActivitySeries(applications) {
  const results = {}
  applications.forEach((application) => {
    const date = new Date(application.appliedDate)
    const label = date.toLocaleString('default', { month: 'short' })
    results[label] = (results[label] || 0) + 1
  })
  return Object.entries(results)
    .sort(([a], [b]) => new Date(`${a} 1`) - new Date(`${b} 1`))
    .map(([month, count]) => ({ month, count }))
}

export default function Analytics() {
  const { applications, isLoading } = useApplications()

  if (isLoading) {
    return <Loader />
  }

  if (!applications.length) {
    return <EmptyState title="Analytics unavailable" description="Add some applications to see meaningful insights." />
  }

  const stageData = buildStageData(applications)
  const activityData = buildActivitySeries(applications)

  return (
    <div className="analytics-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Analytics</p>
          <h2>Explore your job search data</h2>
          <p>Get charts, trends, and stage analysis across all applications.</p>
        </div>
      </div>

      <section className="panel-grid">
        <section className="panel-card analytics-card">
          <header>
            <h3>Stage distribution</h3>
          </header>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={stageData} dataKey="value" nameKey="name" outerRadius={100} label />
              {stageData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </section>

        <section className="panel-card chart-card">
          <header>
            <h3>Applications by month</h3>
          </header>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={activityData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2f80ed" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2f80ed" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke="#2f80ed" fill="url(#gradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </section>
      </section>

      <section className="panel-card insights-card">
        <header>
          <h3>Data highlights</h3>
        </header>
        <ul>
          <li>Applications tracked: <strong>{applications.length}</strong></li>
          <li>Most common stage: <strong>{stageData.reduce((best, current) => (current.value > best.value ? current : best), stageData[0]).name}</strong></li>
          <li>Top month: <strong>{activityData[activityData.length - 1]?.month || 'N/A'}</strong></li>
        </ul>
      </section>
    </div>
  )
}
