import { useEffect, useState } from 'react'
import { apiEndpoint, getCollectionItems } from './api.js'

export default function CollectionPage({ title, eyebrow, resource, endpoint, columns, emptyMessage }) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [refreshCount, setRefreshCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(apiEndpoint(endpoint), { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        setItems(getCollectionItems(await response.json()))
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(loadError instanceof Error ? loadError.message : 'Unable to load this collection')
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    void loadCollection()
    return () => controller.abort()
  }, [resource, refreshCount])

  return (
    <section className="collection-page" aria-labelledby={`${resource}-title`}>
      <div className="collection-header">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={`${resource}-title`}>{title}</h1>
          <p className="intro">Browse the latest {title.toLowerCase()} in OctoFit.</p>
        </div>
        <button
          className="btn btn-outline-secondary collection-refresh"
          type="button"
          onClick={() => setRefreshCount((count) => count + 1)}
          disabled={loading}
        >
          Refresh
        </button>
      </div>

      <div className="collection-count" aria-live="polite">
        {loading ? 'Loading...' : `${items.length} ${items.length === 1 ? 'record' : 'records'}`}
      </div>

      {error ? (
        <p className="collection-message collection-message--error" role="alert">Could not load {title.toLowerCase()}: {error}</p>
      ) : loading && items.length === 0 ? (
        <p className="collection-message" role="status">Loading {title.toLowerCase()}...</p>
      ) : items.length === 0 ? (
        <p className="collection-message" role="status">{emptyMessage}</p>
      ) : (
        <div className="collection-table-wrap">
          <table className="table table-hover collection-table">
            <thead>
              <tr>{columns.map((column) => <th key={column.label} scope="col">{column.label}</th>)}</tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? `${resource}-${index}`}>
                  {columns.map((column) => <td key={column.label}>{column.render(item)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}