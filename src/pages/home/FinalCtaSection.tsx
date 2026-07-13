import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function FinalCtaSection() {
  const { t } = useTranslation()

  return (
    <section
      className="rounded-[28px] px-6 py-16 text-center max-[768px]:rounded-[20px] max-[768px]:px-5 max-[768px]:py-11"
      style={{ background: 'linear-gradient(135deg, var(--brand-primary) 0%, #1a1a2e 100%)' }}
    >
      <div className="mx-auto max-w-125">
        <h2 className="m-0 mb-3 text-[1.75rem] font-black tracking-[-0.02em] text-white">
          {t('home.cta.title')}
        </h2>
        <p className="m-0 mb-8 text-[0.95rem] leading-[1.7] text-white/80">{t('home.cta.subtitle')}</p>
        <div className="flex flex-wrap justify-center gap-3 max-[768px]:flex-col max-[768px]:items-center">
          <Link
            to="/resume"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-bold text-(--brand-primary) no-underline max-[768px]:w-full max-[768px]:max-w-70"
          >
            {t('home.cta.build_resume')}
          </Link>
          <Link
            to="/cover-letter"
            className="inline-flex items-center justify-center rounded-full border border-white/50 px-7 py-3 text-sm font-bold text-white no-underline transition-colors hover:bg-white/10 max-[768px]:w-full max-[768px]:max-w-70"
          >
            {t('home.cta.write_cover_letter')}
          </Link>
        </div>
      </div>
    </section>
  )
}
