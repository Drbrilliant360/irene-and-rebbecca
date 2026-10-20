import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, Mail, MessageCircle, Phone } from 'lucide-react'
import { useId, useState, type ReactNode } from 'react'
import { useForm, type FieldError } from 'react-hook-form'
import { useLocale } from '../../content/LocaleProvider'
import { mailHref, site, telHref, whatsappHref } from '../../content/site'
import { CLASS_OPTIONS, enquirySchema, type EnquiryInput, type ErrorCode } from '../../lib/enquirySchema'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'mt-1 block w-full min-h-12 rounded-2xl border-2 border-blue-900/20 bg-white px-4 py-3 text-blue-900 transition-colors placeholder:text-ink/70 hover:border-blue-700 focus:border-blue-700 aria-[invalid=true]:border-accent-red'

function Field({
  id,
  label,
  error,
  hint,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="text-sm text-ink">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 flex items-center gap-1.5 text-sm font-bold text-accent-red">
          <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

/** Phone / WhatsApp / email links, shown in the failure message so families always have a way through. */
export function FallbackContacts() {
  const { t } = useLocale()
  const items = [
    { Icon: Phone, label: site.phone, href: telHref(site.phone) },
    { Icon: MessageCircle, label: `${t.contact.whatsapp} · ${site.whatsapp}`, href: whatsappHref(site.whatsapp) },
    { Icon: Mail, label: site.email, href: mailHref(site.email) },
  ]
  return (
    <ul className="mt-3 flex flex-wrap gap-3">
      {items.map(({ Icon, label, href }) => (
        <li key={label}>
          {href ? (
            <a href={href} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 font-bold text-blue-700 underline-offset-4 hover:underline">
              <Icon aria-hidden="true" className="h-4 w-4" />
              {href.startsWith('https://wa.me') ? t.contact.whatsapp : label}
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 font-bold text-blue-900">
              <Icon aria-hidden="true" className="h-4 w-4" />
              {label}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}

export default function ContactForm() {
  const { t } = useLocale()
  const c = t.contact
  const uid = useId()
  const [status, setStatus] = useState<Status>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    mode: 'onTouched',
    defaultValues: {
      parentName: '',
      phone: '',
      email: '',
      childAge: '',
      classInterest: '',
      message: '',
      consent: false,
      website: '',
    },
  })

  const errorText = (err?: FieldError) => (err?.message ? c.errors[err.message as ErrorCode] ?? err.message : undefined)
  const fid = (name: string) => `${uid}-${name}`
  const a11y = (name: keyof EnquiryInput, hint = false) => ({
    id: fid(name),
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': cn(hint && `${fid(name)}-hint`, errors[name] && `${fid(name)}-error`) || undefined,
  })

  const onSubmit = async (data: EnquiryInput) => {
    setStatus('sending')
    try {
      const res = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const hasErrors = isSubmitted && Object.keys(errors).length > 0

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-labelledby={`${uid}-title`} className="space-y-5">
      <h3 id={`${uid}-title`} className="text-h3">
        {c.formTitle}
      </h3>

      <div aria-live="polite" role="status">
        {hasErrors && status !== 'sending' && (
          <p className="flex items-center gap-2 rounded-2xl bg-accent-red px-4 py-3 font-bold text-white">
            <AlertCircle aria-hidden="true" className="h-5 w-5 shrink-0" />
            {c.errorSummary}
          </p>
        )}
        {status === 'success' && (
          <div className="rounded-2xl bg-accent-green-dark px-5 py-4 text-white">
            <p className="flex items-center gap-2 font-heading text-lg font-bold">
              <CheckCircle2 aria-hidden="true" className="h-5 w-5" />
              {c.success.title}
            </p>
            <p>{c.success.text}</p>
          </div>
        )}
        {status === 'error' && (
          <div className="rounded-2xl border-2 border-accent-red bg-blue-50 px-5 py-4">
            <p className="font-bold">{c.failure.title}</p>
            <p className="text-ink">{c.failure.text}</p>
            <FallbackContacts />
          </div>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id={fid('parentName')} label={c.fields.parentName} error={errorText(errors.parentName)}>
          <input {...register('parentName')} {...a11y('parentName')} type="text" autoComplete="name" className={inputClass} />
        </Field>
        <Field id={fid('phone')} label={c.fields.phone} error={errorText(errors.phone)}>
          <input {...register('phone')} {...a11y('phone')} type="tel" inputMode="tel" autoComplete="tel" className={inputClass} />
        </Field>
        <Field id={fid('email')} label={c.fields.email} hint={c.fields.emailHint} error={errorText(errors.email)}>
          <input {...register('email')} {...a11y('email', true)} type="email" autoComplete="email" className={inputClass} />
        </Field>
        <Field id={fid('childAge')} label={c.fields.childAge} error={errorText(errors.childAge)}>
          <input {...register('childAge')} {...a11y('childAge')} type="text" inputMode="numeric" className={inputClass} />
        </Field>
      </div>

      <Field id={fid('classInterest')} label={c.fields.classInterest} error={errorText(errors.classInterest)}>
        <select {...register('classInterest')} {...a11y('classInterest')} className={inputClass}>
          <option value="">{c.fields.classPlaceholder}</option>
          {CLASS_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {c.classOptions[opt]}
            </option>
          ))}
        </select>
      </Field>

      <Field id={fid('message')} label={c.fields.message} error={errorText(errors.message)}>
        <textarea {...register('message')} {...a11y('message')} rows={5} className={inputClass} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid('website')}>{c.fields.honeypot}</label>
        <input {...register('website')} id={fid('website')} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            {...register('consent')}
            {...a11y('consent')}
            type="checkbox"
            className="mt-1 h-6 w-6 shrink-0 rounded border-2 border-blue-900/40 accent-blue-700"
          />
          <label htmlFor={fid('consent')} className="text-ink">
            {c.fields.consent}{' '}
            <a
              href="#privacy"
              onClick={() => {
                const details = document.getElementById('privacy')
                if (details instanceof HTMLDetailsElement) details.open = true
              }}
              className="font-bold text-blue-700 underline underline-offset-4"
            >
              {c.fields.privacyLink}
            </a>
          </label>
        </div>
        {errors.consent && (
          <p id={`${fid('consent')}-error`} className="mt-1 flex items-center gap-1.5 text-sm font-bold text-accent-red">
            <AlertCircle aria-hidden="true" className="h-4 w-4 shrink-0" />
            {errorText(errors.consent)}
          </p>
        )}
      </div>

      <Button type="submit" arrow disabled={status === 'sending'} className="w-full sm:w-auto">
        {status === 'sending' ? c.sending : c.submit}
      </Button>
    </form>
  )
}
