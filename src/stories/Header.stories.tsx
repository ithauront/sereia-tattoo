import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

import { Header, type HeaderProps } from '../components/composed/Header/Header'

const meta: Meta<typeof Header> = {
  title: 'Components/composed/Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Header composto com logo e Navbar. Muda itens conforme área (pública/admin).',
      },
    },
  },

  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/home']}>
        <div
          style={{
            paddingTop: '5rem',
          }}
        >
          <Routes>
            <Route path="*" element={<Story />} />
          </Routes>
        </div>
      </MemoryRouter>
    ),
  ],

  args: {
    isAdminArea: false,
    logoSrc: '/Logo_Sereia.png',
  },

  argTypes: {
    isAdminArea: {
      control: 'boolean',
      description: 'Define se está na área logada (admin).',
    },
    logoSrc: {
      control: 'text',
      description: 'Caminho da logo (use public/ se desejar).',
    },
  },
}

export default meta
type Story = StoryObj<HeaderProps>

export const Public: Story = {
  args: {
    isAdminArea: false,
  },
}

export const Admin: Story = {
  args: {
    isAdminArea: true,
  },
}

export const Mobile: Story = {
  globals: {
    viewport: {
      value: 'iphone6',
      isRotated: false,
    },
  },
}
