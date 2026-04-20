import { format } from 'date-fns'

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

export function formatDate(value) {
  if (!value) return 'N/A'
  try {
    return format(new Date(value), 'MMM dd, yyyy')
  } catch {
    return value
  }
}

export function statusStyle(status) {
  if (status === 'Offer Received') return 'offer'
  if (status === 'Interview Scheduled') return 'interview'
  if (status === 'Rejected') return 'rejected'
  return 'applied'
}
