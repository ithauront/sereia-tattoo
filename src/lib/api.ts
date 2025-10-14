// src/lib/api.ts
import { clearTokens, getAuthHeader, getRefreshToken, setTokens, type TokenPair } from './auth'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

async function refreshTokens(): Promise<void> {
  const refresh = getRefreshToken()
  if (!refresh) throw new Error('No refresh token')

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      refresh_token: refresh,
    }),
  })
  if (!res.ok) throw new Error('Refresh failed')
  const data = (await res.json()) as TokenPair
  setTokens(data)
}

/** fetch com Authorization + tentativa única de refresh em 401 */
export async function fetchWithAuth(
  input: string,
  init: RequestInit = {},
  retryOn401 = true,
): Promise<Response> {
  const url = input.startsWith('http') ? input : `${API_URL}${input}`
  const headers = {
    ...(init.headers || {}),
    ...getAuthHeader(),
  }

  let res = await fetch(url, {
    ...init,
    headers,
  })
  if (res.status === 401 && retryOn401) {
    try {
      await refreshTokens()
      const retryHeaders = {
        ...(init.headers || {}),
        ...getAuthHeader(),
      }
      res = await fetch(url, {
        ...init,
        headers: retryHeaders,
      })
    } catch {
      clearTokens()
      throw new Error('Unauthorized')
    }
  }
  return res
}

export async function login(username: string, password: string): Promise<void> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
  if (!res.ok) {
    const msg = await res.text()
    throw new Error(msg || 'Login failed')
  }
  const data = (await res.json()) as TokenPair
  setTokens(data)
}

export function logout(): void {
  clearTokens()
}

export async function verifyAccess(): Promise<{ valid: boolean; sub?: string }> {
  const res = await fetchWithAuth('/auth/verify', {
    method: 'GET',
  })
  if (!res.ok) throw new Error('Verify failed')
  return res.json()
}
