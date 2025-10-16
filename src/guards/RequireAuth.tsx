import { useEffect, useState } from 'react'

import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { fetchWithAuth } from '../lib/api'
import { clearTokens, getRefreshToken, hasValidAccessToken } from '../lib/auth'

type RequireAuthProps = { redirectTo?: string }

export default function RequireAuth({ redirectTo = '/login' }: RequireAuthProps) {
  const location = useLocation()
  const [status, setStatus] = useState<'checking' | 'granted' | 'denied'>('checking')

  useEffect(() => {
    let cancelled = false
    async function check() {
      if (hasValidAccessToken()) {
        if (!cancelled) setStatus('granted')
        return
      }
      if (getRefreshToken()) {
        try {
          await fetchWithAuth('/auth/verify', {
            method: 'GET',
          })
          if (!cancelled) setStatus('granted')
          return
        } catch {
          clearTokens()
        }
      }
      if (!cancelled) setStatus('denied')
    }
    check()
    return () => {
      cancelled = true
    }
  }, [])

  if (status === 'checking') return null
  if (status === 'denied')
    return (
      <Navigate
        to={redirectTo}
        replace
        state={{
          from: location,
        }}
      />
    )
  return <Outlet />
}
