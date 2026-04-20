import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useApplications } from '../hooks/useApplications'
import ApplicationForm from '../components/ApplicationForm'
import EmptyState from '../components/EmptyState'

export default function EditApplication() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getApplicationById, updateApplication } = useApplications()
  const application = getApplicationById(id)

  useEffect(() => {
    if (!application) {
      toast.error('Application not found')
      navigate('/applications')
    }
  }, [application, navigate])

  if (!application) {
    return <EmptyState title="Application not found" description="Please return to the applications page and select a valid entry." />
  }

  const handleUpdate = (updates) => {
    updateApplication(application.id, updates)
    toast.success('Application updated successfully')
    navigate('/applications')
  }

  return (
    <div className="form-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Edit application</p>
          <h2>Update your application progress</h2>
          <p>Make changes to your job entry and keep your pipeline accurate.</p>
        </div>
      </div>
      <ApplicationForm initialValues={application} submitLabel="Save changes" onSubmit={handleUpdate} />
    </div>
  )
}
