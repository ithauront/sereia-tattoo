import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { AnimatedSection } from './AnimatedSection'

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion')
  return {
    ...actual,
    motion: (await import('../../../tests/mocks/FramerMotionMock')).motion,
  }
})

describe('AnimatedSection', () => {
  test('renders text and image', () => {
    render(<AnimatedSection image="/test-image.jpg" imageAlt="test image" text="Texto de teste" />)

    expect(screen.getByText('Texto de teste')).toBeInTheDocument()

    const image = screen.getByAltText('test image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  test('renders image before text when slideFrom is left (default)', () => {
    render(<AnimatedSection image="/left.jpg" imageAlt="left image" text="Texto esquerda" />)

    const container = screen.getByText('Texto esquerda').parentElement
    expect(container).toBeTruthy()

    const children = Array.from(container!.children)

    expect(children[0].tagName).toBe('IMG')
    expect(children[1].tagName).toBe('P')
  })

  test('renders text before image when slideFrom is right', () => {
    render(
      <AnimatedSection
        slideFrom="right"
        image="/right.jpg"
        imageAlt="right image"
        text="Texto direita"
      />,
    )

    const container = screen.getByText('Texto direita').parentElement
    expect(container).toBeTruthy()

    const children = Array.from(container!.children)

    expect(children[0].tagName).toBe('P')
    expect(children[1].tagName).toBe('IMG')
  })

  test('uses default alt text when imageAlt is not provided', () => {
    render(<AnimatedSection image="/no-alt.jpg" text="Texto sem alt" />)

    expect(screen.getByAltText('section info image')).toBeInTheDocument()
  })

  test('applies base layout classes', () => {
    render(<AnimatedSection image="/layout.jpg" text="Layout test" />)

    const container = screen.getByText('Layout test').parentElement

    expect(container).toHaveClass('flex')
    expect(container).toHaveClass('gap-6')
    expect(container).toHaveClass('rounded-2xl')
  })
})
