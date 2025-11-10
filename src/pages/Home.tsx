import { useNavigate } from 'react-router-dom'

import { Loading } from '../components/Loading/Loading'
import { Navbar, type NavItem } from '../components/Navbar/Navbar'

export function Home() {
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
    <div className="flex flex-col gap-30">
      <Navbar navItems={items} activeLabel="Home" />
      <h1 className="text-2xl font-bold">HOME</h1>
      <Loading size="md" />
    </div>
  )
}
