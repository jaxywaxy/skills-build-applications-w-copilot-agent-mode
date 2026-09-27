import CollectionPage from './CollectionPage.jsx'

const formatDate = (value) => {
  if (!value) return '-'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString()
}

const columns = [
  { label: 'ACTIVITY', render: (item) => item.activityType ?? '-' },
  { label: 'COMPLETED', render: (item) => formatDate(item.completedAt) },
  { label: 'DURATION', render: (item) => item.durationMinutes == null ? '-' : `${item.durationMinutes} min` },
  { label: 'DISTANCE', render: (item) => item.distanceKilometers == null ? '-' : `${item.distanceKilometers} km` },
]

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

export default function Activities() {
  return <CollectionPage title="Activities" eyebrow="MOVEMENT" resource="activities" endpoint={endpoint} columns={columns} emptyMessage="No activities have been logged yet." />
}