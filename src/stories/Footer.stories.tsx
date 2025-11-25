import type { Meta, StoryObj } from '@storybook/react-vite'

import { Footer } from '../components/composed/Footer/Footer'

const meta: Meta<typeof Footer> = {
  title: 'Components/composed/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Footer do site Sereia Tattoo, com logo clicável (scroll to top), endereço, direitos autorais e links de redes sociais.',
      },
    },
  },
}

export default meta
export type Story = StoryObj<typeof Footer>

export const Default: Story = {
  render: () => <Footer />,
}

export const Mobile: Story = {
  render: () => <Footer />,

  globals: {
    viewport: {
      value: 'iphone6',
      isRotated: false,
    },
  },
}
