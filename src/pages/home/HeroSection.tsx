import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PersonIcon from '@mui/icons-material/Person'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined'
import { Bar, Tag } from './mockBars'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="grid grid-cols-2 items-center gap-14 py-18 max-[768px]:grid-cols-1 max-[768px]:gap-10 max-[768px]:py-12 max-[768px]:text-center">
      <div className="flex flex-col items-start max-[768px]:items-center">
        <div className="mb-5.5 inline-flex items-center gap-1.5 rounded-full border border-(--brand-primary)/20 bg-(--brand-primary)/8 px-3.5 py-1 text-xs font-semibold text-(--brand-primary)">
          <AutoAwesomeIcon sx={{ fontSize: 13 }} />
          <span>{t('home.hero_badge')}</span>
        </div>

        <h1 className="m-0 mb-4 text-[clamp(1.9rem,4.5vw,2.9rem)] leading-[1.18] font-black tracking-[-0.02em] text-slate-900">
          {t('home.welcome_message')}
        </h1>
        <p className="m-0 mb-8 max-w-[440px] text-base leading-[1.75] text-slate-500 max-[768px]:mx-auto">
          {t('home.subtitle')}
        </p>

        <Link
          to="/resume"
          className="mb-4.5 inline-flex items-center gap-2 rounded-full bg-(--brand-primary) px-8 py-3.5 text-[15px] font-bold text-white no-underline shadow-[0_4px_16px_rgba(var(--brand-primary-rgb,35,159,85),0.35)] max-[768px]:w-full max-[768px]:max-w-80 max-[768px]:justify-center"
        >
          <BadgeOutlinedIcon sx={{ fontSize: 18 }} />
          {t('home.create_resume')}
        </Link>

        <div className="mb-6 flex items-center gap-2.5 max-[768px]:justify-center">
          <Link
            to="/cover-letter"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-600 no-underline transition-colors hover:text-(--brand-primary)"
          >
            <EditNoteOutlinedIcon sx={{ fontSize: 15 }} />
            {t('home.create_cover_letter')}
          </Link>
          <span className="text-base text-slate-300">&middot;</span>
          <Link
            to="/obektivka"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-slate-600 no-underline transition-colors hover:text-(--brand-primary)"
          >
            <ContactMailOutlinedIcon sx={{ fontSize: 15 }} />
            {t('home.create_obektivka')}
          </Link>
        </div>

        <div className="flex flex-wrap gap-3.5 max-[768px]:justify-center">
          {[
            t('home.trust.no_registration'),
            t('home.trust.data_on_device'),
            t('home.trust.free_forever'),
          ].map((label) => (
            <span key={label} className="flex items-center gap-1.5 text-[12.5px] font-medium text-slate-500">
              <CheckCircleIcon color="primary" sx={{ fontSize: 15 }} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="relative flex items-center justify-center" aria-hidden="true">
        <div className="relative z-2 flex h-57.5 w-80 overflow-hidden rounded-xl border border-black/8 shadow-[0_20px_60px_rgba(0,0,0,0.18),0_4px_12px_rgba(0,0,0,0.08)] max-[768px]:h-50 max-[768px]:w-70 max-[480px]:h-42.5 max-[480px]:w-60">
          {/* sidebar */}
          <div className="w-[36%] shrink-0 bg-slate-800 px-3 py-4">
            <div className="mx-auto flex size-10 items-center justify-center rounded-full bg-white/15 text-white/65">
              <PersonIcon sx={{ fontSize: 20 }} />
            </div>
            <Bar width="70%" mt={10} />
            <Bar width="50%" fade={0.6} mt={4} />
            <div className="mt-3 h-px bg-white/10" />
            <Bar width="40%" height={4} tone="brand" mt={10} />
            <Bar width="80%" mt={8} />
            <Bar width="65%" fade={0.7} mt={5} />
            <Bar width="55%" fade={0.5} mt={5} />
            <div className="mt-3 h-px bg-white/10" />
            <Bar width="40%" height={4} tone="brand" mt={10} />
            <div className="mt-2 flex flex-wrap gap-1">
              <Tag width={28} />
              <Tag width={36} />
              <Tag width={28} />
              <Tag width={36} />
              <Tag width={44} />
            </div>
          </div>

          {/* main */}
          <div className="flex-1 bg-white px-3.5 py-4">
            <div className="text-[11px] leading-[1.2] font-extrabold whitespace-nowrap text-slate-900/85">
              Sophia Bennett
            </div>
            <div className="mt-1 text-[7.5px] font-bold tracking-[0.04em] whitespace-nowrap text-(--brand-primary) uppercase opacity-85">
              Product Designer
            </div>
            <Bar width="35%" height={4} tone="dark" alpha={0.2} mt={14} />
            <Bar width="100%" tone="dark" mt={8} />
            <Bar width="100%" tone="dark" fade={0.7} mt={5} />
            <Bar width="70%" tone="dark" fade={0.5} mt={5} />
            <Bar width="35%" height={4} tone="dark" alpha={0.2} mt={14} />
            <div className="mt-2 flex items-start justify-between">
              <div>
                <Bar width="60%" tone="dark" />
                <Bar width="45%" tone="dark" fade={0.6} mt={4} />
              </div>
              <Bar width="30%" height={4} tone="brand" alpha={0.4} />
            </div>
            <Bar width="100%" tone="dark" fade={0.4} mt={6} />
            <Bar width="90%" tone="dark" fade={0.3} mt={4} />
            <Bar width="35%" height={4} tone="dark" alpha={0.2} mt={14} />
            <div className="mt-2 flex items-start justify-between">
              <div>
                <Bar width="55%" tone="dark" />
                <Bar width="40%" tone="dark" fade={0.6} mt={4} />
              </div>
              <Bar width="30%" height={4} tone="brand" alpha={0.4} />
            </div>
          </div>
        </div>

        <div className="absolute -right-6 -bottom-7 z-3 w-35 rounded-[10px] border border-black/7 bg-white p-3 shadow-[0_8px_32px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.06)] max-[768px]:right-0 max-[768px]:-bottom-5 max-[768px]:w-30 max-[480px]:right-1 max-[480px]:w-25">
          <Bar width="80%" height={7} radius={4} tone="dark" alpha={1} />
          <Bar width="80%" tone="dark" mt={6} />
          <Bar width="60%" tone="dark" fade={0.7} mt={4} />
          <div className="mt-1.5 h-px bg-slate-200" />
          <Bar width="90%" tone="dark" mt={6} />
          <Bar width="85%" tone="dark" fade={0.8} mt={4} />
          <Bar width="50%" tone="dark" fade={0.6} mt={4} />
        </div>
      </div>
    </section>
  )
}
