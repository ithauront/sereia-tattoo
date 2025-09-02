import { createRef } from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  it('render test and call onClick', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Clique aqui</Button>)
    const btn = screen.getByRole('button', {
      name: /clique aqui/i,
    })
    await user.click(btn)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('aply classes and size variations', () => {
    const { rerender } = render(
      <Button variant="primary" size="sm">
        A
      </Button>,
    )
    let btn = screen.getByRole('button', {
      name: 'A',
    })
    expect(btn.className).toMatch(/bg-brand/)
    expect(btn.className).toMatch(/h-9/)

    rerender(
      <Button variant="secondary" size="lg">
        A
      </Button>,
    )
    btn = screen.getByRole('button', {
      name: 'A',
    })
    expect(btn.className).toMatch(/bg-zinc-100/)
    expect(btn.className).toMatch(/h-12/)
  })

  it('show spinner when loading', () => {
    render(<Button loading>Carregando</Button>)
    const spinner = screen
      .getByRole('button', {
        name: /carregando/i,
      })
      .querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('pass ref to <button> element', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref}>Ref</Button>)
    expect(ref.current).toBeInstanceOf(HTMLButtonElement)
  })
})
