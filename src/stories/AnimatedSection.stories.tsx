import type { Meta, StoryObj } from '@storybook/react-vite'

import { AnimatedSection } from '../components/composed/AnimatedSection/AnimatedSection'

const meta: Meta<typeof AnimatedSection> = {
  title: 'Components/composed/AnimatedSection',
  component: AnimatedSection,
  args: {
    slideFrom: 'left',
    image: '/foto_1.jpg',
    imageAlt: 'imagem ilustrativa',
    text:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. ' +
      'Commodi, eum sapiente. Quibusdam, nihil quam provident cum sint accusamus ' +
      'labore dolor qui reiciendis numquam vitae alias.',
  },
  argTypes: {
    slideFrom: {
      options: ['left', 'right'],
      control: 'inline-radio',
      description:
        'Define de qual lado o conteúdo entra na tela e também a ordem visual dos elementos (imagem + texto).',
    },
    image: {
      control: 'text',
      description:
        'Path da imagem exibida na seção. Deve ser um caminho válido dentro do projeto ou um URL.',
    },
    imageAlt: {
      control: 'text',
      description:
        'Texto alternativo da imagem para acessibilidade. Caso não seja informado, um valor padrão será utilizado.',
    },
    text: {
      control: 'text',
      description:
        'Texto principal da seção. Renderizado como um parágrafo com alinhamento justificado.',
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Componente visual animado que exibe uma seção informativa composta por imagem e texto. ' +
          'Utiliza Framer Motion para animar a entrada do conteúdo conforme o scroll da página, ' +
          'alternando a direção e a ordem dos elementos com base na prop `slideFrom`.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof AnimatedSection>

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-slate-100 py-32 px-4">{children}</div>
)

export const Default: Story = {
  render: (args) => (
    <Wrapper>
      <AnimatedSection {...args} />
    </Wrapper>
  ),
}

export const SlideFromRight: Story = {
  args: {
    slideFrom: 'right',
    image: '/foto_2.png',
    imageAlt: 'imagem à direita',
  },
  render: (args) => (
    <Wrapper>
      <AnimatedSection {...args} />
    </Wrapper>
  ),
}

export const LongText: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '.repeat(10),
  },
  render: (args) => (
    <Wrapper>
      <AnimatedSection {...args} />
    </Wrapper>
  ),
}

export const WithoutImageAlt: Story = {
  args: {
    imageAlt: undefined,
  },
  render: (args) => (
    <Wrapper>
      <AnimatedSection {...args} />
    </Wrapper>
  ),
}
