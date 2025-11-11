import { useNavigate } from 'react-router-dom'

import { Navbar, type NavItem } from '../components/Navbar/Navbar'

export function Photos() {
  const navigate = useNavigate()
  const items: NavItem[] = [
    {
      label: 'Home',
      onClick: () => navigate('/'),
    },
    {
      label: 'About',
      onClick: () => navigate('/about'),
    },
    {
      label: 'Fotos',
      onClick: () => navigate('/photos'),
    },
    {
      label: 'Services',
      onClick: () => navigate('/services'),
    },
    {
      label: 'Contact',
      onClick: () => navigate('/contact'),
    },
  ]
  return (
    <>
      <Navbar navItems={items} activeLabel="Fotos" />
      <h1 className="text-2xl font-bold">PHOTOS</h1>
    </>
  )
}
