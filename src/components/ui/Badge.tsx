import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Tone = 'green' | 'red' | 'yellow' | 'blue'

// Each tone pairs a fill with a text colour that passes WCAG AA.
const tones: Record<Tone, string> = {
  green: 'bg-accent-green-dark text-white',
  red: 'bg-accent-red text-white',
  yellow: 'bg-accent-yellow text-blue-900',
  blue: 'bg-blue-50 text-blue-900',
}

export function Badge({ tone = 'blue', children, className }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-bold', tones[tone], className)}>
      {children}
    </span>
  )
}
