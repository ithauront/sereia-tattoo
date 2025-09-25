import type { Meta, StoryObj } from '@storybook/react-vite'
import { useForm } from 'react-hook-form'

import TextInput, { type TextInputProps } from '../components/TextInput/TextInput'

const meta: Meta<TextInputProps> = {
  title: 'Form/TextInput',
  component: TextInput,
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
  },
  parameters: {
    docs: {
      description: {
        component:
          'Reusable, accessible text/password input with Tailwind styles, external control, and React Hook Form compatibility.\n\n' +
          '**Accessibility**: associates <label> via htmlFor, sets `aria-invalid` on error, `aria-required` when required, and links error via `aria-describedby`. Password toggle is keyboard-accessible with correct ARIA labels.\n\n' +
          '**Password mode**: toggle button shows/hides the value and updates `aria-pressed`.\n\n' +
          '**RHF**: forwardRef + native props allow use with `register` or `Controller`.\n\n' +
          '**Help text**: (coming soon) will use the project Tooltip component and attach to `aria-describedby`.\n',
      },
    },
  },
}
export default meta

export const Default: StoryObj<TextInputProps> = {
  render: (args) => <TextInput {...args} />,
}

export const Password: StoryObj<TextInputProps> = {
  args: {
    label: 'Password',
    isPassword: true,
    placeholder: '••••••••',
  },
}

export const ErrorState: StoryObj<TextInputProps> = {
  args: {
    error: 'This field is required',
    isRequired: true,
  },
}

export const Disabled: StoryObj<TextInputProps> = {
  args: {
    isDisabled: true,
    placeholder: 'Disabled...',
  },
}

export const ReadOnly: StoryObj<TextInputProps> = {
  args: {
    isReadOnly: true,
    value: 'Read-only value',
  },
}

export const Required: StoryObj<TextInputProps> = {
  args: {
    isRequired: true,
  },
}

export const Sizes: StoryObj<TextInputProps> = {
  render: () => (
    <div className="flex flex-col gap-4 w-full max-w-md">
      <TextInput label="Small" size="sm" placeholder="Small" />
      <TextInput label="Medium" size="md" placeholder="Medium" />
      <TextInput label="Large" size="lg" placeholder="Large" />
    </div>
  ),
}

export const FixedWidth: StoryObj<TextInputProps> = {
  args: {
    fullWidth: false,
  },
  render: (args) => (
    <div className="w-72">
      <TextInput {...args} />
    </div>
  ),
}

export const WithReactHookForm: StoryObj<TextInputProps> = {
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
