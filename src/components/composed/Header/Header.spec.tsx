import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Header } from './Header'

describe('Header', () => {
  const { navigateMock } = vi.hoisted(() => ({
    navigateMock: vi.fn(),
  }))

  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')

    return {
      ...actual,
      useNavigate: () => navigateMock,
      useLocation: () => ({
        pathname: '/home',
      }),
    }
  })
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders logo and navbar', () => {
    render(<Header isAdminArea={false} logoSrc="/Logo_Sereia.png" />)
    expect(screen.getByTestId('header-logo')).toBeInTheDocument()

    const desktop = screen.getByTestId('desktop-menu')
    expect(
      within(desktop).getByRole('button', {
        name: 'Início',
      }),
    ).toBeInTheDocument()
  })

  it('renders public items when isAdminArea is false', () => {
    render(<Header isAdminArea={false} />)

    const desktop = screen.getByTestId('desktop-menu')
    ;['Início', 'Quem somos', 'Fotos', 'Agende conosco', 'Contato'].forEach((label) => {
      expect(
        within(desktop).getByRole('button', {
          name: label,
        }),
      ).toBeInTheDocument()
    })
  })

  it('renders private items when isAdminArea is true', () => {
    render(<Header isAdminArea={true} />)

    const desktop = screen.getByTestId('desktop-menu')
    ;['Dashboard', 'Agenda e Aprovações', 'Notificações', 'Finanças'].forEach((label) => {
      expect(
        within(desktop).getByRole('button', {
          name: label,
        }),
      ).toBeInTheDocument()
    })
  })

  it('clicking the logo navigates to the correct route (mock)', async () => {
    const user = userEvent.setup()
    render(<Header />)

    await user.click(screen.getByTestId('header-logo'))
    expect(navigateMock).toHaveBeenCalledWith('/')
  })

  it('opens the mobile menu and displays the items', async () => {
    const user = userEvent.setup()
    render(<Header isAdminArea={false} />)

    await user.click(
      screen.getByRole('button', {
        name: /abrir menu principal/i,
      }),
    )
    const mobile = screen.getByTestId('mobile-menu')
    expect(
      within(mobile).getByRole('button', {
        name: 'Início',
      }),
    ).toBeInTheDocument()
  })
})
