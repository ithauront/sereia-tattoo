import type { Meta, StoryObj } from '@storybook/react-vite'

import { Heading } from '../components/Heading/Heading'

const meta: Meta<typeof Heading> = {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Reusable `Heading` component. Choose semantic level via `as` (h1..h6), control visual size with `size`, set color with Tailwind text utilities using `color`, and clamp with `num_of_lines`. Default: `as="h2"`, `size="md"`, `color="text-inherit"`.',
      },
    },
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'HTML tag to render',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Visual size mapped to Tailwind font-size classes',
    },
    color: {
      control: 'text',
      description: 'Tailwind color class, e.g. `text-blue-600` or `text-inherit`',
    },
    num_of_lines: {
      control: 'number',
      description: 'Max number of lines before truncating (1–6)',
    },
    className: {
      control: 'text',
    },
    children: {
      control: 'text',
    },
  },
  args: {
    as: 'h2',
    size: 'md',
    color: 'text-inherit',
    children: 'The quick brown fox jumps over the lazy dog',
  },
}
export default meta

type Story = StoryObj<typeof Heading>

export const Default: Story = {}

export const EachLevel: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Heading {...args} as="h1">
        Heading h1
      </Heading>
      <Heading {...args} as="h2">
        Heading h2
      </Heading>
      <Heading {...args} as="h3">
        Heading h3
      </Heading>
      <Heading {...args} as="h4">
        Heading h4
      </Heading>
      <Heading {...args} as="h5">
        Heading h5
      </Heading>
      <Heading {...args} as="h6">
        Heading h6
      </Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All heading levels rendered semantically with the `as` prop.',
      },
    },
  },
}

export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Heading {...args} size="sm">
        Size sm
      </Heading>
      <Heading {...args} size="md">
        Size md
      </Heading>
      <Heading {...args} size="lg">
        Size lg
      </Heading>
      <Heading {...args} size="xl">
        Size xl
      </Heading>
      <Heading {...args} size="2xl">
        Size 2xl
      </Heading>
      <Heading {...args} size="3xl">
        Size 3xl
      </Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size variants mapped to Tailwind font-size classes.',
      },
    },
  },
}

export const Colors: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Heading {...args} color="text-inherit">
        Inherit (default)
      </Heading>
      <Heading {...args} color="text-slate-900">
        Slate 900
      </Heading>
      <Heading {...args} color="text-blue-600">
        Blue 600
      </Heading>
      <Heading {...args} color="text-emerald-600">
        Emerald 600
      </Heading>
      <Heading {...args} color="text-rose-600">
        Rose 600
      </Heading>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Set any Tailwind text color class using `color`.',
      },
    },
  },
}

export const Truncated: Story = {
  args: {
    num_of_lines: 2,
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum eget mauris ac nibh volutpat congue. Sed non ipsum ut justo imperdiet tincidunt sit amet at arcu. Phasellus auctor, sem at tempus varius, lorem urna aliquet est, non hendrerit felis nisi a nibh.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use `num_of_lines` to clamp paragraphs and show ellipsis after the given number of lines.',
      },
    },
  },
}
