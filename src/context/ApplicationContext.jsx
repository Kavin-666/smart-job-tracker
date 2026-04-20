import { createContext, useEffect, useState } from 'react'
import { fetchJobSuggestions } from '../services/api'
import { useLocalStorage } from '../hooks/useLocalStorage'

export const ApplicationContext = createContext(null)

export function ApplicationProvider({ children }) {
  const [applications, setApplications] = useLocalStorage('smart-job-tracker-applications', [])
  const [isLoading, setIsLoading] = useState(!applications.length)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!applications.length) {
      loadSampleApplications()
    }
  }, [])

  async function loadSampleApplications() {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchJobSuggestions()
      setApplications(data)
    } catch (err) {
      console.error(err)
      setError('Unable to load sample applications. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  function addApplication(application) {
    setApplications((prev) => [{ ...application, id: Date.now().toString() }, ...prev])
  }

  function updateApplication(id, updates) {
    setApplications((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }

  function deleteApplication(id) {
    setApplications((prev) => prev.filter((item) => item.id !== id))
  }

  function toggleBookmark(id) {
    setApplications((prev) => prev.map((item) => (item.id === id ? { ...item, bookmarked: !item.bookmarked } : item)))
  }

  function getApplicationById(id) {
    return applications.find((item) => item.id === id)
  }

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
        toggleBookmark,
        getApplicationById,
        isLoading,
        error,
        refreshApplications: loadSampleApplications,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  )
}
