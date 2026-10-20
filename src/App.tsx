import type { ComponentType } from 'react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { MobileCta } from './components/layout/MobileCta'
import { SkipLink } from './components/layout/SkipLink'
import { About } from './components/sections/About'
import { Academics } from './components/sections/Academics'
import { Admissions } from './components/sections/Admissions'
import { AudienceLinks } from './components/sections/AudienceLinks'
import { Contact } from './components/sections/Contact'
import { Gallery } from './components/sections/Gallery'
import { Hero } from './components/sections/Hero'
import { NewsEvents } from './components/sections/NewsEvents'
import { Stats } from './components/sections/Stats'
import { Testimonials } from './components/sections/Testimonials'
import { WhyUs } from './components/sections/WhyUs'
import { ErrorBoundary } from './components/ui/ErrorBoundary'
import { useLocale } from './content/LocaleProvider'

// Page order. Each section is isolated so one failure can't blank the page.
const sections: [string, ComponentType][] = [
  ['hero', Hero],
  ['audiences', AudienceLinks],
  ['about', About],
  ['why-us', WhyUs],
  ['stats', Stats],
  ['academics', Academics],
  ['admissions', Admissions],
  ['gallery', Gallery],
  ['testimonials', Testimonials],
  ['news', NewsEvents],
  ['contact', Contact],
]

function SectionFallback() {
  const { t } = useLocale()
  return (
    <div role="alert" className="container-site py-12">
      <p className="rounded-2xl bg-blue-50 p-6 font-bold">{t.errors.section}</p>
    </div>
  )
}

export default function App() {
  return (
    <>
      <SkipLink />
      <ErrorBoundary fallback={null}>
        <Header />
      </ErrorBoundary>
      <main id="main" tabIndex={-1} className="pt-20 focus:outline-none">
        {sections.map(([key, Section]) => (
          <ErrorBoundary key={key} fallback={<SectionFallback />}>
            <Section />
          </ErrorBoundary>
        ))}
      </main>
      <ErrorBoundary fallback={<SectionFallback />}>
        <Footer />
      </ErrorBoundary>
      <MobileCta />
    </>
  )
}
