export default function Loader({ message = 'Loading applications…' }) {
  return (
    <div className="loader-shell">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  )
}
