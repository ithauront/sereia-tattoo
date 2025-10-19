type LoadingSize = 'sm' | 'md' | 'lg'
type LoadingColor = 'green' | 'blue' | 'red' | 'yellow' | 'black'

export type LoadingProps = {
  size?: LoadingSize
  color?: LoadingColor
  label?: string
}
export function Loading({ size = 'md', color = 'blue', label = 'Loading...' }: LoadingProps) {
  const spinnerSize = (() => {
    switch (size) {
      case 'sm':
        return 'h-4 w-4 border-2'
      case 'md':
        return 'h-8 w-8 border-4'
      case 'lg':
        return 'h-12 w-12 border-8'
      default:
        return 'h-8 w-8 border-4'
    }
  })()
  const spinnerColor = (() => {
    switch (color) {
      case 'green':
        return 'text-green-600 dark:text-green-200'
      case 'red':
        return 'text-red-600 dark:text-red-200'
      case 'yellow':
        return 'text-yellow-600 dark:text-yellow-200'
      case 'black':
        return 'text-slate-900 dark:text-slate-100'
      case 'blue':
      default:
        return 'text-blue-600 dark:text-blue-200'
    }
  })()
  return (
    <div
      className={`inline-block ${spinnerSize} animate-spin rounded-full border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] ${spinnerColor}`}
      role="status"
      aria-live="polite"
      aria-busy={true}
      aria-label={label}
    >
      <span className="sr-only">{label}</span>
    </div>
  )
}
