export type Html2CanvasFn = (
    element: HTMLElement,
    options?: Record<string, unknown>,
  ) => Promise<HTMLCanvasElement>

function inlineComputedStyles(source: Element, target: Element): void {
    const computedStyle = window.getComputedStyle(source)
    let cssText = ''
    for (let i = 0; i < computedStyle.length; i++) {
          const property = computedStyle.item(i)
          const value = computedStyle.getPropertyValue(property)
          if (value) {
                  cssText += property + ':' + value + ';'
          }
    }
    ;(target as HTMLElement).style.cssText = cssText

  const sourceChildren = source.children
    const targetChildren = target.children
    for (let i = 0; i < sourceChildren.length; i++) {
          inlineComputedStyles(sourceChildren[i], targetChildren[i])
    }
}

export async function captureElementAsCanvas(
    source: HTMLElement,
    html2CanvasFn: Html2CanvasFn,
    options: Record<string, unknown> = {},
  ): Promise<HTMLCanvasElement> {
    const rect = source.getBoundingClientRect()
    const clone = source.cloneNode(true) as HTMLElement

  inlineComputedStyles(source, clone)

  clone.style.position = 'fixed'
    clone.style.top = '0'
    clone.style.left = '-99999px'
    clone.style.margin = '0'
    clone.style.width = rect.width + 'px'
    clone.style.height = rect.height + 'px'
    clone.style.transform = 'none'
    clone.style.zIndex = '-1'
    clone.style.pointerEvents = 'none'

  document.body.appendChild(clone)

  try {
        await new Promise((resolve) => requestAnimationFrame(() => resolve(null)))
        return await html2CanvasFn(clone, options)
  } finally {
        document.body.removeChild(clone)
  }
}
