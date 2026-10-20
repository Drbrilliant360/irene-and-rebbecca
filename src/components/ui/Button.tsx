import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { ArrowRight } from './Icon'

type Variant = 'primary' | 'accent' | 'outline' | 'light' | 'whatsapp'
type Size = 'md' | 'sm'

const base =
  'group relative inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold transition-[transform,box-shadow,background-color,color] duration-200 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:focus-visible:-translate-y-0.5 motion-safe:active:scale-[0.97] hover:shadow-lift focus-visible:shadow-lift disabled:pointer-events-none disabled:opacity-60'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-blue-700 text-white hover:bg-blue-500 focus-visible:bg-blue-500',
  accent: 'bg-accent-yellow text-blue-900 hover:bg-[#ffd43b] focus-visible:bg-[#ffd43b]',
  outline:
    'border-2 border-blue-700 bg-white text-blue-700 hover:bg-blue-700 hover:text-white focus-visible:bg-blue-700 focus-visible:text-white',
  whatsapp: 'bg-accent-green-dark text-white hover:bg-[#11532d] focus-visible:bg-[#11532d]',
  light:
    'border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-900 focus-visible:bg-white focus-visible:text-blue-900',
}

const sizeClasses: Record<Size, string> = {
  md: 'px-4 py-3 text-[0.9375rem] sm:px-6 sm:text-base',
  sm: 'px-5 py-2 text-sm',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  arrow?: boolean
  children: ReactNode
  className?: string
}

const Arrow = () => (
  <ArrowRight
    aria-hidden="true"
    className="h-4 w-4 transition-transform duration-200 motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1"
  />
)

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  arrow = false,
  children,
  className,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = rest.href?.startsWith('http')
  return (
    <a
      {...rest}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(base, variantClasses[variant], sizeClasses[size], className)}
    >
      {children}
      {arrow && <Arrow />}
    </a>
  )
}

export function Button({
  variant = 'primary',
  size = 'md',
  arrow = false,
  children,
  className,
  type = 'button',
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} type={type} className={cn(base, variantClasses[variant], sizeClasses[size], className)}>
      {children}
      {arrow && <Arrow />}
    </button>
  )
}
