import { forwardRef, type ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
}

const sizeCls = {
  sm: 'h-9 px-3 text-sm rounded-xl',
  md: 'h-10 px-4 text-base rounded-xl',
  lg: 'h-12 px-5 text-lg rounded-2xl',
}

const variantCls = {
  primary:
    'bg-brand text-white hover:bg-brand-dark focus-visible:ring-2 focus-visible:ring-sky-500',
  secondary:
    'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-sky-500',
  ghost:
    'bg-transparent text-zinc-900 hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-sky-500',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth,
      loading,
      className = '',
      children,
      disabled,
      ...rest
    }: ButtonProps,
    ref,
  ) => {
    const base =
      'inline-flex items-center justify-center transition-colors select-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
    const width = fullWidth ? 'w-full' : ''
    const classes = [base, sizeCls[size], variantCls[variant], width, className]
      .filter(Boolean)
      .join(' ')

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...rest}>
        {loading && (
          <span
            aria-hidden
            className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white"
          />
        )}
        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'
