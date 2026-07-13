import type { ThemeColorOption } from '@/theme/themeColors'

interface Props {
  colors: ThemeColorOption[]
  active: string
  onSelect: (color: string) => void
  className?: string
}

export default function ThemeColorSwatches({ colors, active, onSelect, className }: Props) {
  return (
    <div className={className}>
      {colors.map((c) => (
        <button
          key={c.color}
          type="button"
          aria-label={c.title}
          aria-pressed={active === c.color}
          onClick={() => onSelect(c.color)}
          className="h-6 w-6 shrink-0 rounded-full ring-1 ring-black/10 transition hover:scale-115 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
          style={{
            background: c.color,
            boxShadow: active === c.color ? '0 0 0 2px #fff, 0 0 0 4px #1e293b' : 'none',
          }}
        />
      ))}
    </div>
  )
}
