import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Bar } from './mockBars'

function Avatar({ large }: { large?: boolean }) {
  const size = large ? 36 : 28
  return <div className="mx-auto rounded-full bg-white/20" style={{ width: size, height: size }} />
}

function Name() {
  return <div className="h-1.5 w-[65%] rounded-[3px]" style={{ background: 'rgba(15, 23, 42, 0.7)' }} />
}

function Title({ color }: { color: string }) {
  return <div className="mt-1 h-1 w-[45%] rounded-sm" style={{ background: color }} />
}

function SectionMark({ mt = 10 }: { mt?: number }) {
  return <Bar width="40%" height={3} tone="dark" alpha={0.2} mt={mt} />
}

function LabelMark() {
  return <Bar width="50%" height={3} tone="dark" alpha={0.18} />
}

function DarkTag({ wide }: { wide?: boolean }) {
  return (
    <div
      className="rounded border border-white/20 bg-white/15"
      style={{ width: wide ? 32 : 24, height: 10 }}
    />
  )
}

function ResumePreview() {
  return (
    <div className="flex h-40 gap-2.5 overflow-hidden bg-linear-to-br from-[#f8faff] to-[#eef2ff] p-4">
      <div className="w-[35%] shrink-0 rounded-lg bg-slate-800 px-2 py-2.5">
        <Avatar />
        <Bar width="70%" tone="dark" mt={8} />
        <Bar width="50%" tone="dark" fade={0.6} mt={4} />
        <div className="mt-2.5 h-px bg-white/10" />
        <div className="mt-2 flex flex-col gap-1">
          <DarkTag />
          <DarkTag wide />
          <DarkTag />
        </div>
      </div>
      <div className="flex-1 py-1">
        <Name />
        <Title color="rgba(var(--brand-primary-rgb, 35, 159, 85), 0.5)" />
        <SectionMark />
        <Bar width="100%" tone="dark" mt={6} />
        <Bar width="90%" tone="dark" fade={0.7} mt={4} />
        <Bar width="60%" tone="dark" fade={0.5} mt={4} />
        <SectionMark />
        <Bar width="80%" tone="dark" mt={6} />
        <Bar width="70%" tone="dark" fade={0.6} mt={4} />
      </div>
    </div>
  )
}

function CoverLetterPreview() {
  return (
    <div className="flex h-40 flex-col overflow-hidden bg-linear-to-br from-[#faf8ff] to-[#f3e8ff] p-4">
      <div className="flex items-start gap-2 border-b border-[rgba(124,58,237,0.15)] pb-2">
        <div>
          <Name />
          <Title color="rgba(124, 58, 237, 0.45)" />
        </div>
      </div>
      <div className="flex-1">
        <SectionMark />
        <Bar width="90%" tone="dark" mt={6} />
        <Bar width="100%" tone="dark" fade={0.8} mt={4} />
        <Bar width="70%" tone="dark" fade={0.6} mt={4} />
        <div className="mt-2.5 h-1" />
        <Bar width="95%" tone="dark" mt={6} />
        <Bar width="80%" tone="dark" fade={0.7} mt={4} />
        <Bar width="60%" tone="dark" fade={0.5} mt={4} />
      </div>
    </div>
  )
}

function ObektivkaPreview() {
  const rows = ['80%', '70%', '60%', '75%']
  return (
    <div className="flex h-40 flex-col overflow-hidden bg-linear-to-br from-[#fff8f0] to-[#fef3c7] p-4">
      <div className="flex items-center gap-2">
        <Avatar large />
        <div className="flex-1">
          <Name />
          <Title color="rgba(245, 124, 0, 0.5)" />
        </div>
      </div>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        {rows.map((w) => (
          <div key={w}>
            <LabelMark />
            <Bar width={w} tone="dark" mt={4} />
          </div>
        ))}
      </div>
    </div>
  )
}

interface DocCardProps {
  preview: ReactNode
  title: string
  desc: string
  to: string
  cta: string
  ctaColor: string
}

function DocCard({ preview, title, desc, to, cta, ctaColor }: DocCardProps) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#e8edf3] bg-white transition-[transform,box-shadow] duration-250 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.09)]">
      {preview}
      <div className="flex flex-col gap-2 px-5.5 pt-5 pb-5.5">
        <h3 className="m-0 text-base font-bold text-slate-900">{title}</h3>
        <p className="m-0 flex-1 text-[0.84rem] leading-[1.6] text-slate-500">{desc}</p>
        <Link
          to={to}
          className="mt-1 inline-flex w-fit items-center gap-1 text-[13.5px] font-bold no-underline transition-[gap] hover:gap-2"
          style={{ color: ctaColor }}
        >
          {cta}
          <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Link>
      </div>
    </div>
  )
}

export default function DocumentTypesSection() {
  const { t } = useTranslation()

  return (
    <section className="pb-16">
      <div className="mb-10 text-center">
        <h2 className="m-0 mb-2 text-[1.65rem] font-extrabold tracking-[-0.01em] text-slate-900">
          {t('home.docs.title')}
        </h2>
        <p className="m-0 text-[0.95rem] text-slate-500">{t('home.docs.subtitle')}</p>
      </div>

      <div className="grid grid-cols-3 gap-6 max-[900px]:mx-auto max-[900px]:max-w-110 max-[900px]:grid-cols-1">
        <DocCard
          preview={<ResumePreview />}
          title={t('home.feature.resume_title')}
          desc={t('home.feature.resume_desc')}
          to="/resume"
          cta={t('home.create_resume')}
          ctaColor="var(--brand-primary)"
        />
        <DocCard
          preview={<CoverLetterPreview />}
          title={t('home.feature.cover_letter_title')}
          desc={t('home.feature.cover_letter_desc')}
          to="/cover-letter"
          cta={t('home.create_cover_letter')}
          ctaColor="#7c3aed"
        />
        <DocCard
          preview={<ObektivkaPreview />}
          title={t('home.feature.obektivka_title')}
          desc={t('home.feature.obektivka_desc')}
          to="/obektivka"
          cta={t('home.create_obektivka')}
          ctaColor="#d97706"
        />
      </div>
    </section>
  )
}
