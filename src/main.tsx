import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { LocaleProvider } from './content/LocaleProvider'
import { site } from './content/site'
import { ThemeProvider } from './theme/ThemeProvider'
import { isThemeName } from './theme/variants'
import './styles/globals.css'

// ?theme=a|b|c previews another style direction without changing the default in content/site.ts.
const requested = new URLSearchParams(window.location.search).get('theme')?.toUpperCase()
const theme = isThemeName(requested) ? requested : site.theme

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ThemeProvider theme={theme}>
          <LocaleProvider>
            <App />
          </LocaleProvider>
        </ThemeProvider>
      </MotionConfig>
    </LazyMotion>
  </StrictMode>,
)
