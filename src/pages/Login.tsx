import { useState } from 'react'

import { X } from 'phosphor-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../components/Button/Button'
import TextInput from '../components/TextInput/TextInput'
import { login } from '../lib/api'
import { minPasswordLength, minUsernameLength } from '../utils/magicNumbers'
import logo from '/Logo_Sereia.png'
import sereia from '/Sereia.svg'
import sereiaMirror from '/SereiaMirror.svg'

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(minUsernameLength, `Usuário deve ter ao menos ${minUsernameLength} caracteres`)
    .refine((value) => !/\s/.test(value), 'Usuário não pode conter espaços'),
  password: z
    .string()
    .min(minPasswordLength, `Senha deve ter ao menos ${minPasswordLength} caracteres`)
    .refine((value) => !/\s/.test(value), 'Senha não pode conter espaços'),
})
type FieldErrors = { username?: string; password?: string }

type AuthRedirectState = { from?: { pathname: string } }

export function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  const navigate = useNavigate()
  const location = useLocation()

  const isFormValid = loginSchema.safeParse({
    username,
    password,
  }).success

  async function handleSubmit(submitEvent: React.FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault()
    setErrorMessage(null)
    if (!isFormValid) {
      return
    }
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
      <div className="w-82 hidden lg:block" aria-hidden="true">
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
                onChange={(evento) => setUsername(evento.target.value)}
                label="Nome"
                required
                autoFocus
                onBlur={(evento) => {
                  const validation = loginSchema.shape.username.safeParse(evento.target.value)
                  setFieldErrors((parse) => ({
                    ...parse,
                    username: validation.success ? undefined : validation.error.issues[0].message,
                  }))
                }}
              />
              {fieldErrors.username && (
                <p id="username-error" role="alert" className="text-sm text-red-400 w-80">
                  {fieldErrors.username}
                </p>
              )}
            </div>
            <div>
              <TextInput
                label="Senha"
                isPassword
                value={password}
                onChange={(evento) => setPassword(evento.target.value)}
                required
                onBlur={(evento) => {
                  const validation = loginSchema.shape.password.safeParse(evento.target.value)
                  setFieldErrors((parse) => ({
                    ...parse,
                    password: validation.success ? undefined : validation.error.issues[0].message,
                  }))
                }}
              />
              {fieldErrors.password && (
                <p id="password-error" role="alert" className="text-sm text-red-400 w-80">
                  {fieldErrors.password}
                </p>
              )}
            </div>
            <div className="w-full flex item-center justify-center">
              <Button
                className="w-30"
                type="submit"
                aria-label="Entrar"
                onClick={() => handleSubmit}
                loading={isLoading}
                disabled={!isFormValid}
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
      <div className="w-82 hidden lg:block" aria-hidden="true">
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
