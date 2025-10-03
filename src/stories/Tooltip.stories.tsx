import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tooltip, type TooltipProps } from '../components/Tooltip/Tooltip'

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Accessible, reusable Tooltip with Tailwind styles, portal rendering, and keyboard support. This component must have a children that will be the element that will enable the trigger action for the tooltip. The content prop is also required and will alloz the tooltip to display the content. We can customize the placemant, trigger action, styles, delay, and more.We recomend to do not include border if using custom styles to not lose the ilusion of arrow on the component.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'object',
      description: 'O children do Tooltip sera o elementoque ira disparar a ação de renderização.',
    },
    content: {
      control: 'text',
      description:
        'Geralmente uma string porém também aceita outros tipos de elementos como icones por exemplo. O content sera a informação renderizada no Tooltip.',
    },
    placement: {
      options: ['top', 'bottom', 'left', 'right'],
      control: 'inline-radio',
      description:
        'Propriedade opcional, o default é top. Essa propriedade define onde o tooltip vai renderizar em relação ao seu children.',
    },
    trigger: {
      options: ['hover', 'click', 'focus'],
      control: 'inline-radio',
      description:
        'Essa propriedade define qual tipo de ação vai disparar a renderização do tootip.',
    },
    delay: {
      control: 'number',
      description:
        'Essa propriedade vai definir quanto tempo de espera vamos ter entre a ação trigger e o aparecimento do tooltip.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Opcional, default false. Quando em true o tooltip não renderizara.',
    },
    className: {
      control: 'text',
      description:
        'Opcional, caso não seja passado o tooltip renderizara com uma estilização padrão. Propriedade para passar estilização com base na sintaxe do tailwind. Não indicamos passar border para quebrar a ilusão do arrow do tooltip.',
    },
  },

  args: {
    content: 'Hello from Tooltip',
    placement: 'top',
    trigger: 'hover',
    delay: 150,
  },
}
export default meta

type Story = StoryObj<TooltipProps>

export const Default: Story = {
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <Tooltip {...args}>
        <button className="rounded-lg border px-3 py-2">Hover me</button>
      </Tooltip>
    </div>
  ),
}

export const CustomDelay: Story = {
  args: {
    content: 'You waited one second',
    delay: 1000,
  },
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <Tooltip {...args}>
        <button className="rounded-lg border px-3 py-2">you have to wait for 1 sec</button>
      </Tooltip>
    </div>
  ),
}

export const FocusTrigger: Story = {
  args: {
    trigger: 'focus',
    content: 'Focus to see me',
  },
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <Tooltip {...args}>
        <button className="rounded-lg border px-3 py-2">Focus me (Tab)</button>
      </Tooltip>
    </div>
  ),
}

export const ClickTrigger: Story = {
  args: {
    trigger: 'click',
    content: 'Click toggles me',
  },
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <Tooltip {...args}>
        <button className="rounded-lg border px-3 py-2">Click me</button>
      </Tooltip>
    </div>
  ),
}

export const AllPlacements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-10 p-10">
      <Tooltip content="Top" placement="top">
        <button className="btn">Top</button>
      </Tooltip>
      <Tooltip content="Bottom" placement="bottom">
        <button className="btn">Bottom</button>
      </Tooltip>
      <Tooltip content="Left" placement="left">
        <button className="btn">Left</button>
      </Tooltip>
      <Tooltip content="Right" placement="right">
        <button className="btn">Right</button>
      </Tooltip>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    content: 'You should not see me',
  },
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <Tooltip {...args}>
        <button className="rounded-lg border px-3 py-2">Disabled tooltip</button>
      </Tooltip>
    </div>
  ),
}

export const CustomStyled: Story = {
  args: {
    content: 'Custom className',
    className: 'bg-indigo-700 text-white',
  },
  render: (args) => (
    <div className="flex h-64 items-center justify-center">
      <Tooltip {...args}>
        <span className="underline">Hover the text</span>
      </Tooltip>
    </div>
  ),
}

export const WrappingDifferentTriggers: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-6 p-6">
      <Tooltip content="On icon" trigger="hover">
        <span aria-label="info" className="cursor-help text-2xl">
          ℹ️
        </span>
      </Tooltip>
      <Tooltip content={<span>On input help</span>} trigger="focus" placement="right">
        <input className="rounded border px-2 py-1" placeholder="Focus me" />
      </Tooltip>
      <Tooltip
        content={
          <div className="max-w-[200px]">
            Longer JSX content with <b>bold</b> text.
          </div>
        }
        trigger="click"
      >
        <button className="rounded bg-blue-600 px-3 py-2 text-white">Click Me</button>
      </Tooltip>
    </div>
  ),
}
