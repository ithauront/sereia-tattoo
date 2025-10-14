export type TokenPair = { access_token: string; refresh_token: string }

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

const hasWindow = typeof window !== 'undefined'
const storage = hasWindow ? window.localStorage : null

export function getAccessToken(): string | null {
  try {
    return storage?.getItem(ACCESS_TOKEN_KEY) ?? null
  } catch {
    return null
  }
}
export function getRefreshToken(): string | null {
  try {
    return storage?.getItem(REFRESH_TOKEN_KEY) ?? null
  } catch {
    return null
  }
}
export function setTokens(pair: TokenPair): void {
  try {
    storage?.setItem(ACCESS_TOKEN_KEY, pair.access_token)
    storage?.setItem(REFRESH_TOKEN_KEY, pair.refresh_token)
  } catch {
    /* empty */
  }
}
export function clearTokens(): void {
  try {
    storage?.removeItem(ACCESS_TOKEN_KEY)
    storage?.removeItem(REFRESH_TOKEN_KEY)
  } catch {
    /* empty */
  }
}

export function parseJwt(token: string): Record<string, any> | null {
  try {
    const [, payload] = token.split('.')
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(base64))
  } catch {
    return null
  }
}
export function isTokenExpired(token: string): boolean {
  const payload = parseJwt(token)
  if (!payload || typeof payload.exp !== 'number') return true
  return payload.exp <= Math.floor(Date.now() / 1000)
}
export function hasValidAccessToken(): boolean {
  const t = getAccessToken()
  return !!t && !isTokenExpired(t)
}
export function getAuthHeader(): Record<string, string> {
  const t = getAccessToken()
  return t
    ? {
        Authorization: `Bearer ${t}`,
      }
    : {}
}
