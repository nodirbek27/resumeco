type Tone = 'light' | 'dark' | 'brand'

const BASE_ALPHA: Record<Tone, number> = { light: 0.25, dark: 0.12, brand: 0.5 }

function toneColor(tone: Tone, alpha: number) {
  if (tone === 'light') return `rgba(255, 255, 255, ${alpha})`
  if (tone === 'brand') return `rgba(var(--brand-primary-rgb, 35, 159, 85), ${alpha})`
  return `rgba(15, 23, 42, ${alpha})`
}

interface BarProps {
  width: string
  tone?: Tone
  /** Multiplies the tone's base alpha (mirrors the old `.opXX` utility classes). */
  fade?: number
  /** Overrides the alpha outright, for elements that always render at a fixed opacity. */
  alpha?: number
  height?: number
  radius?: number
  mt?: number
}

/** A single decorative skeleton line used to sketch document mockups (hero art, doc-type previews). */
export function Bar({ width, tone = 'light', fade = 1, alpha, height = 5, radius, mt = 0 }: BarProps) {
  return (
    <div
      style={{
        width,
        height,
        marginTop: mt,
        borderRadius: radius ?? Math.ceil(height / 2),
        background: toneColor(tone, alpha ?? BASE_ALPHA[tone] * fade),
        flexShrink: 0,
      }}
    />
  )
}

export function Tag({ width = 28 }: { width?: number }) {
  return <div className="rounded border border-white/15 bg-white/12" style={{ width, height: 12 }} />
}
