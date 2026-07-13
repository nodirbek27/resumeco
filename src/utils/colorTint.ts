function hexToRgb(hex: string) {
  const clean = hex.replace('#', '')
  const bigint = parseInt(clean, 16)
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 }
}

/** "r, g, b" triplet string, for building `rgba(var(--brand-primary-rgb), 0.x)` CSS. */
export function hexToRgbString(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  return `${r}, ${g}, ${b}`
}

export function tint(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex)
  const nr = Math.round(r + (255 - r) * amount)
  const ng = Math.round(g + (255 - g) * amount)
  const nb = Math.round(b + (255 - b) * amount)
  return `rgb(${nr}, ${ng}, ${nb})`
}

export function shade(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex)
  const nr = Math.round(r * (1 + amount))
  const ng = Math.round(g * (1 + amount))
  const nb = Math.round(b * (1 + amount))
  return `rgb(${Math.max(0, nr)}, ${Math.max(0, ng)}, ${Math.max(0, nb)})`
}
