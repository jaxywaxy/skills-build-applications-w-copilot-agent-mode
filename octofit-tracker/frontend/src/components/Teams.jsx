import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'TEAM', render: (item) => item.name ?? '-' },
  { label: 'MEMBERS', render: (item) => Array.isArray(item.memberIds) ? item.memberIds.length : 0 },
  { label: 'POINTS', render: (item) => item.points ?? 0 },
]

export default function Teams() {
  return <CollectionPage title="Teams" eyebrow="TOGETHER" resource="teams" endpoint="/api/teams/" columns={columns} emptyMessage="No teams are available yet." />
}