export default function StageTabs({ active, onChange, counts = {} }) {
  const stages = ['Applied', 'Interview Scheduled', 'Offer Received', 'Rejected']

  return (
    <div className="stage-tabs">
      {stages.map((stage) => (
        <button
          key={stage}
          className={active === stage ? 'active' : ''}
          type="button"
          onClick={() => onChange(stage)}
        >
          {stage}
          <span>{counts[stage] || 0}</span>
        </button>
      ))}
      <button className={active === 'All' ? 'active' : ''} type="button" onClick={() => onChange('All')}>
        All
        <span>{counts.All || 0}</span>
      </button>
    </div>
  )
}
