import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Footer } from './Footer'

describe('Footer', () => {
  it('renders brand name, address and rights text', () => {
    render(<Footer />)

    const year = new Date().getFullYear()
    const centerDiv = screen.getByTestId('center-div')

    expect(screen.getByTestId('footer')).toBeInTheDocument()

    expect(screen.getByText('Sereia Tattoo')).toBeInTheDocument()

    expect(
      screen.getByText('Av. Milton Santos, 58 - Ondina, Salvador - BA, 41950-810, Brasil'),
    ).toBeInTheDocument()

    expect(
      within(centerDiv).getByText(`© ${year}. Todos os direitos reservados.`),
    ).toBeInTheDocument()
  })

  it('renders logo button and social links', () => {
    render(<Footer />)

    const logoButton = screen.getByTestId('footer-logo')
    expect(logoButton).toBeInTheDocument()

    const logoImg = screen.getByAltText('Logo da Sereia Tattoo')
    expect(logoImg).toBeInTheDocument()

    const instagramLink = screen.getByRole('link', {
      name: /instagram/i,
    })
    const facebookLink = screen.getByRole('link', {
      name: /facebook/i,
    })
    const whatsappLink = screen.getByRole('link', {
      name: /whatsapp/i,
    })

    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/sereia_tattoostudio/')
    expect(facebookLink).toHaveAttribute(
      'href',
      'https://www.facebook.com/sereiatattoostudio/?locale=pt_BR',
    )
    expect(whatsappLink).toHaveAttribute('href', 'https://wa.me/5571987274015')
  })
  it('scrolls to top when logo is clicked', async () => {
    const user = userEvent.setup()
    const scroolSpy = vi.fn()
    window.scrollTo = scroolSpy

    render(<Footer />)

    const logoButton = screen.getByTestId('footer-logo')
    await user.click(logoButton)

    expect(scroolSpy).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    })
  })

  it('should not display center div when mobile', async () => {
    render(<Footer />)

    const centerDiv = screen.getByTestId('center-div')

    expect(centerDiv).toHaveClass('hidden')
    expect(centerDiv).toHaveClass('sm:flex')
  })
})
