import { useEffect } from 'react'
import type { RouteMeta } from '@/router/routes'

function setMeta(attr: string, key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function useSeo(meta: RouteMeta) {
  useEffect(() => {
    document.title = meta.seoTitle || 'ResumeIO'
    setMeta('name', 'description', meta.description || '')
    setMeta('property', 'og:title', meta.seoTitle || 'ResumeIO')
    setMeta('property', 'og:description', meta.description || '')
    setMeta('property', 'og:url', meta.canonical || 'https://resumeio.uz')
    setMeta('name', 'twitter:title', meta.seoTitle || 'ResumeIO')
    setMeta('name', 'twitter:description', meta.description || '')
    setCanonical(meta.canonical || 'https://resumeio.uz')
  }, [meta])
}
