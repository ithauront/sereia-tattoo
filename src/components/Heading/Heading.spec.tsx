import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Heading } from './Heading'

describe('Heading', () => {
  it('renders the correct HTML tag based on `as`', () => {
    render(<Heading as="h1">Title H1</Heading>)
    const h1 = screen.getByText('Title H1')
    expect(h1.tagName.toLowerCase()).toBe('h1')
  })

  it('uses default h2 when `as` is not provided', () => {
    render(<Heading>Default H2</Heading>)
    const el = screen.getByText('Default H2')
    expect(el.tagName.toLowerCase()).toBe('h2')
  })

  it('applies size classes', () => {
    const { rerender } = render(<Heading size="lg">Sized</Heading>)
    let el = screen.getByText('Sized')
    expect(el.className).toMatch(/\btext-lg\b/)

    rerender(<Heading size="xl">Sized</Heading>)
    el = screen.getByText('Sized')
    expect(el.className).toMatch(/\btext-xl\b/)
  })

  it('applies color classes from `color` prop', () => {
    render(
      <Heading color="text-blue-600" data-testid="head">
        Colored
      </Heading>,
    )
    const el = screen.getByTestId('head')
    expect(el.className).toMatch(/\btext-blue-600\b/)
  })

  it('adds a line-clamp class when `num_of_lines` is provided', () => {
    render(
      <Heading num_of_lines={2} data-testid="truncate">
        Very long text that should be truncated after two lines when container width is narrow.
      </Heading>,
    )
    const el = screen.getByTestId('truncate')
    expect(el.className).toMatch(/\bline-clamp-2\b/)
  })

  it('merges `className` correctly', () => {
    render(
      <Heading className="tracking-wide" data-testid="merge">
        Merged
      </Heading>,
    )
    const el = screen.getByTestId('merge')
    expect(el.className).toMatch(/\btracking-wide\b/)
  })
})
