import { useTranslation } from 'react-i18next'
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

export default function StepsSection() {
  const { t } = useTranslation()

  const steps = [
    { icon: PaletteOutlinedIcon, label: t('home.steps.step1') },
    { icon: EditOutlinedIcon, label: t('home.steps.step2') },
    { icon: DownloadOutlinedIcon, label: t('home.steps.step3') },
  ]

  return (
    <section className="mb-16 rounded-3xl bg-slate-50 px-8 py-11 text-center max-[768px]:px-5 max-[768px]:py-9">
      <h2 className="m-0 mb-8 text-[1.35rem] font-extrabold tracking-[-0.01em] text-slate-900">
        {t('home.steps.title')}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-4 max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-6">
        {steps.map((step, i) => (
          <div key={step.label} className="contents">
            <div className="flex min-w-25 flex-col items-center gap-2.5 max-[768px]:min-w-0 max-[768px]:flex-row max-[768px]:justify-start max-[768px]:gap-3.5 max-[768px]:text-left">
              <div className="flex size-8.5 shrink-0 items-center justify-center rounded-full bg-(--brand-primary) text-sm font-extrabold text-white">
                {i + 1}
              </div>
              <div className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-(--brand-primary)/8">
                <step.icon color="primary" sx={{ fontSize: 24 }} />
              </div>
              <p className="m-0 max-w-22.5 text-[0.84rem] leading-[1.4] font-semibold text-slate-600 max-[768px]:max-w-none">
                {step.label}
              </p>
            </div>
            {i < steps.length - 1 && (
              <div className="mb-2.5 flex text-slate-300 max-[768px]:hidden">
                <ArrowRightAltIcon sx={{ fontSize: 20 }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
