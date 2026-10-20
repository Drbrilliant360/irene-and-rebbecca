import { ChevronLeft, ChevronRight, Pause, Play, Quote } from 'lucide-react'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { fill } from '../../content/LocaleProvider'
import type { Content } from '../../content/types'
import { cn } from '../../lib/cn'

type Labels = Content['testimonials']

const AUTOPLAY_MS = 7000
const controlClass =
  'inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-blue-700 text-blue-700 transition-colors hover:bg-blue-700 hover:text-white focus-visible:bg-blue-700 focus-visible:text-white'

/**
 * Accessible testimonial carousel (WAI-ARIA carousel pattern).
 * Autoplay pauses on hover/focus, can be paused with a visible button, and is off under reduced motion.
 */
export default function Carousel({ labels }: { labels: Labels }) {
  const reduce = useReducedMotion()
  const items = labels.items
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(!reduce)
  const [held, setHeld] = useState(false)

  useEffect(() => {
    if (reduce) setPlaying(false)
  }, [reduce])

  useEffect(() => {
    if (!playing || held) return
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % items.length), AUTOPLAY_MS)
    return () => window.clearInterval(timer)
  }, [playing, held, items.length])

  const go = (delta: number) => setIndex((i) => (i + delta + items.length) % items.length)
  const item = items[index]

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.regionLabel}
      className="mx-auto max-w-3xl"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHeld(false)}
    >
      <div aria-live={playing && !held ? 'off' : 'polite'} className="relative min-h-[16rem]">
        <AnimatePresence mode="wait" initial={false}>
          <m.figure
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={fill(labels.slideLabel, { n: index + 1, total: items.length })}
            className="relative rounded-card bg-white p-8 text-center shadow-soft sm:p-12"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <Quote aria-hidden="true" className="mx-auto mb-4 h-10 w-10 text-accent-yellow" />
            <blockquote className="text-xl font-semibold leading-relaxed text-blue-900 sm:text-2xl">
              <p>“{item.quote}”</p>
            </blockquote>
            <figcaption className="mt-6">
              <span className="block font-heading text-lg font-bold">{item.name}</span>
              <span className="text-ink">{item.relation}</span>
            </figcaption>
          </m.figure>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={() => go(-1)} aria-label={labels.prev} className={controlClass}>
          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className={cn(controlClass, 'w-auto gap-2 px-4 font-bold')}
        >
          {playing ? <Pause aria-hidden="true" className="h-4 w-4" /> : <Play aria-hidden="true" className="h-4 w-4" />}
          {playing ? labels.pause : labels.play}
        </button>
        <button type="button" onClick={() => go(1)} aria-label={labels.next} className={controlClass}>
          <ChevronRight aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex justify-center gap-1">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={fill(labels.goTo, { n: i + 1 })}
            aria-current={i === index ? 'true' : undefined}
            className="inline-flex h-11 w-11 items-center justify-center"
          >
            <span
              aria-hidden="true"
              className={cn(
                'block h-3 w-8 rounded-full transition-[transform,background-color] duration-300',
                i === index ? 'bg-blue-700' : 'scale-x-[0.375] bg-blue-900/25',
              )}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
