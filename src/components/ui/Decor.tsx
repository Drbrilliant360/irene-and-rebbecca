import { m, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'

/** Slowly floating accent shape (6–8s loop). Static under reduced motion. */
export function FloatingShape({ className, duration = 7, delay = 0 }: { className: string; duration?: number; delay?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return <span aria-hidden="true" className={cn('pointer-events-none absolute', className)} />
  return (
    <m.span
      aria-hidden="true"
      className={cn('pointer-events-none absolute', className)}
      animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

/** Small cluster of coloured dots used as section decoration in Joyful Classic. */
export function DotCluster({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 80 80" className={cn('pointer-events-none absolute h-20 w-20', className)}>
      <circle cx="12" cy="14" r="6" fill="var(--yellow)" />
      <circle cx="40" cy="10" r="4" fill="var(--red)" />
      <circle cx="64" cy="22" r="7" fill="var(--green)" />
      <circle cx="24" cy="44" r="4" fill="var(--blue-500)" />
      <circle cx="54" cy="52" r="5" fill="var(--yellow)" />
      <circle cx="16" cy="70" r="3" fill="var(--red)" />
    </svg>
  )
}
