// src/pages/Auth/LoginPage.tsx
import { useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { login } from '../lib/api'

type AuthRedirectState = {
  from?: { pathname: string }
}

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(submitEvent: React.FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault()
    setErrorMessage(null)

    try {
      await login(username, password)

      const state = location.state as AuthRedirectState | null
      const redirectPath = state?.from?.pathname ?? '/admins'
      navigate(redirectPath, {
        replace: true,
      })
    } catch (caughtError: unknown) {
      let message = 'Login failed'
      if (caughtError instanceof Error) message = caughtError.message
      else if (typeof caughtError === 'string') message = caughtError
      setErrorMessage(message)
    }
  }

  return (
    <div className="max-w-sm p-6">
      <h1 className="mb-4 text-2xl font-bold">Login Page</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="w-full rounded border px-3 py-2"
          placeholder="username"
          value={username}
          onChange={(changeEvent) => setUsername(changeEvent.target.value)}
        />

        <input
          className="w-full rounded border px-3 py-2"
          placeholder="password"
          type="password"
          value={password}
          onChange={(changeEvent) => setPassword(changeEvent.target.value)}
        />

        {errorMessage && <p className="text-sm text-red-600">{errorMessage}</p>}

        <button className="rounded bg-blue-600 px-4 py-2 text-white" type="submit">
          Entrar
        </button>
      </form>
    </div>
  )
}
