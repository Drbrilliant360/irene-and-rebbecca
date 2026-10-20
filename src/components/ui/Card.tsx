import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ImageContent } from '../../content/types'
import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/ThemeProvider'
import { SafeImage } from './SafeImage'

const accents = ['bg-accent-yellow', 'bg-accent-red', 'bg-accent-green']

interface CardProps {
  /** Position in its grid: picks the accent colour and any theme tilt/span. */
  index?: number
  image?: ImageContent
  href?: string
  linkLabel?: string
  children: ReactNode
  className?: string
}

/**
 * Card with lift + slight tilt, image zoom, an accent bar that draws in, and a sliding
 * "Learn more" link. Every hover effect also runs on keyboard focus (focus-within).
 */
export function Card({ index = 0, image, href, linkLabel, children, className }: CardProps) {
  const theme = useTheme()
  return (
    <article
      className={cn(
        'group relative flex h-full flex-col transition-transform duration-300 ease-out',
        'motion-safe:hover:-translate-y-1.5 motion-safe:focus-within:-translate-y-1.5',
        theme.hoverTilt && 'motion-safe:hover:-rotate-1 motion-safe:focus-within:-rotate-1',
        theme.tilt(index),
        theme.card,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100',
          theme.cardHoverShadow,
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-6 right-6 top-0 z-10 h-1.5 origin-left scale-x-0 rounded-b-full transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-within:scale-x-100',
          accents[index % accents.length],
        )}
      />
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[inherit]">
          <SafeImage
            {...image}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105 motion-safe:group-focus-within:scale-105"
          />
        </div>
      )}
      <div className="relative flex flex-1 flex-col p-6">
        {children}
        {href && linkLabel && (
          <a
            href={href}
            className="mt-auto inline-flex min-h-11 items-center gap-1 self-start pt-4 font-bold text-blue-700 underline-offset-4 hover:underline"
          >
            <span className="transition-transform duration-300 motion-safe:-translate-x-1 motion-safe:group-hover:translate-x-0 motion-safe:group-focus-within:translate-x-0">
              {linkLabel}
            </span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 opacity-0 transition-[transform,opacity] duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-within:translate-x-1 group-focus-within:opacity-100"
            />
          </a>
        )}
      </div>
    </article>
  )
}
