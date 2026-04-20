import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { getCompanyLogoUrl } from '../services/api'

const schema = yup.object({
  company: yup.string().required('Company name is required'),
  role: yup.string().required('Role is required'),
  location: yup.string().required('Location is required'),
  locationType: yup.string().required('Location type is required'),
  salary: yup.number().typeError('Salary must be a number').positive('Enter a positive salary').required('Salary is required'),
  platform: yup.string().required('Platform is required'),
  status: yup.string().required('Status is required'),
  appliedDate: yup.string().required('Applied date is required'),
  interviewDate: yup.string().nullable(),
  notes: yup.string(),
})

const platforms = ['LinkedIn', 'Company Site', 'Referral', 'Job Board']
const statuses = ['Applied', 'Interview Scheduled', 'Offer Received', 'Rejected']
const locationTypes = ['Onsite', 'Remote', 'Hybrid']

export default function ApplicationForm({ initialValues = {}, onSubmit, submitLabel }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      company: '',
      role: '',
      location: '',
      locationType: 'Onsite',
      salary: '',
      platform: 'LinkedIn',
      status: 'Applied',
      appliedDate: '',
      interviewDate: '',
      notes: '',
      ...initialValues,
    },
  })

  useEffect(() => {
    reset({
      company: '',
      role: '',
      location: '',
      locationType: 'Onsite',
      salary: '',
      platform: 'LinkedIn',
      status: 'Applied',
      appliedDate: '',
      interviewDate: '',
      notes: '',
      ...initialValues,
    })
  }, [initialValues, reset])

  const handleFormSubmit = (data) => {
    const payload = {
      ...data,
      salary: Number(data.salary),
      logo: getCompanyLogoUrl(data.company),
      bookmarked: initialValues.bookmarked ?? false,
    }
    onSubmit(payload)
  }

  return (
    <form className="application-form" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="form-grid">
        <label>
          Company Name
          <input type="text" {...register('company')} />
          <span className="error-message">{errors.company?.message}</span>
        </label>

        <label>
          Role Title
          <input type="text" {...register('role')} />
          <span className="error-message">{errors.role?.message}</span>
        </label>

        <label>
          Location
          <input type="text" {...register('location')} />
          <span className="error-message">{errors.location?.message}</span>
        </label>

        <label>
          Location Type
          <select {...register('locationType')}>
            {locationTypes.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <span className="error-message">{errors.locationType?.message}</span>
        </label>

        <label>
          Salary Range
          <input type="number" {...register('salary')} />
          <span className="error-message">{errors.salary?.message}</span>
        </label>

        <label>
          Application Platform
          <select {...register('platform')}>
            {platforms.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <span className="error-message">{errors.platform?.message}</span>
        </label>

        <label>
          Status
          <select {...register('status')}>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <span className="error-message">{errors.status?.message}</span>
        </label>

        <label>
          Applied Date
          <input type="date" {...register('appliedDate')} />
          <span className="error-message">{errors.appliedDate?.message}</span>
        </label>

        <label>
          Interview Date
          <input type="date" {...register('interviewDate')} />
          <span className="error-message">{errors.interviewDate?.message}</span>
        </label>
      </div>

      <label className="form-fullwidth">
        Notes
        <textarea rows="4" {...register('notes')} />
      </label>

      <button className="button-primary" type="submit">
        {submitLabel}
      </button>
    </form>
  )
}
