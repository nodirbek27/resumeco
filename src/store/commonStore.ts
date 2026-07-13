import { create } from 'zustand'
import i18n from '@/i18n'
import type { Locale } from '@/i18n'

interface CommonState {
  locale: Locale
  themeColor: string
  setLocale: (locale: Locale) => void
  setThemeColor: (color: string) => void
}

const savedTheme = localStorage.getItem('theme') || '#239f55'
const savedLocale = (localStorage.getItem('locale') as Locale | null) || 'en'

export const useCommonStore = create<CommonState>((set) => ({
  locale: savedLocale,
  themeColor: savedTheme,
  setLocale: (locale) => {
    i18n.changeLanguage(locale)
    localStorage.setItem('locale', locale)
    set({ locale })
  },
  setThemeColor: (color) => {
    localStorage.setItem('theme', color)
    set({ themeColor: color })
  },
}))
