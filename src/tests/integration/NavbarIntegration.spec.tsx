import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { Navbar, type NavItem } from '../../components/Navbar/Navbar'

describe('Navbar integration', () => {
  function AppWithNavbar() {
    const navigate = useNavigate()
    const location = useLocation()

    const items: NavItem[] = [
      {
        label: 'Home',
        onClick: () => navigate('/'),
      },
      {
        label: 'About',
        onClick: () => navigate('/about'),
      },
    ]

    const active = location.pathname === '/about' ? 'About' : 'Home'

    return (
      <>
        <Navbar navItems={items} activeLabel={active} />
        <main data-testid="page">{location.pathname}</main>
      </>
    )
  }
  it('Should navigate do correct page when click on item', async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<AppWithNavbar />} />
          <Route path="/about" element={<AppWithNavbar />} />
        </Routes>
      </MemoryRouter>,
    )
    const desktop = screen.getByTestId('desktop-menu')
    const aboutButton = within(desktop).getByRole('button', {
      name: 'About',
    })

    await user.click(aboutButton)
    expect(screen.getByTestId('page')).toHaveTextContent('/about')
  })
})
