import { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Navbar, type NavbarProps, type NavItem } from '../components/Navbar/Navbar'

const meta: Meta<NavbarProps> = {
  title: 'Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Reusable, accessible navbar component that render a navigation bar',
      },
    },
  },
  args: {
    activeLabel: 'Home',
    navItems: [] as NavItem[],
  },

  argTypes: {
    navItems: {
      control: 'object',
      description:
        'Um array de objetos com dois elementos. Um label(string) que representa o nome da pagina; um onClick que representa a função acionada ao clicar no label(navigate).',
    },
    activeLabel: {
      control: 'text',
      description: 'Uma string que indica em qual pagina o usuario esta.',
    },
  },
}

export default meta
export type Story = StoryObj<NavbarProps>

function Template(args: NavbarProps) {
  const [activeLabel, setActiveLabel] = useState(args.activeLabel)
  useEffect(() => {
    setActiveLabel(args.activeLabel)
  }, [args.activeLabel])

  const items: NavItem[] = [
    {
      label: 'Home',
      onClick: () => setActiveLabel('Home'),
    },
    {
      label: 'About',
      onClick: () => setActiveLabel('About'),
    },
    {
      label: 'Services',
      onClick: () => setActiveLabel('Services'),
    },
    {
      label: 'Contact',
      onClick: () => setActiveLabel('Contact'),
    },
  ]
  return <Navbar activeLabel={activeLabel} navItems={items} />
}

function AdminTemplate(args: NavbarProps) {
  const [activeLabel, setActiveLabel] = useState(args.activeLabel)
  useEffect(() => {
    setActiveLabel(args.activeLabel)
  }, [args.activeLabel])
  const items: NavItem[] = [
    {
      label: 'Home',
      onClick: () => setActiveLabel('Home'),
    },
    {
      label: 'Appointments',
      onClick: () => setActiveLabel('Appointments'),
    },
    {
      label: 'Finances',
      onClick: () => setActiveLabel('Finances'),
    },
    {
      label: 'Stats',
      onClick: () => setActiveLabel('Stats'),
    },
  ]
  return <Navbar activeLabel={activeLabel} navItems={items} />
}

export const Default: Story = {
  render: (args) => <Template {...args} />,
}

export const CustomNavbarForAdmin: Story = {
  render: (args) => <AdminTemplate {...args} />,
}

export const Mobile: Story = {
  render: (args) => <Template {...args} />,
  globals: {
    viewport: {
      value: 'iphone6',
      isRotated: false,
    },
  },
}
