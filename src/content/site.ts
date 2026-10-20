/**
 * Facts that are the same in every language.
 * Anything in [SQUARE_BRACKETS] is a placeholder the school must replace.
 */
export const site = {
  name: 'Irene and Rebeca Primary School',
  shortName: 'Irene & Rebeca',
  regNo: 'P0508098',
  level: 'Primary',
  district: 'Missenyi',
  region: 'Kagera',
  country: 'Tanzania',

  instagram: 'https://www.instagram.com/ireneandrebecaprimary/',
  instagramHandle: '@ireneandrebecaprimary',

  phone: '[PHONE_NUMBER]', // e.g. +255 7XX XXX XXX
  email: '[EMAIL_ADDRESS]',
  whatsapp: '[WHATSAPP_NUMBER]', // international format, digits only, e.g. 2557XXXXXXXX
  address: '[PHYSICAL_ADDRESS]',
  admissionsYear: '[YEAR]',

  /** Google Maps "Embed a map" src URL. Leave empty to show the placeholder. */
  mapEmbedUrl: '',
  /** Link to the prospectus PDF, e.g. /prospectus.pdf. Leave empty until available. */
  prospectusUrl: '',
  /** Serverless endpoint that receives the enquiry form (see api/enquiry.ts). */
  formEndpoint: '/api/enquiry',

  /** Default style direction: 'A' Joyful Classic, 'B' Modern Editorial, 'C' Playful Bento. */
  theme: 'A' as 'A' | 'B' | 'C',
} as const

export const isPlaceholder = (value: string) => /^\[.*\]$/.test(value.trim())

export const telHref = (phone: string) =>
  isPlaceholder(phone) ? undefined : `tel:${phone.replace(/[^\d+]/g, '')}`

export const mailHref = (email: string) => (isPlaceholder(email) ? undefined : `mailto:${email}`)

export const whatsappHref = (number: string) =>
  isPlaceholder(number) ? undefined : `https://wa.me/${number.replace(/\D/g, '')}`
