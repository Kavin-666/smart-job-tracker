import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useApplications } from '../hooks/useApplications'
import ApplicationForm from '../components/ApplicationForm'

export default function AddApplication() {
  const navigate = useNavigate()
  const { addApplication } = useApplications()

  const handleAdd = (application) => {
    addApplication(application)
    toast.success('Application added successfully')
    navigate('/applications')
  }

  return (
    <div className="form-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Add application</p>
          <h2>Track a new opportunity</h2>
          <p>Enter the details for your latest job application.</p>
        </div>
      </div>
      <ApplicationForm submitLabel="Create application" onSubmit={handleAdd} />
    </div>
  )
}
