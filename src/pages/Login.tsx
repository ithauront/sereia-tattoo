import { useState } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { Button } from '../components/Button/Button'
import TextInput from '../components/TextInput/TextInput'
import { login } from '../lib/api'
import logo from '/Logo_Sereia.png'
import sereia from '/Sereia.svg'
import sereiaMirror from '/SereiaMirror.svg'

type AuthRedirectState = {
  from?: { pathname: string }
}

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(submitEvent: React.FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault()
    setErrorMessage(null)

    try {
      await login(username, password)

      const state = location.state as AuthRedirectState | null
      const redirectPath = state?.from?.pathname ?? '/admin'
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
    <div className="flex gap-30 items-center justify-center pt-16 ">
      <div className="w-82 ">
        <img src={sereia} alt="Imagem Sereia Tattoo" />
      </div>
      <div className="flex flex-col">
        <div className=" flex items-center justify-center">
          <div className="w-32 h-auto pl-4 pt-8 ">
            <img src={logo} alt="Logotipo Sereia Tattoo" />
          </div>
        </div>
        <div className=" flex items-center justify-center pt-8 w-90 h-70">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
            aria-label="Formulário de login"
          >
            <div className="input-group">
              <TextInput
                value={username}
                onChange={(element) => setUsername(element.target.value)}
                label="Nome"
                required
              />
            </div>
            <div>
              <TextInput
                label="Senha"
                isPassword
                value={password}
                onChange={(element) => setPassword(element.target.value)}
                required
              />
            </div>
            <div className="w-full flex item-center justify-center">
              <Button
                className="w-30"
                type="submit"
                aria-label="Entrar"
                onClick={() => handleSubmit}
                loading
              >
                Entrar
              </Button>
            </div>
            {status && (
              <p
                role="alert"
                style={
                  status !== 'Login realizado com sucesso!'
                    ? {
                        color: 'white',
                        backgroundColor: '#25bee473',
                      }
                    : {}
                }
                aria-live="polite"
              >
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
      <div className="w-82 ">
        <img src={sereiaMirror} alt="Imagem espelho Sereia Tattoo" />
      </div>
    </div>
  )
}
