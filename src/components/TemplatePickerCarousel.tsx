import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlined'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import './TemplatePickerCarousel.css'

interface TemplateOption {
  id: string
  label: string
}

interface Props {
  templates: TemplateOption[]
  value: string
  onChange: (value: string) => void
  previewWidth?: number
  previewHeight?: number
  renderThumb: (id: string) => ReactNode
  className?: string
}

const CARD_FRACTION = 0.76

export default function TemplatePickerCarousel({
  templates,
  value,
  onChange,
  previewWidth = 700,
  previewHeight = Math.round(700 * 1.414),
  renderThumb,
  className,
}: Props) {
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [viewportWidth, setViewportWidth] = useState(0)
  const [frontIndex, setFrontIndex] = useState(() =>
    Math.max(
      0,
      templates.findIndex((t) => t.id === value),
    ),
  )
  const scrollRaf = useRef(0)

  const total = templates.length
  const cardWidth = viewportWidth * CARD_FRACTION
  const cardHeight = cardWidth * (previewHeight / previewWidth)
  const thumbScale = cardWidth > 0 ? cardWidth / previewWidth : 0

  const scrollToIndex = useCallback((i: number, smooth = true) => {
    cardRefs.current[i]?.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: smooth ? 'smooth' : 'auto',
    })
  }, [])

  const goTo = useCallback(
    (i: number) => {
      setFrontIndex(i)
      scrollToIndex(i)
    },
    [scrollToIndex],
  )

  const next = () => {
    if (frontIndex < total - 1) goTo(frontIndex + 1)
  }
  const prev = () => {
    if (frontIndex > 0) goTo(frontIndex - 1)
  }

  const onScroll = () => {
    if (scrollRaf.current) return
    scrollRaf.current = requestAnimationFrame(() => {
      scrollRaf.current = 0
      const el = viewportRef.current
      if (!el) return
      const center = el.getBoundingClientRect().left + el.clientWidth / 2
      let closest = frontIndex
      let closestDist = Infinity
      cardRefs.current.forEach((card, i) => {
        if (!card) return
        const rect = card.getBoundingClientRect()
        const dist = Math.abs(rect.left + rect.width / 2 - center)
        if (dist < closestDist) {
          closestDist = dist
          closest = i
        }
      })
      if (closest !== frontIndex) setFrontIndex(closest)
    })
  }

  useEffect(() => {
    const idx = templates.findIndex((t) => t.id === value)
    if (idx >= 0 && idx !== frontIndex) goTo(idx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setViewportWidth(el.clientWidth))
    ro.observe(el)
    setViewportWidth(el.clientWidth)
    scrollToIndex(frontIndex, false)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={'tpl-carousel' + (className ? ' ' + className : '')}>
      <div
        ref={viewportRef}
        className="tpl-viewport"
        style={{ height: cardHeight + 'px' }}
        onScroll={onScroll}
      >
        {templates.map((tpl, i) => (
          <div
            key={tpl.id}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            className={'tpl-card' + (i === frontIndex ? ' tpl-card--active' : '')}
            style={{ width: cardWidth + 'px' }}
            onClick={() => i !== frontIndex && goTo(i)}
          >
            <div className="tpl-thumb-viewport">
              <div
                className="tpl-thumb-canvas"
                style={{
                  width: previewWidth + 'px',
                  height: previewHeight + 'px',
                  transform: `scale(${thumbScale})`,
                }}
              >
                {renderThumb(tpl.id)}
              </div>
            </div>

            <div className="tpl-card-footer">
              <span className="tpl-card-label">{tpl.label}</span>
              {i === frontIndex && (
                <button
                  type="button"
                  className={
                    'tpl-choose-btn' + (tpl.id === value ? ' tpl-choose-btn--selected' : '')
                  }
                  onClick={(e) => {
                    e.stopPropagation()
                    onChange(tpl.id)
                  }}
                >
                  {tpl.id === value ? (
                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                  ) : (
                    <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
                  )}
                  {tpl.id === value ? 'Selected' : 'Choose Template'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="tpl-nav">
        <button type="button" className="tpl-nav-btn" disabled={frontIndex === 0} onClick={prev}>
          <ChevronLeftIcon sx={{ fontSize: 22 }} />
        </button>
        <span className="tpl-nav-count">
          {frontIndex + 1} / {total}
        </span>
        <button
          type="button"
          className="tpl-nav-btn"
          disabled={frontIndex === total - 1}
          onClick={next}
        >
          <ChevronRightIcon sx={{ fontSize: 22 }} />
        </button>
      </div>
    </div>
  )
}
