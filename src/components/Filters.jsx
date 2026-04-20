export default function Filters({ filters, onChange, platforms, statuses, locations }) {
  return (
    <div className="filters-panel">
      <div className="filter-group">
        <label>Status</label>
        <select value={filters.status} onChange={(event) => onChange('status', event.target.value)}>
          <option value="">All</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Platform</label>
        <select value={filters.platform} onChange={(event) => onChange('platform', event.target.value)}>
          <option value="">All</option>
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Location type</label>
        <select value={filters.locationType} onChange={(event) => onChange('locationType', event.target.value)}>
          <option value="">All</option>
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
