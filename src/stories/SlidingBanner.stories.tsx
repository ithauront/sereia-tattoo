import type { JSX } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { SlidingBanner } from '../components/composed/SlidingBanner/SlidingBanner'

const meta: Meta<typeof SlidingBanner> = {
  title: 'Components/composed/SlidingBanner',
  component: SlidingBanner,
  args: {
    message: 'Aproveite nossas promoções especiais para este mês!',
  },
  argTypes: {
    position: {
      options: ['left', 'right', 'top', 'bottom'],
      control: 'inline-radio',
      description:
        'Enum com default em left para posicionar de onde o slidingBanner vai aparecer em relação ao seu componente pai.',
    },
    className: {
      control: 'text',
      description:
        'string com classes para sobreescrever a estilização do slidingBanner. Precisa estar em sintax tailwind.',
    },
    delay: {
      control: 'number',
      description: 'Tempo de delay para renderização em segundos. Default de 3.',
    },
    message: {
      control: 'text',
      description: 'String do texto que aparecera dentro do banner. Required.',
    },
    actionButton: {
      control: 'object',
      description:
        'Um objeto com title:string e onClick. Ao ser passado um botão com o titulo de title vai ser renderizado apos a message do banner, e a função de onclick sera chamada no click do botão. em telas de celular o botão não renderiza e todo o baner fica clicavel com a função do onClick.',
    },
  },
  parameters: {
    layout: 'centered',
  },
}
export default meta

type Story = StoryObj<typeof SlidingBanner>

const wrapper = (StoryComponent: JSX.Element) => (
  <div className="relative h-64 w-full max-w-xl overflow-hidden rounded-xl bg-slate-800">
    <img
      src="/placeholder.jpg"
      alt="placeholder"
      className="h-full w-full object-cover opacity-70"
    />
    {StoryComponent}
  </div>
)

export const Default: Story = {
  render: (args) => wrapper(<SlidingBanner {...args} />),
}
export const WithActionButton: Story = {
  render: (args) =>
    wrapper(
      <SlidingBanner
        {...args}
        actionButton={{
          title: 'clique em mim',
          onClick: () => console.log('clicou'),
        }}
        delay={1}
      />,
    ),
}

export const CustomDelay: Story = {
  args: {
    delay: 5,
    message: 'Este banner aparece após 5 segundos.',
  },
  render: (args) => wrapper(<SlidingBanner {...args} />),
}

export const CustomPosition: Story = {
  args: {
    message: 'Banner vindo de baixo!',
    position: 'bottom',
  },
  render: (args) =>
    wrapper(
      <SlidingBanner
        {...args}
        actionButton={{
          title: 'clique em mim',
          onClick: () => console.log('clicou'),
        }}
      />,
    ),
}

export const Mobile: Story = {
  globals: {
    viewport: {
      value: 'iphone6',
      isRotated: false,
    },
  },
  render: (args) =>
    wrapper(
      <SlidingBanner
        {...args}
        actionButton={{
          title: 'clique em mim',
          onClick: () => console.log('clicou'),
        }}
      />,
    ),
}
