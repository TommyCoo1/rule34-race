// src/lib/apiClient.ts

/**
 * Sends an HTTP request and returns the JSON-parsed response.
 **/
export async function fetchJson<T = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })

  if (!res.ok) {
    const errorBody = await res.text()
    throw new Error(`API error (${res.status}): ${errorBody}`)
  }

  try {
    return await res.json()
  } catch {
    throw new Error('Failed to parse JSON response')
  }
}
