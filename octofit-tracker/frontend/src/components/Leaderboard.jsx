import CollectionPage from './CollectionPage.jsx'

const relatedName = (value) => {
  if (!value) return '-'
  if (typeof value === 'object') return value.displayName ?? value.name ?? value._id ?? '-'
  return value
}

const columns = [
  { label: 'RANK', render: (item) => item.rank ?? '-' },
  { label: 'USER', render: (item) => relatedName(item.userId) },
  { label: 'TEAM', render: (item) => relatedName(item.teamId) },
  { label: 'POINTS', render: (item) => item.points ?? 0 },
  { label: 'PERIOD', render: (item) => item.period ?? '-' },
]

export default function Leaderboard() {
  return <CollectionPage title="Leaderboard" eyebrow="IN THE MIX" resource="leaderboard" columns={columns} emptyMessage="Leaderboard entries will appear here." />
}