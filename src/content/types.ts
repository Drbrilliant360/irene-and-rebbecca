import type { ClassOption, ErrorCode } from '../lib/enquirySchema'

export type Locale = 'en' | 'sw'

export const NAV_IDS = ['home', 'about', 'academics', 'admissions', 'news', 'contact'] as const
export type NavId = (typeof NAV_IDS)[number]

export type IconKey =
  | 'family'
  | 'parent'
  | 'pupil'
  | 'staff'
  | 'teacher'
  | 'shield'
  | 'book'
  | 'heart'
  | 'trophy'
  | 'handshake'
  | 'music'
  | 'art'
  | 'computer'
  | 'sport'
  | 'nature'
  | 'language'

export interface ImageContent {
  src: string
  alt: string
  width: number
  height: number
  caption?: string
}

export interface Content {
  locale: Locale
  meta: { languageToggleLabel: string; placeholderNote: string; opensNewTab: string }
  nav: Record<NavId, string> & {
    label: string
    enquire: string
    openMenu: string
    closeMenu: string
    skip: string
  }
  cta: { enquire: string; visit: string; apply: string; learnMore: string }
  hero: {
    badge: string
    headline: string
    /** Word in the headline that gets the yellow pencil underline. */
    highlight: string
    subline: string
    image: ImageContent
  }
  audiences: {
    title: string
    items: { id: 'families' | 'parents' | 'pupils' | 'staff'; icon: IconKey; title: string; text: string; target: string }[]
  }
  about: {
    eyebrow: string
    title: string
    statement: string
    mission: { title: string; text: string }
    vision: { title: string; text: string }
    story: string[]
    regBadge: string
    welcome: { title: string; text: string[]; name: string; role: string; image: ImageContent }
  }
  whyUs: {
    eyebrow: string
    title: string
    intro: string
    items: { icon: IconKey; title: string; text: string }[]
  }
  stats: {
    title: string
    items: { value: number | null; placeholder: string; suffix?: string; label: string }[]
  }
  academics: {
    eyebrow: string
    title: string
    intro: string
    stages: { title: string; range: string; text: string; image: ImageContent }[]
    subjectsTitle: string
    subjects: string[]
    clubsTitle: string
    clubs: { icon: IconKey; title: string }[]
    note: string
  }
  admissions: {
    eyebrow: string
    title: string
    intro: string
    steps: { title: string; text: string }[]
    docsTitle: string
    docs: string[]
    feesTitle: string
    feesText: string
    prospectus: string
    prospectusSoon: string
  }
  gallery: {
    eyebrow: string
    title: string
    intro: string
    images: ImageContent[]
    follow: string
    open: string
    lightbox: { label: string; close: string; prev: string; next: string; counter: string }
  }
  testimonials: {
    eyebrow: string
    title: string
    items: { quote: string; name: string; relation: string }[]
    regionLabel: string
    slideLabel: string
    prev: string
    next: string
    pause: string
    play: string
    goTo: string
  }
  news: {
    eyebrow: string
    title: string
    intro: string
    events: { day: string; month: string; tag: string; title: string; text: string }[]
    termTitle: string
    terms: { term: string; dates: string }[]
    termNote: string
  }
  contact: {
    eyebrow: string
    title: string
    intro: string
    formTitle: string
    fields: {
      parentName: string
      phone: string
      email: string
      emailHint: string
      childAge: string
      classInterest: string
      classPlaceholder: string
      message: string
      consent: string
      privacyLink: string
      honeypot: string
    }
    classOptions: Record<ClassOption, string>
    errors: Record<ErrorCode, string>
    errorSummary: string
    submit: string
    sending: string
    success: { title: string; text: string }
    failure: { title: string; text: string }
    details: { title: string; phone: string; email: string; address: string; hoursTitle: string; hours: string[] }
    whatsapp: string
    map: { title: string; load: string; note: string; unavailable: string }
    staff: { title: string; text: string }
  }
  footer: {
    description: string
    quickLinks: string
    contactTitle: string
    follow: string
    privacy: string
    privacyText: string[]
    rights: string
    backToTop: string
  }
  errors: { section: string }
}
