import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ru from './locales/ru.json'
import uz from './locales/uz.json'

export type Locale = 'uz' | 'ru' | 'en'

const savedLocale = (localStorage.getItem('locale') as Locale | null) || 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    uz: { translation: uz },
  },
  lng: savedLocale,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

document.documentElement.lang = savedLocale
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
})

export default i18n
