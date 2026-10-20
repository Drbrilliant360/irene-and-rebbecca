import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { useTheme } from '../../theme/ThemeProvider'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  id: string
  eyebrow?: string
  title: string
  intro?: ReactNode
  /** For dark section backgrounds. */
  inverted?: boolean
  align?: 'center' | 'left'
}

export function SectionHeading({ id, eyebrow, title, intro, inverted, align }: SectionHeadingProps) {
  const theme = useTheme()
  const centered = (align ?? theme.headingAlign) === 'center'
  return (
    <Reveal className={cn('mb-10 max-w-measure sm:mb-12', centered && 'mx-auto text-center')}>
      {eyebrow && (
        <p
          className={cn(
            'mb-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider',
            inverted ? 'text-white' : 'text-blue-700',
          )}
        >
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-accent-yellow" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} className={cn('text-h2', inverted && 'text-white')}>
        {title}
      </h2>
      {theme.name === 'B' && (
        <span aria-hidden="true" className={cn('mt-4 block h-px w-24', inverted ? 'bg-white/50' : 'bg-blue-900/30', centered && 'mx-auto')} />
      )}
      {intro && <p className={cn('mt-4 text-lg', inverted ? 'text-white/90' : 'text-ink')}>{intro}</p>}
    </Reveal>
  )
}
