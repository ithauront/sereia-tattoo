import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'

import TextInput, { type TextInputProps } from '../components/TextInput/TextInput'

const meta: Meta<TextInputProps> = {
  title: 'Form/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Reusable, accessible text/password input with Tailwind styles, external control, and React Hook Form compatibility.\n\n' +
          '**Accessibility**: associates <label> via htmlFor, sets `aria-invalid` on error, `aria-required` when required, and links error via `aria-describedby`. Password toggle is keyboard-accessible with correct ARIA labels.\n\n' +
          '**Password mode**: toggle button shows/hides the value and updates `aria-pressed`.\n\n' +
          '**RHF**: forwardRef + native props allow use with `register` or `Controller`.\n\n' +
          '**Tooltip integration**: pass `helpText` to render a help icon. If the input has a label, the icon appears next to it; otherwise, the icon is placed inside the input (right side). Tooltip opens after a delay and closes immediately on blur/hover-out.\n',
      },
    },
  },

  argTypes: {
    label: {
      control: 'text',
      description: 'Rótulo do campo.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder do input.',
    },
    ariaLabel: {
      control: 'text',
      description: 'Label acessível quando não há `label` visual.',
    },
    isPassword: {
      control: 'boolean',
      description: 'Ativa modo senha com show/hide.',
    },
    isRequired: {
      control: 'boolean',
      description: 'Exibe * e `aria-required`.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Estado desabilitado.',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Estado somente leitura.',
    },
    error: {
      control: 'text',
      description: 'Mensagem de erro + `aria-invalid`.',
    },

    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'inline-radio',
      },
      description: 'Tamanho do input.',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Ocupar 100% da largura.',
    },
    className: {
      control: 'text',
      description: 'Classes extras.',
    },

    maxLength: {
      control: 'number',
      description: 'Máximo de caracteres.',
    },
    minLength: {
      control: 'number',
      description: 'Mínimo de caracteres.',
    },
    autoComplete: {
      control: 'text',
      description: 'Sugestão do navegador.',
    },

    helpText: {
      control: 'text',
      description:
        'Conteúdo do tooltip. Quando presente, ativa o ícone de ajuda (ao lado do label ou dentro do input, se não houver label).',
    },

    onChange: {
      action: 'changed',
      description: 'Dispara no change.',
    },
    onBlur: {
      action: 'blurred',
      description: 'Dispara no blur.',
    },

    id: {
      control: false,
    },
    type: {
      control: false,
    },
  },

  args: {
    label: 'Label',
    placeholder: 'Type here...',
    isPassword: false,
    isRequired: false,
    isDisabled: false,
    isReadOnly: false,
    error: undefined,
    fullWidth: true,
    size: 'md',
    helpText: undefined,
  },
}
export default meta

export type Story = StoryObj<TextInputProps>

export const Default: Story = {
  render: (args) => <TextInput {...args} />,
}

export const Password: Story = {
  args: {
    label: 'Password',
    isPassword: true,
    placeholder: '••••••••',
  },
}

export const ErrorState: Story = {
  args: {
    error: 'This field is required',
    isRequired: true,
  },
}

export const Disabled: Story = {
  args: {
    isDisabled: true,
    placeholder: 'Disabled...',
  },
}

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
    value: 'Read-only value',
  },
}

export const Required: Story = {
  args: {
    isRequired: true,
  },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <TextInput label="Small" size="sm" placeholder="Small" />
      <TextInput label="Medium" size="md" placeholder="Medium" />
      <TextInput label="Large" size="lg" placeholder="Large" />
    </div>
  ),
}

export const FixedWidth: Story = {
  args: {
    fullWidth: false,
  },
  render: (args) => (
    <div className="w-72">
      <TextInput {...args} />
    </div>
  ),
}

export const WithReactHookForm: Story = {
  render: () => {
    type Form = { email: string; password: string }
    const { register, handleSubmit } = useForm<Form>({
      defaultValues: {
        email: '',
        password: '',
      },
    })
    const onSubmit = (data: Form) => alert(JSON.stringify(data, null, 2))
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-md">
        <TextInput
          label="Email"
          placeholder="you@example.com"
          {...register('email', {
            required: true,
          })}
        />
        <TextInput
          label="Password"
          isPassword
          {...register('password', {
            required: true,
          })}
        />
        <button
          type="submit"
          className="self-start rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Submit
        </button>
      </form>
    )
  },
}

export const WithHelpTextLabel: Story = {
  args: {
    label: 'Username',
    placeholder: 'Nickname',
    helpText: 'Seu identificador público. Min 3 caracteres.',
  },
}

export const WithHelpTextNoLabel: Story = {
  args: {
    label: undefined,
    placeholder: 'Nickname (sem label)',
    helpText: 'Mostrado no seu perfil.',
  },
}

export const PasswordWithHelpTextAndWithoutLabel: Story = {
  args: {
    label: undefined,
    isPassword: true,
    helpText: 'Use pelo menos 8 caracteres.',
  },
}
