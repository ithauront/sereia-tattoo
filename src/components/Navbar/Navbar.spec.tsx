import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Navbar, type NavItem } from './Navbar'

describe('Navbar', () => {
  const homeMock = vi.fn()
  const aboutMock = vi.fn()
  const items: NavItem[] = [
    {
      label: 'Home',
      onClick: homeMock,
    },
    {
      label: 'About',
      onClick: aboutMock,
    },
    {
      label: 'Fotos',
      onClick: vi.fn(),
    },
    {
      label: 'Services',
      onClick: vi.fn(),
    },
    {
      label: 'Contact',
      onClick: vi.fn(),
    },
  ]

  it('should render desktop item About', () => {
    render(<Navbar navItems={items} activeLabel="Home" />)
    const desktop = screen.getByTestId('desktop-menu')
    expect(
      within(desktop).getByRole('button', {
        name: 'About',
      }),
    ).toBeInTheDocument()
  })

  it('should render when the mobile is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar navItems={items} activeLabel="Home" />)

    await user.click(
      screen.getByRole('button', {
        name: /abrir menu principal/i,
      }),
    )

    const mobile = screen.getByTestId('mobile-menu')
    expect(
      within(mobile).getByRole('button', {
        name: 'About',
      }),
    ).toBeInTheDocument()
  })

  it('should change styles when hover', async () => {
    const user = userEvent.setup()
    render(<Navbar navItems={items} activeLabel="Home" />)
    const desktop = screen.getByTestId('desktop-menu')
    const aboutButton = within(desktop).getByRole('button', {
      name: 'About',
    })
    await user.hover(aboutButton)
    expect(aboutButton).toHaveClass('font-medium')
    expect(aboutButton).toHaveClass('hover:text-blue-700')
    expect(aboutButton).not.toHaveClass('font-bold')
  })

  it('should only active label be bold and blue', async () => {
    render(<Navbar navItems={items} activeLabel="Home" />)
    const desktop = screen.getByTestId('desktop-menu')
    const homeButton = within(desktop).getByRole('button', {
      name: 'Home',
    })
    const aboutButton = within(desktop).getByRole('button', {
      name: 'About',
    })
    expect(homeButton).toHaveClass('text-blue-700')
    expect(homeButton).toHaveClass('font-bold')

    expect(aboutButton).toHaveClass('font-medium')
    expect(aboutButton).toHaveClass('text-gray-900')
    expect(aboutButton).not.toHaveClass('font-bold')
  })

  it('should navigate on click (mock)', async () => {
    const user = userEvent.setup()
    render(<Navbar navItems={items} activeLabel="Home" />)
    const desktop = screen.getByTestId('desktop-menu')
    const aboutButton = within(desktop).getByRole('button', {
      name: 'About',
    })
    await user.click(aboutButton)
    expect(aboutMock).toBeCalled()
  })

  it('should be acessible to change nav item with keyboard tab', async () => {
    const user = userEvent.setup()
    render(<Navbar navItems={items} activeLabel="Home" />)
    const desktop = screen.getByTestId('desktop-menu')
    const homeButton = within(desktop).getByRole('button', {
      name: 'Home',
    })
    const aboutButton = within(desktop).getByRole('button', {
      name: 'About',
    })
    const photosButton = within(desktop).getByRole('button', {
      name: 'Fotos',
    })

    homeButton.focus()
    expect(homeButton).toHaveFocus()

    await user.tab()
    expect(aboutButton).toHaveFocus()

    await user.tab()
    expect(photosButton).toHaveFocus()

    await user.tab({
      shift: true,
    })
    expect(aboutButton).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(aboutMock).toBeCalled()
    expect(homeMock).not.toHaveBeenCalled()
  })
})
