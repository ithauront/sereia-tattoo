import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Loading } from './Loading'

describe('Loading', () => {
  it('should render spinner', () => {
    render(<Loading />)

    expect(screen.getByRole('status')).toBeTruthy()
  })

  it('should render custom spinner (color and size)', () => {
    render(<Loading size="lg" color="black" />)

    const spinner = screen.getByRole('status')

    expect(spinner).toHaveClass('w-12')
    expect(spinner).toHaveClass('text-slate-900')
  })

  it('should render label and others acessibility aria', () => {
    render(<Loading label="Processando" />)

    const label = screen.getByText('Processando')
    const spinner = screen.getByRole('status')

    expect(spinner).toHaveAttribute('aria-live', 'polite')
    expect(spinner).toHaveAttribute('aria-busy', 'true')
    expect(spinner).toHaveAttribute('aria-label', 'Processando')

    expect(label).toBeTruthy()
  })
})
