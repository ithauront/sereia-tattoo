import { useState } from 'react'

import { X } from 'phosphor-react'
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
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const navigate = useNavigate()
  const location = useLocation()

  async function handleSubmit(submitEvent: React.FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault()
    setErrorMessage(null)

    try {
      setIsLoading(true)
      await login(username, password)

      const state = location.state as AuthRedirectState | null
      const redirectPath = state?.from?.pathname ?? '/admin'
      navigate(redirectPath, {
        replace: true,
      })
      setIsLoading(false)
    } catch (caughtError: unknown) {
      const message = 'Verifique usuário, senha e conexão'
      if (caughtError instanceof Error) console.log('ERRO: ', caughtError.message)
      else if (typeof caughtError === 'string') console.log('ERRO: ', caughtError)
      setErrorMessage(message)
      setIsLoading(false)
    }
  }

  return (
    <div className="flex gap-30 items-center justify-center pt-16 ">
      <div className="w-82 hidden lg:block w-72" aria-hidden="true">
        <img src={sereia} alt="Imagem Sereia Tattoo" loading="lazy" decoding="async" />
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
                autoFocus
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
                loading={isLoading}
              >
                Entrar
              </Button>
            </div>
            {errorMessage && (
              <div
                role="alert"
                aria-live="assertive"
                className="flex items-center gap-3 rounded-md border border-red-500/30 bg-red-600/15 px-4 py-3 backdrop-blur-sm"
              >
                <X color="red" />
                <p className="text-sm leading-5 text-slate-800">{errorMessage}</p>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="w-82 w-82 hidden lg:block w-72" aria-hidden="true">
        <img
          src={sereiaMirror}
          alt="Imagem espelho Sereia Tattoo"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}
