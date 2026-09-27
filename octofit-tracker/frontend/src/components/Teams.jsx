import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'TEAM', render: (item) => item.name ?? '-' },
  { label: 'MEMBERS', render: (item) => Array.isArray(item.memberIds) ? item.memberIds.length : 0 },
  { label: 'POINTS', render: (item) => item.points ?? 0 },
]

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  return <CollectionPage title="Teams" eyebrow="TOGETHER" resource="teams" endpoint={endpoint} columns={columns} emptyMessage="No teams are available yet." />
}