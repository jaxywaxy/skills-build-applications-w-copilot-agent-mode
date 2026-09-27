import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'WORKOUT', render: (item) => item.name ?? '-' },
  { label: 'ACTIVITY', render: (item) => item.activityType ?? '-' },
  { label: 'DURATION', render: (item) => item.durationMinutes == null ? '-' : `${item.durationMinutes} min` },
  { label: 'DIFFICULTY', render: (item) => item.difficulty ?? '-' },
  { label: 'DESCRIPTION', render: (item) => item.description ?? '-' },
]

export default function Workouts() {
  return <CollectionPage title="Workouts" eyebrow="NEXT UP" resource="workouts" columns={columns} emptyMessage="No workouts are available yet." />
}