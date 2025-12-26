import env from '@/env'

const makeRequest = async <T>({
  query,
  variables = {},
}: {
  query: string
  variables?: Record<string, unknown>
}) => {
  try {
    const response = await fetch(`${env.storeUrl}/api/2025-10/graphql.json`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    })

    const data = await response.json()
    return data?.data ? (data.data as T) : null
  } catch {
    return null
  }
}

export default makeRequest
