import type { ObektivkaFormData } from '@/types/obektivka'

const STORAGE_KEY = 'obektivka_data'

export const obektivkaStorage = {
  save(data: ObektivkaFormData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  },

  load(): ObektivkaFormData | null {
    try {
      const json = localStorage.getItem(STORAGE_KEY)
      if (!json) return null
      const parsed = JSON.parse(json) as Partial<ObektivkaFormData> & { mehnatFaoliyati?: string }
      if (!parsed.mehnatFaoliyatiRoyxat) {
        parsed.mehnatFaoliyatiRoyxat = []
      }
      return parsed as ObektivkaFormData
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      return null
    }
  },

  clear(): void {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },

  exists(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== null
  },
}
