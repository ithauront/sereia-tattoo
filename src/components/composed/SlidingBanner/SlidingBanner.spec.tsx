import { act } from 'react'

import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { oneSec } from '../../../utils/magicNumbers'
// eslint-disable-next-line import/order
import { SlidingBanner } from './SlidingBanner'

const mockMatchMedia = (matches: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
}

describe('slidingBanner tests', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.clearAllTimers()
    vi.useRealTimers()
  })
  test('if render banner', () => {
    render(<SlidingBanner message="test banner" />)

    const actionButton = screen.queryByTestId('action-button')
    expect(actionButton).not.toBeInTheDocument()

    expect(screen.getByText('test banner')).toBeInTheDocument()
  })

  test('if render with custom position', () => {
    render(<SlidingBanner message="custom banner" position="top" />)
    const banner = screen.getByTestId('sliding-banner')

    const bannerText = screen.getByText('custom banner')

    expect(bannerText).toBeInTheDocument()

    expect(banner).toHaveClass('top-0')
    expect(banner).toHaveClass('left-1/2')
    expect(banner).toHaveClass('-translate-x-1/2')
  })
  test('if respect custom delay', async () => {
    render(<SlidingBanner message="custom banner" delay={1} position="top" />)

    const banner = screen.getByTestId('sliding-banner')

    expect(banner).toHaveAttribute('aria-hidden', 'true')
    expect(banner).toHaveClass('-translate-y-full')
    expect(banner).not.toHaveClass('translate-y-0')

    await act(async () => {
      vi.advanceTimersByTime(oneSec)
    })
    expect(banner).toHaveAttribute('aria-hidden', 'false')
    expect(banner).toHaveClass('translate-y-0')
    expect(banner).not.toHaveClass('-translate-y-full')
  })
  test('if call actionButton function', async () => {
    vi.useRealTimers()
    const user = userEvent.setup()
    const mockFunction = vi.fn()
    render(
      <SlidingBanner
        message="custom banner"
        actionButton={{
          title: 'botão de teste',
          onClick: mockFunction,
        }}
      />,
    )
    const customBottom = screen.getByTestId('action-button')
    const buttonText = screen.getByText('botão de teste')

    expect(customBottom).toBeInTheDocument()
    expect(buttonText).toBeInTheDocument()

    await user.click(customBottom)
    expect(mockFunction).toBeCalledTimes(1)
  })

  test('if clamp lines', () => {
    const longMessage =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' +
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'

    render(<SlidingBanner message={longMessage} />)

    const messageElement = screen.getByTestId('sliding-banner-message')

    expect(messageElement).toBeInTheDocument()
    expect(messageElement).toHaveTextContent(longMessage)
    expect(messageElement).toHaveClass('line-clamp-3')
  })
  test('banner scrolls with the page (is not fixed positioned) and render on top of other elements(z-index)', () => {
    render(<SlidingBanner message="scroll banner" />)

    const banner = screen.getByTestId('sliding-banner')

    expect(banner).toHaveClass('absolute')
    expect(banner).not.toHaveClass('fixed')
    expect(banner).toHaveClass('z-20')
  })
  test('moves keyboard focus to the action button when it becomes visible', async () => {
    const mockFunction = vi.fn()

    render(
      <SlidingBanner
        message="focus banner"
        delay={0}
        actionButton={{
          title: 'botão',
          onClick: mockFunction,
        }}
      />,
    )

    const actionButton = screen.getByTestId('action-button')
    const banner = screen.getByTestId('sliding-banner')

    expect(banner).toHaveAttribute('aria-hidden', 'true')

    await act(async () => {
      vi.runAllTimers()
    })

    expect(banner).toHaveAttribute('aria-hidden', 'false')
    expect(document.activeElement).toBe(actionButton)
  })
  test('on small screens, banner uses mobile layout and hides action button', () => {
    mockMatchMedia(true)

    const mockFunction = vi.fn()

    render(
      <SlidingBanner
        message="texto longo para testar o layout mobile"
        actionButton={{
          title: 'botão',
          onClick: mockFunction,
        }}
      />,
    )

    const banner = screen.getByTestId('sliding-banner')
    const message = screen.getByTestId('sliding-banner-message')
    const actionButton = screen.queryByTestId('action-button')

    expect(banner).toHaveClass('flex')
    expect(banner).toHaveClass('items-center')
    expect(banner).toHaveClass('gap-3')

    expect(banner).toHaveClass('max-w-xs')

    expect(message).toHaveClass('line-clamp-3')

    expect(actionButton).not.toBeInTheDocument()

    expect(banner).toHaveAttribute('role', 'button')
    expect(banner).toHaveAttribute('tabindex', '0')
    expect(banner).toHaveAttribute('aria-label', 'botão')
  })
  test('on small screens, clicking the banner triggers actionButton onClick', () => {
    mockMatchMedia(true)

    const mockFunction = vi.fn()

    render(
      <SlidingBanner
        message="mobile action"
        actionButton={{
          title: 'botão',
          onClick: mockFunction,
        }}
      />,
    )

    const banner = screen.getByTestId('sliding-banner')
    const actionButton = screen.queryByTestId('action-button')

    expect(actionButton).not.toBeInTheDocument()

    fireEvent.click(banner)

    expect(mockFunction).toHaveBeenCalledTimes(1)
  })
})
