import * as React from 'react'

// Simple className merger (no external deps)
function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(' ')
}

export type TextInputSize = 'sm' | 'md' | 'lg'

export type TextInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'id'> & {
  /** Input ID. If not provided, a stable id is generated. */
  id?: string
  /** Input label. Renders <label htmlFor={id}> when provided. */
  label?: string
  /** Placeholder text. */
  placeholder?: string
  /** Enables password mode with show/hide button. */
  isPassword?: boolean
  /** Shows required indicator (*) and sets aria-required. */
  isRequired?: boolean
  /** Disabled state. */
  isDisabled?: boolean
  /** Read-only state. */
  isReadOnly?: boolean
  /** Error message. Applies error styles and aria-invalid. */
  error?: string
  /** Maximum characters allowed. */
  maxLength?: number
  /** Minimum characters required. */
  minLength?: number
  /** Extra classes merged into base styles. */
  className?: string
  /** Expands to 100% of container width. */
  fullWidth?: boolean
  /** Accessibility label when no label is provided. */
  ariaLabel?: string
  /** Input size, mapped to Tailwind classes. */
  size?: TextInputSize
  // helpText (placeholder for future prop) – string – default: null or undefined
  // Help text. Renders an icon that opens a tooltip with the content.
  // IMPORTANT: leave this prop as a comment for now. After we create the tooltip component we will come back and upgrade this.
}

/** Inline Eye icons (no external icon deps) */
const EyeIcon: React.FC<{ className?: string; title?: string }> = ({ className, title }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={title ? undefined : true}
    className={className}
  >
    {title ? <title>{title}</title> : null}
    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon: React.FC<{ className?: string; title?: string }> = ({ className, title }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={title ? undefined : true}
    className={className}
  >
    {title ? <title>{title}</title> : null}
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C6 20 2 12 2 12a20.8 20.8 0 0 1 5.06-6.94M9.9 4.24A10.94 10.94 0 0 1 12 4c6 0 10 8 10 8a20.79 20.79 0 0 1-3.22 4.62M1 1l22 22" />
  </svg>
)

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
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
    // spread the rest for RHF/native events
    ...rest
  },
  ref,
) {
  const reactId = React.useId()
  const generatedId = React.useMemo(() => `ti-${reactId.replace(/:/g, '')}`, [reactId])
  const inputId = id ?? generatedId

  const [showPassword, setShowPassword] = React.useState(false)
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : (rest.type ?? 'text')

  // Accessibility: describedby ties error (and later help) to input
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
    // when password toggle is present, add right padding to avoid overlap
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
            onClick={() => setShowPassword((wasVisible) => !wasVisible)}
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
              <EyeOffIcon className="h-5 w-5" title={toggleLabel} />
            ) : (
              <EyeIcon className="h-5 w-5" title={toggleLabel} />
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
