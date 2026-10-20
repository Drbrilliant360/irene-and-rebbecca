/** Scrolls to an in-page anchor, honouring reduced motion, and moves focus there for keyboard users. */
export function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '')
  const target = document.getElementById(id)
  if (!target) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
  history.pushState(null, '', `#${id}`)
}
