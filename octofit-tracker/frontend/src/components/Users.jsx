import CollectionPage from './CollectionPage.jsx'

const columns = [
  { label: 'NAME', render: (item) => item.displayName ?? item.name ?? '-' },
  { label: 'EMAIL', render: (item) => item.email ?? '-' },
]

export default function Users() {
  return <CollectionPage title="Users" eyebrow="COMMUNITY" resource="users" endpoint="/api/users/" columns={columns} emptyMessage="No users are available yet." />
}