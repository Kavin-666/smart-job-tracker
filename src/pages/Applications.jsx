import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApplications } from '../hooks/useApplications'
import { useDebounce } from '../hooks/useDebounce'
import SearchBar from '../components/SearchBar'
import Filters from '../components/Filters'
import StageTabs from '../components/StageTabs'
import JobCard from '../components/JobCard'
import Loader from '../components/Loader'
import EmptyState from '../components/EmptyState'

const SORT_OPTIONS = [
  { value: 'appliedDate', label: 'Applied date' },
  { value: 'salary', label: 'Salary' },
  { value: 'company', label: 'Company name' },
]

export default function Applications() {
  const navigate = useNavigate()
  const { applications, deleteApplication, toggleBookmark, isLoading } = useApplications()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [filters, setFilters] = useState({ status: '', platform: '', locationType: '' })
  const [sortBy, setSortBy] = useState('appliedDate')
  const debouncedSearch = useDebounce(searchQuery, 400)

  const platforms = Array.from(new Set(applications.map((app) => app.platform)))
  const statuses = Array.from(new Set(applications.map((app) => app.status)))
  const locations = Array.from(new Set(applications.map((app) => app.locationType)))

  const counts = useMemo(() => {
    const result = { All: applications.length }
    applications.forEach((app) => {
      result[app.status] = (result[app.status] || 0) + 1
    })
    return result
  }, [applications])

  const filteredApplications = useMemo(() => {
    return applications
      .filter((application) => {
        if (activeTab !== 'All' && application.status !== activeTab) {
          return false
        }
        if (filters.status && application.status !== filters.status) {
          return false
        }
        if (filters.platform && application.platform !== filters.platform) {
          return false
        }
        if (filters.locationType && application.locationType !== filters.locationType) {
          return false
        }
        const searchText = debouncedSearch.toLowerCase()
        return (
          application.company.toLowerCase().includes(searchText) ||
          application.role.toLowerCase().includes(searchText)
        )
      })
      .sort((a, b) => {
        if (sortBy === 'salary') {
          return b.salary - a.salary
        }
        if (sortBy === 'company') {
          return a.company.localeCompare(b.company)
        }
        return new Date(b.appliedDate) - new Date(a.appliedDate)
      })
  }, [applications, activeTab, filters, debouncedSearch, sortBy])

  const hasFilters = Boolean(searchQuery || filters.status || filters.platform || filters.locationType || activeTab !== 'All')

  if (isLoading) {
    return <Loader />
  }

  return (
    <motion.div className="applications-page" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="page-header">
        <div>
          <p className="eyebrow">Applications</p>
          <h2>Manage your job pipeline</h2>
          <p>Search, filter, sort, and update every application from a single dashboard.</p>
        </div>
        <button className="button-primary" type="button" onClick={() => navigate('/applications/new')}>
          Add application
        </button>
      </div>

      <StageTabs active={activeTab} onChange={setActiveTab} counts={counts} />

      <div className="controls-row">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <div className="sort-select">
          <label htmlFor="sortBy">Sort by</label>
          <select id="sortBy" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Filters
        filters={filters}
        platforms={platforms}
        statuses={statuses}
        locations={locations}
        onChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
      />

      {hasFilters && (
        <div className="filter-summary">
          <p>
            Showing <strong>{filteredApplications.length}</strong> of <strong>{applications.length}</strong> applications.
          </p>
          <button className="button-secondary" type="button" onClick={() => {
            setSearchQuery('')
            setFilters({ status: '', platform: '', locationType: '' })
            setActiveTab('All')
          }}>
            Clear filters
          </button>
        </div>
      )}

      {filteredApplications.length === 0 ? (
        <EmptyState title="No matching applications" description="Try another search or clear your filters." />
      ) : (
        <div className="job-grid">
          {filteredApplications.map((application) => (
            <JobCard
              key={application.id}
              application={application}
              onDelete={() => deleteApplication(application.id)}
              onToggleBookmark={() => toggleBookmark(application.id)}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}
