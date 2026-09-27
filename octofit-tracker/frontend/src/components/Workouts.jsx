import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'WORKOUT', render: (item) => item.name ?? '-' },
  { label: 'ACTIVITY', render: (item) => item.activityType ?? '-' },
  { label: 'DURATION', render: (item) => item.durationMinutes == null ? '-' : `${item.durationMinutes} min` },
  { label: 'DIFFICULTY', render: (item) => item.difficulty ?? '-' },
  { label: 'DESCRIPTION', render: (item) => item.description ?? '-' },
]

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  return <CollectionPage title="Workouts" eyebrow="NEXT UP" resource="workouts" endpoint={endpoint} columns={columns} emptyMessage="No workouts are available yet." />
}