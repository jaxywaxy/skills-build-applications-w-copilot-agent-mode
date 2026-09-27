import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'NAME', render: (item) => item.displayName ?? item.name ?? '-' },
  { label: 'EMAIL', render: (item) => item.email ?? '-' },
]

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  return <CollectionPage title="Users" eyebrow="COMMUNITY" resource="users" endpoint={endpoint} columns={columns} emptyMessage="No users are available yet." />
}