import { createContext, useContext, type ReactNode } from 'react'
import { variants, type ThemeName, type ThemeVariant } from './variants'

const ThemeContext = createContext<ThemeVariant>(variants.A)

export function ThemeProvider({ theme, children }: { theme: ThemeName; children: ReactNode }) {
  return <ThemeContext.Provider value={variants[theme]}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
