import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Tooltip } from './Tooltip'

const advance = async (milliseconds: number) =>
  await new Promise((resolve) => setTimeout(resolve, milliseconds))

describe('Tooltip', () => {
  beforeEach(() => {
    vi.useRealTimers()
  })

  it('renders trigger and not tooltip by default', () => {
    render(
      <Tooltip content="Hello tooltip">
        <button>Trigger</button>
      </Tooltip>,
    )
    expect(screen.getByText('Trigger')).toBeInTheDocument()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('shows on hover and hides on mouse leave', async () => {
    render(
      <Tooltip content="Hover content" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    )
    const btn = screen.getByText('Hover me')
    fireEvent.mouseEnter(btn)
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
    fireEvent.mouseLeave(btn)
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })

  it('shows on focus and hides on blur when trigger="focus"', async () => {
    render(
      <Tooltip content="Focus tip" delay={0} trigger="focus">
        <button>Focus me</button>
      </Tooltip>,
    )
    const btn = screen.getByText('Focus me')
    btn.focus()
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
    btn.blur()
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })

  it('toggles on click and closes on ESC', async () => {
    render(
      <Tooltip content={<span>Click tip</span>} delay={0} trigger="click">
        <button>Click me</button>
      </Tooltip>,
    )
    const btn = screen.getByText('Click me')
    fireEvent.click(btn)
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
    fireEvent.keyDown(document, {
      key: 'Escape',
    })
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })

  it('applies aria-describedby to trigger when open', async () => {
    render(
      <Tooltip content="A11y" delay={0}>
        <button>Hover</button>
      </Tooltip>,
    )
    const btn = screen.getByText('Hover')
    fireEvent.mouseEnter(btn)
    const tip = await screen.findByRole('tooltip')
    expect(btn).toHaveAttribute('aria-describedby', tip.id)
  })

  it('respects isDisabled', async () => {
    render(
      <Tooltip content="Disabled" isDisabled>
        <button>Trigger</button>
      </Tooltip>,
    )
    const btn = screen.getByText('Trigger')
    fireEvent.mouseEnter(btn)
    // eslint-disable-next-line no-magic-numbers
    await advance(200)
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('supports all placements (data attribute)', async () => {
    // eslint-disable-next-line no-magic-numbers
    const makeRect = (left = 200, top = 200, width = 80, height = 32) => ({
      x: left,
      y: top,
      left,
      top,
      width,
      height,
      right: left + width,
      bottom: top + height,
      toJSON: () => {},
    })

    const setButtonRect = () => {
      const triggerButton = screen.getByText('Pl')
      Object.defineProperty(triggerButton, 'getBoundingClientRect', {
        configurable: true,
        value: () => makeRect(),
      })
      return triggerButton
    }
    const { rerender } = render(
      <Tooltip content="Tip" delay={0} placement="top">
        <button>Pl</button>
      </Tooltip>,
    )

    let buttoElement = setButtonRect()
    fireEvent.mouseEnter(buttoElement)
    expect(await screen.findByRole('tooltip')).toHaveAttribute('data-placement', 'top')
    fireEvent.mouseLeave(buttoElement)

    rerender(
      <Tooltip content="Tip" delay={0} placement="bottom">
        <button>Pl</button>
      </Tooltip>,
    )
    buttoElement = setButtonRect()
    fireEvent.mouseEnter(buttoElement)
    expect(await screen.findByRole('tooltip')).toHaveAttribute('data-placement', 'bottom')
    fireEvent.mouseLeave(buttoElement)

    rerender(
      <Tooltip content="Tip" delay={0} placement="left">
        <button>Pl</button>
      </Tooltip>,
    )
    buttoElement = setButtonRect()
    fireEvent.mouseEnter(buttoElement)
    expect(await screen.findByRole('tooltip')).toHaveAttribute('data-placement', 'left')
    fireEvent.mouseLeave(buttoElement)

    rerender(
      <Tooltip content="Tip" delay={0} placement="right">
        <button>Pl</button>
      </Tooltip>,
    )
    buttoElement = setButtonRect()
    fireEvent.mouseEnter(buttoElement)
    expect(await screen.findByRole('tooltip')).toHaveAttribute('data-placement', 'right')
  })
})
