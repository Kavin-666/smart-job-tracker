import axios from 'axios'

const JOB_API = 'https://dummyjson.com/products?limit=12'
const STATUSES = ['Applied', 'Interview Scheduled', 'Offer Received', 'Rejected']
const PLATFORMS = ['LinkedIn', 'Company Site', 'Referral', 'Job Board']
const LOCATIONS = ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Remote', 'London, UK', 'Berlin, DE']
const LOCATION_TYPES = ['Onsite', 'Remote', 'Hybrid']

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function getRandomDate(daysAgo) {
  const date = new Date()
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo))
  return date.toISOString()
}

function buildLogoUrl(company) {
  const normalized = company.toLowerCase()
    .replace(/[^a-z0-9]+/g, '') // Remove special characters
    .replace(/^(the|a|an)\s+/i, '') // Remove common prefixes
    .trim()

  // Use a more reliable logo service with better fallbacks
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(company)}&background=2f80ed&color=fff&size=72&font-size=0.6&length=1`
}

export async function fetchJobSuggestions() {
  const response = await axios.get(JOB_API)
  return response.data.products.map((product) => {
    const company = product.brand || product.title.split(' ')[0] || 'Acme'
    const status = getRandomItem(STATUSES)
    const platform = getRandomItem(PLATFORMS)
    const location = getRandomItem(LOCATIONS)
    const locationType = location === 'Remote' ? 'Remote' : getRandomItem(['Onsite', 'Hybrid'])
    const appliedDate = getRandomDate(90)
    const interviewDate = ['Interview Scheduled', 'Offer Received'].includes(status)
      ? getRandomDate(30)
      : ''

    return {
      id: product.id.toString(),
      company,
      role: product.title,
      location,
      locationType,
      salary: Math.floor(Math.random() * 85000 + 45000),
      platform,
      status,
      appliedDate,
      interviewDate,
      notes: product.description,
      bookmarked: false,
      logo: buildLogoUrl(company),
    }
  })
}

export function getCompanyLogoUrl(company) {
  return buildLogoUrl(company)
}
