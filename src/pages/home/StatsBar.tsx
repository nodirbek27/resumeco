import { useTranslation } from 'react-i18next'

export default function StatsBar() {
  const { t } = useTranslation()

  const stats = [
    { value: '9', label: t('home.stats.resume_templates') },
    { value: '5', label: t('home.stats.cover_letter_styles') },
    { value: '100%', label: t('home.stats.free_forever') },
    { value: '0', label: t('home.stats.no_account') },
  ]

  return (
    <div className="mb-16 grid grid-cols-4 overflow-hidden rounded-[18px] border border-[#e8edf3] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)] max-[768px]:mb-12 max-[768px]:grid-cols-2">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={
            'flex flex-col gap-1 px-4 py-7 text-center max-[768px]:py-5 ' +
            (i < stats.length - 1 ? 'border-r border-slate-100 max-[768px]:border-r-0' : '') +
            (i < stats.length - 2 ? ' max-[768px]:border-b max-[768px]:border-slate-100' : '')
          }
        >
          <span className="text-[2rem] leading-none font-black text-(--brand-primary)">{s.value}</span>
          <span className="text-[0.78rem] font-medium text-slate-500">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
