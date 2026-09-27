const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export function apiEndpoint(path) {
  return `${apiBaseUrl}/api/${path.replace(/^\/+/, '')}`
}

export function getCollectionItems(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  for (const key of ['results', 'items', 'data', 'records']) {
    const value = payload[key]
    if (Array.isArray(value)) return value
    if (value && typeof value === 'object') {
      const nestedItems = getCollectionItems(value)
      if (nestedItems.length > 0) return nestedItems
    }
  }

  return []
}