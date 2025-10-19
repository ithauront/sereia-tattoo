import type { Meta, StoryObj } from '@storybook/react-vite'

import { Loading, type LoadingProps } from '../components/Loading/Loading'

const meta: Meta<LoadingProps> = {
  title: 'Components/Loading',
  component: Loading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Reusable, accessible loading component that render a spinner',
      },
    },
  },

  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'inline-radio',
      },
      description: 'Optional. Default: "md". sizes can be "sm", "md" or "lg"',
    },

    color: {
      options: ['green', 'blue', 'red', 'yellow', 'black'],
      control: {
        type: 'inline-radio',
      },
      description:
        'Optional. Default:"blue". Colors can be "green", "blue", "red", "yellow", or "black"',
    },

    label: {
      control: 'text',
      description:
        'Optional. Default:"Loading...". The label will not render for user, we use it only for assecibility and it will by in a span with classname sr-only',
    },
  },
  args: {
    size: 'md',
    color: 'blue',
    label: 'Loading...',
  },
}

export default meta

export type Story = StoryObj<LoadingProps>

export const Default: Story = {
  render: (args) => <Loading {...args} />,
}

export const SizeAndColor: Story = {
  render: () => <Loading size="lg" color="green" />,
}

export const Label: Story = {
  render: () => <Loading label="This should only appear in element inspection" />,
}
