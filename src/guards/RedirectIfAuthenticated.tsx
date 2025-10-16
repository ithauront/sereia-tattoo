import { useEffect, useState } from 'react'

import { Navigate, Outlet } from 'react-router-dom'

import { fetchWithAuth } from '../lib/api'
import { getRefreshToken, hasValidAccessToken } from '../lib/auth'

type Props = { to?: string }

export default function RedirectIfAuthenticated({ to = '/admin' }: Props) {
  const [authed, setAuthed] = useState<boolean | 'checking'>('checking')

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (hasValidAccessToken()) {
        if (!cancelled) setAuthed(true)
        return
      }
      if (getRefreshToken()) {
        try {
          await fetchWithAuth('/auth/verify', {
            method: 'GET',
          })
          if (!cancelled) setAuthed(true)
          return
        } catch {
          /* permanece deslogado */
        }
      }
      if (!cancelled) setAuthed(false)
    }
    run()
    return () => {
      cancelled = true
    }
  }, [])

  if (authed === 'checking') return null
  return authed ? <Navigate to={to} replace /> : <Outlet />
}
