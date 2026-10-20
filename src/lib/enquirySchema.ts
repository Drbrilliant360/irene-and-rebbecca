import { z } from 'zod'

// Shared by the browser form and the serverless function, so both validate the same way.
// Error messages are codes; the form maps them to friendly text in content/*.ts.

export const CLASS_OPTIONS = [
  'pre-primary',
  'std-1',
  'std-2',
  'std-3',
  'std-4',
  'std-5',
  'std-6',
  'std-7',
  'not-sure',
] as const
export type ClassOption = (typeof CLASS_OPTIONS)[number]

export type ErrorCode =
  | 'nameRequired'
  | 'phoneInvalid'
  | 'emailInvalid'
  | 'classRequired'
  | 'messageShort'
  | 'tooLong'
  | 'consentRequired'

const code = (c: ErrorCode) => c
const emailShape = z.string().email()

export const enquirySchema = z.object({
  parentName: z.string().trim().min(2, code('nameRequired')).max(80, code('tooLong')),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9][0-9\s-]{7,16}$/, code('phoneInvalid')),
  email: z
    .string()
    .trim()
    .max(120, code('tooLong'))
    .refine((v) => v === '' || emailShape.safeParse(v).success, code('emailInvalid')),
  childAge: z.string().trim().max(20, code('tooLong')),
  classInterest: z
    .string()
    .refine((v) => (CLASS_OPTIONS as readonly string[]).includes(v), code('classRequired')),
  message: z.string().trim().min(10, code('messageShort')).max(1000, code('tooLong')),
  consent: z.boolean().refine((v) => v, code('consentRequired')),
  /** Honeypot: hidden from people, bots tend to fill it in. */
  website: z.string().max(200),
})

export type EnquiryInput = z.infer<typeof enquirySchema>
