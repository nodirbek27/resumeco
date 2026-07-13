import { useTranslation } from 'react-i18next'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import OfflineBoltOutlinedIcon from '@mui/icons-material/OfflineBoltOutlined'
import PaletteIcon from '@mui/icons-material/Palette'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'

export default function BenefitsSection() {
  const { t } = useTranslation()

  const benefits = [
    { icon: LockOutlinedIcon, title: t('home.benefits.privacy_title'), desc: t('home.benefits.privacy_desc') },
    { icon: OfflineBoltOutlinedIcon, title: t('home.benefits.realtime_title'), desc: t('home.benefits.realtime_desc') },
    { icon: PaletteIcon, title: t('home.benefits.templates_title'), desc: t('home.benefits.templates_desc') },
    { icon: PictureAsPdfIcon, title: t('home.benefits.pdf_title'), desc: t('home.benefits.pdf_desc') },
  ]

  return (
    <section className="pb-16">
      <div className="mb-10 text-center">
        <h2 className="m-0 mb-2 text-[1.65rem] font-extrabold tracking-[-0.01em] text-slate-900">
          {t('home.benefits.title')}
        </h2>
        <p className="m-0 text-[0.95rem] text-slate-500">{t('home.benefits.subtitle')}</p>
      </div>
      <div className="grid grid-cols-2 gap-x-10 gap-y-7 max-[768px]:grid-cols-1 max-[768px]:gap-6">
        {benefits.map((b) => (
          <div key={b.title} className="flex items-start gap-4">
            <div className="flex size-11.5 shrink-0 items-center justify-center rounded-[13px] bg-(--brand-primary)/8">
              <b.icon color="primary" sx={{ fontSize: 22 }} />
            </div>
            <div>
              <h4 className="m-0 mb-1.5 text-[0.95rem] font-bold text-slate-900">{b.title}</h4>
              <p className="m-0 text-[0.84rem] leading-[1.65] text-slate-500">{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
