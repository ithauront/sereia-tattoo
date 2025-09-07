export type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type HeadingSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

const sizeClassMap: Record<HeadingSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
}

// eslint-disable-next-line no-magic-numbers
const clampClassMap: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  1: 'line-clamp-1',
  2: 'line-clamp-2',
  3: 'line-clamp-3',
  4: 'line-clamp-4',
  5: 'line-clamp-5',
  6: 'line-clamp-6',
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export type HeadingProps = {
  as?: HeadingAs
  size?: HeadingSize
  color?: string
  // eslint-disable-next-line no-magic-numbers
  num_of_lines?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
} & React.HTMLAttributes<HTMLHeadingElement>

export function Heading({
  as = 'h2',
  size = 'md',
  color = 'text-inherit',
  num_of_lines,
  className,
  children,
  ...rest
}: HeadingProps) {
  const Tag = as
  const clamp = num_of_lines ? clampClassMap[num_of_lines] : undefined

  return (
    <Tag
      className={cn('font-semibold leading-tight', sizeClassMap[size], color, clamp, className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
