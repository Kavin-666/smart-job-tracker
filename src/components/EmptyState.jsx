export default function EmptyState({ title = 'No results', description = 'Try adjusting filters or adding a new application.' }) {
  return (
    <div className="empty-state">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
