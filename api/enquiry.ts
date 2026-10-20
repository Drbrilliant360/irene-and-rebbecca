/**
 * Serverless endpoint for the enquiry form (Vercel Node runtime, Web Request/Response API).
 * Secrets live in environment variables only — see .env.example.
 *
 * Defences: JSON-only, body size cap, same-origin check, zod validation (same schema as
 * the browser), honeypot, per-IP rate limit, and plain-text email (no HTML injection).
 */
import { enquirySchema } from '../src/lib/enquirySchema.js'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const MAX_BODY_BYTES = 10_000

// Best-effort, per-instance memory. For a hard limit across instances use a shared store
// (e.g. Upstash Redis or Vercel KV).
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  return recent.length > MAX_PER_WINDOW
}

/** Removes control characters and angle brackets; keeps newlines for the message body. */
const clean = (value: string) =>
  value
    .replace(/[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .replace(/[<>]/g, '')
    .trim()

/** Single line for headers such as the subject. */
const oneLine = (value: string) => clean(value).replace(/\s+/g, ' ')

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  })

export async function POST(request: Request): Promise<Response> {
  if (!(request.headers.get('content-type') ?? '').includes('application/json')) {
    return json(415, { ok: false, error: 'unsupported_media_type' })
  }

  const origin = request.headers.get('origin')
  const host = request.headers.get('host')
  if (origin && host && new URL(origin).host !== host) {
    return json(403, { ok: false, error: 'forbidden' })
  }

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  if (rateLimited(ip)) return json(429, { ok: false, error: 'too_many_requests' })

  let body: unknown
  try {
    const text = await request.text()
    if (text.length > MAX_BODY_BYTES) return json(413, { ok: false, error: 'too_large' })
    body = JSON.parse(text)
  } catch {
    return json(400, { ok: false, error: 'invalid_json' })
  }

  const parsed = enquirySchema.safeParse(body)
  if (!parsed.success) {
    return json(422, {
      ok: false,
      errors: parsed.error.issues.map((i) => ({ field: i.path.join('.'), code: i.message })),
    })
  }
  const data = parsed.data

  // Honeypot filled: pretend success so bots learn nothing.
  if (data.website) return json(200, { ok: true })

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.ENQUIRY_TO_EMAIL
  const from = process.env.ENQUIRY_FROM_EMAIL
  if (!apiKey || !to || !from) return json(503, { ok: false, error: 'not_configured' })

  const text = [
    'New enquiry from the school website',
    '',
    `Parent / guardian: ${oneLine(data.parentName)}`,
    `Phone: ${oneLine(data.phone)}`,
    `Email: ${oneLine(data.email) || '—'}`,
    `Child's age: ${oneLine(data.childAge) || '—'}`,
    `Class of interest: ${oneLine(data.classInterest)}`,
    '',
    'Message:',
    clean(data.message),
  ].join('\n')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Website enquiry: ${oneLine(data.parentName)}`,
      text,
      ...(data.email ? { reply_to: oneLine(data.email) } : {}),
    }),
  })

  if (!res.ok) return json(502, { ok: false, error: 'delivery_failed' })
  return json(200, { ok: true })
}
