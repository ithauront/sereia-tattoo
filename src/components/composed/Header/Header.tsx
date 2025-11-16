import { useMemo } from 'react'

import { useLocation, useNavigate } from 'react-router-dom'

import { Navbar, type NavItem } from '../../Navbar/Navbar'

export type HeaderProps = {
  isAdminArea?: boolean
  logoSrc?: string
}

export function Header({ isAdminArea = false, logoSrc = '/Logo_Sereia.png' }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const activeLabel = useMemo(() => {
    const path = location.pathname
    if (!isAdminArea) {
      if (path.startsWith('/photos')) return 'Fotos'
      if (path.startsWith('/schedule')) return 'Agende Conosco'
      if (path.startsWith('/contact')) return 'Contato'
      if (path.startsWith('/about')) return 'Quem somos'
      return 'Início'
    } else {
      if (path.startsWith('/approvals')) return 'Agenda e Aprovações'
      if (path.startsWith('/notifications')) return 'Notificações'
      if (path.startsWith('/finances')) return 'Finanças'
      return 'Dashboard'
    }
  }, [location.pathname, isAdminArea])

  const navItens: NavItem[] = useMemo(() => {
    if (!isAdminArea) {
      return [
        {
          label: 'Início',
          onClick: () => navigate('/'),
        },
        {
          label: 'Quem somos',
          onClick: () => navigate('/about'),
        },
        {
          label: 'Fotos',
          onClick: () => navigate('/photos'),
        },
        {
          label: 'Agende conosco',
          onClick: () => navigate('/schedule'),
        },
        {
          label: 'Contato',
          onClick: () => navigate('/contact'),
        },
      ]
    }
    return [
      {
        label: 'Dashboard',
        onClick: () => navigate('/dashboard'),
      },
      {
        label: 'Agenda e Aprovações',
        onClick: () => navigate('/approvals'),
      },
      {
        label: 'Notificações',
        onClick: () => navigate('/notifications'),
      },
      {
        label: 'Finanças',
        onClick: () => navigate('/finances'),
      },
    ]
  }, [isAdminArea, navigate])

  const goHome = () => {
    if (isAdminArea) navigate('/dashboard')
    else navigate('/')
  }

  return (
    <header
      className={[
        'sticky top-0 z-30 w-full border-b border-gray-200 bg-white/90 backdrop-blur',
        'dark:bg-gray-900/90 dark:border-gray-700',
      ].join(' ')}
    >
      <div
        className={[
          'mx-auto max-w-screen-xl p-3 sm:p-4',
          'flex items-center justify-between',
          'md:grid md:grid-cols-7 md:items-center',
        ].join(' ')}
      >
        <div className="flex items-center md:justify-start md:col-span-2">
          <button
            type="button"
            onClick={goHome}
            aria-label="Ir para página inicial"
            data-testid="header-logo"
            className="flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900"
          >
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Logo da empresa"
                className="h-8 w-auto object-contain sm:h-9 md:h-10"
                loading="eager"
                decoding="async"
              />
            ) : null}
          </button>
        </div>
        <div className="flex justify-end md:justify-center md:col-span-5">
          <Navbar navItems={navItens} activeLabel={activeLabel} />
        </div>
      </div>
    </header>
  )
}
