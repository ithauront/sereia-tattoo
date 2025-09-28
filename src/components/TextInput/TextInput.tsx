import { forwardRef, useId, useMemo, useState } from 'react'

import { Eye, EyeSlash } from 'phosphor-react'

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ')
}

export type TextInputSize = 'sm' | 'md' | 'lg'

export type TextInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'id'> & {
  id?: string

  label?: string

  placeholder?: string

  isPassword?: boolean

  isRequired?: boolean

  isDisabled?: boolean

  isReadOnly?: boolean

  error?: string

  maxLength?: number

  minLength?: number

  className?: string

  fullWidth?: boolean

  ariaLabel?: string

  size?: TextInputSize
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    id,
    label,
    placeholder,
    isPassword = false,
    isRequired = false,
    isDisabled = false,
    isReadOnly = false,
    error,
    maxLength,
    minLength,
    className,
    fullWidth = true,
    ariaLabel,
    size = 'md',
    ...rest
  },
  ref,
) {
  const reactId = useId()
  const generatedId = useMemo(() => `ti-${reactId.replace(/:/g, '')}`, [reactId])
  const inputId = id ?? generatedId

  const [showPassword, setShowPassword] = useState(false)
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : (rest.type ?? 'text')

  const errorId = `${inputId}-error`
  const describedBy = [error ? errorId : null].filter(Boolean).join(' ') || undefined

  const sizeClasses: Record<TextInputSize, string> = {
    sm: 'text-sm h-9 px-2.5',
    md: 'text-base h-10 px-3',
    lg: 'text-lg h-12 px-3.5',
  }

  const baseInput = cn(
    'block rounded-md border outline-none placeholder-gray-400',
    'bg-white text-gray-900',
    'focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
    isDisabled && 'bg-gray-100 text-gray-400 cursor-not-allowed',
    isReadOnly && 'bg-gray-50',
    error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300',
    fullWidth ? 'w-full' : undefined,
    sizeClasses[size],
    isPassword ? 'pr-10' : undefined,
    className,
  )

  const labelMarkup = label ? (
    <label htmlFor={inputId} className={cn('mb-1 block text-sm font-medium text-gray-700')}>
      {label}
      {isRequired && (
        <span aria-hidden="true" className="text-red-600">
          &nbsp;*
        </span>
      )}
    </label>
  ) : null

  const toggleLabel = showPassword ? 'Hide password' : 'Show password'
  const handlePasswordToggle = () => setShowPassword((previous) => !previous)

  return (
    <div className={cn(fullWidth ? 'w-full' : 'w-auto')}>
      {labelMarkup}
      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          aria-invalid={!!error || undefined}
          aria-required={isRequired || undefined}
          aria-describedby={describedBy}
          aria-label={!label ? ariaLabel : undefined}
          disabled={isDisabled}
          readOnly={isReadOnly}
          maxLength={maxLength}
          minLength={minLength}
          autoComplete={isPassword ? (rest.autoComplete ?? 'current-password') : rest.autoComplete}
          className={baseInput}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={handlePasswordToggle}
            aria-label={toggleLabel}
            aria-pressed={showPassword}
            className={cn(
              'absolute inset-y-0 right-0 flex items-center pr-3',
              'text-gray-500 hover:text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md',
            )}
            data-testid="password-toggle"
            tabIndex={isDisabled ? -1 : 0}
            disabled={isDisabled}
          >
            {showPassword ? (
              <Eye size={20} aria-hidden className="inline-block" />
            ) : (
              <EyeSlash size={20} aria-hidden className="inline-block" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p id={errorId} role="alert" className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
})

export default TextInput
