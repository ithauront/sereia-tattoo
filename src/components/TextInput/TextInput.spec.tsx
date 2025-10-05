import { useState } from 'react'

import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { describe, expect, it, vi } from 'vitest'

import TextInput from './TextInput'
function typeIn(inputElement: HTMLElement, value: string) {
  fireEvent.change(inputElement, {
    target: {
      value,
    },
  })
}

describe('TextInput', () => {
  it('renders label and input', () => {
    render(<TextInput label="Email" placeholder="you@example.com" />)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
  })

  it('controlled mode: value and onChange', () => {
    const Wrapper = () => {
      const [inputValue, setinputValue] = useState('hi')
      return (
        <TextInput
          label="Name"
          value={inputValue}
          onChange={(evento) => setinputValue(evento.currentTarget.value)}
        />
      )
    }
    render(<Wrapper />)
    const input = screen.getByLabelText('Name') as HTMLInputElement
    expect(input.value).toBe('hi')
    typeIn(input, 'hello')
    expect(input.value).toBe('hello')
  })

  it('disabled & readOnly & error states', () => {
    const { rerender } = render(<TextInput label="Field" isDisabled />)
    const input = screen.getByLabelText('Field')
    expect(input).toBeDisabled()

    rerender(<TextInput label="Field" isReadOnly />)
    expect(screen.getByLabelText('Field')).toHaveAttribute('readonly')

    rerender(<TextInput label="Field" error="Required" />)
    const errorMsg = screen.getByText('Required')
    expect(errorMsg).toBeInTheDocument()
    expect(screen.getByLabelText('Field')).toHaveAttribute('aria-invalid', 'true')
  })

  it('aria-describedby links error', () => {
    render(<TextInput label="Login" error="Oops" />)
    const input = screen.getByLabelText('Login')
    const desc = input.getAttribute('aria-describedby')
    expect(desc).toBeTruthy()
    const errElement = screen.getByText('Oops')
    expect(errElement.id).toBe(desc)
  })

  it('password toggle switches type and aria-pressed', () => {
    render(<TextInput label="Password" isPassword />)
    const input = screen.getByLabelText('Password') as HTMLInputElement
    const toggle = screen.getByTestId('password-toggle')
    expect(input.type).toBe('password')
    fireEvent.click(toggle)
    expect(input.type).toBe('text')
    expect(toggle).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(toggle)
    expect(input.type).toBe('password')
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
  })

  it('merges className with base styles', () => {
    render(<TextInput label="X" className="ring-1" />)
    const input = screen.getByLabelText('X')
    expect(input.className).toContain('ring-1')
  })

  it('integrates with React Hook Form', async () => {
    const onSubmit = vi.fn()
    type Form = { email: string }
    const FormExample = () => {
      const { register, handleSubmit } = useForm<Form>({
        defaultValues: {
          email: '',
        },
      })
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput label="Email" placeholder="a@b.com" {...register('email')} />
          <button type="submit">Go</button>
        </form>
      )
    }

    render(<FormExample />)
    typeIn(screen.getByLabelText('Email'), 'user@test.com')
    fireEvent.click(screen.getByText('Go'))
    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    const args = onSubmit.mock.calls[0][0]
    expect(args).toEqual({
      email: 'user@test.com',
    })
  })

  it('does not render tooltip trigger when helpText is not provided', () => {
    render(<TextInput label="Field" />)
    expect(screen.queryByLabelText(/help/i)).not.toBeInTheDocument()
  })

  it('renders tooltip trigger next to label when helpText is provided (label case)', async () => {
    render(<TextInput label="Username" helpText="Seu identificador público" />)
    const helpBtn = screen.getByLabelText(/help/i)
    expect(helpBtn).toBeInTheDocument()

    fireEvent.mouseEnter(helpBtn)
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
  })

  it('renders tooltip trigger inside input when no label and helpText is provided', async () => {
    render(<TextInput placeholder="Nickname" helpText="Mostrado no seu perfil" />)
    const helpBtn = screen.getByLabelText(/help/i)
    expect(helpBtn).toBeInTheDocument()
    fireEvent.mouseEnter(helpBtn)
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
  })
})
