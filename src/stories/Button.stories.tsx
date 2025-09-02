import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../components/Button/Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Clique aqui',
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    loading: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
    },
  },
  tags: ['autodocs'],
}
export default meta

type Story = StoryObj<typeof Button>
export const Primary: Story = {}
export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}
export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
}
export const Loading: Story = {
  args: {
    loading: true,
  },
}
export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
}
export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
