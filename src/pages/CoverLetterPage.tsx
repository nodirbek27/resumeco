import { useEffect, useRef, useState, useCallback } from 'react'
import { flushSync } from 'react-dom'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DownloadIcon from '@mui/icons-material/Download'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined'
import DonateDialog from '@/components/DonateDialog'
import TemplatePickerCarousel from '@/components/TemplatePickerCarousel'
import CoverLetterTemplateRender from '@/components/coverletter/CoverLetterTemplateRender'
import type { CoverLetterData } from '@/types/coverLetter'
import './CoverLetterPage.css'
import { captureElementAsCanvas } from '@/utils/pdfCapture'

const coverLetterTemplates = [
  { id: 'modern', label: 'Modern Minimalist' },
  { id: 'classic', label: 'Classic Professional' },
  { id: 'creative', label: 'Creative Accent' },
  { id: 'timeline', label: 'Elegant Timeline' },
  { id: 'bold-header', label: 'Bold Header' },
]

const STORAGE_KEY = 'cover_letter_builder_data'

const getLocalizedDate = () =>
  new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const defaultLetter: CoverLetterData = {
  senderName: '',
  senderTitle: '',
  senderEmail: '',
  senderPhone: '',
  senderAddress: '',
  senderWebsite: '',
  date: getLocalizedDate(),
  recipientName: '',
  recipientTitle: '',
  companyName: '',
  companyAddress: '',
  subject: '',
  salutation: '',
  bodyText: '',
  signOff: '',
}

type RoleKey =
  | 'developer'
  | 'manager'
  | 'designer'
  | 'sales'
  | 'marketing'
  | 'hr'
  | 'accountant'
  | 'support'
  | 'teacher'
  | 'data_analyst'
  | 'admin'
  | 'nurse'

const roleLabels: Record<RoleKey, string> = {
  developer: 'IT Developer / Software Engineer',
  manager: 'Project Manager',
  designer: 'UI/UX Designer',
  sales: 'Sales Representative',
  marketing: 'Marketing Specialist',
  hr: 'HR Manager',
  accountant: 'Accountant / Finance Specialist',
  support: 'Customer Support Specialist',
  teacher: 'Teacher / Educator',
  data_analyst: 'Data Analyst',
  admin: 'Administrative Assistant',
  nurse: 'Nurse / Healthcare Professional',
}

const roleTemplates: Record<
  RoleKey,
  (
    title: string,
    company: string,
    recipient: string,
    name: string,
  ) => { subject: string; salutation: string; body: string; signOff: string }
> = {
  developer: (title, company, recipient, name) => ({
    subject: `Application for ${title} Position`,
    salutation: `Dear ${recipient || 'Hiring Manager'},`,
    body: `I am writing to express my strong interest in the "${title}" position at "${company}". I bring professional expertise in software development and a proven track record of successfully delivering projects.\n\nI specialize in Vue.js, React, TypeScript, and modern web standards. Throughout my career, I have focused on building user-friendly, high-performance, and interactive applications. I have solid experience in teamwork, code quality improvement, and sound architectural design.\n\nThank you for taking the time to review my application. I look forward to the opportunity to discuss how my skills align with your needs.`,
    signOff: `Sincerely,\n${name}`,
  }),
  manager: (_title, company, recipient, name) => ({
    subject: `Application for Project Manager Position`,
    salutation: `Dear ${recipient || 'Hiring Manager'},`,
    body: `I am excited to apply for the Project Manager position at "${company}". I have extensive experience in project planning, team leadership, and delivering quality results within defined timelines and budgets.\n\nI actively apply Agile and Scrum methodologies and build effective communication within teams. Understanding client requirements and translating them into actionable tasks is one of my core strengths.\n\nThank you for considering my application. I look forward to discussing how I can contribute to your team.`,
    signOff: `Best regards,\n${name}`,
  }),
  designer: (_title, company, recipient, name) => ({
    subject: `Application for UI/UX Designer Position`,
    salutation: `Dear ${recipient || 'Hiring Manager'},`,
    body: `I am writing to express my interest in joining the design team at "${company}" as a UI/UX Designer. I have 3 years of experience in user research, wireframing, and creating beautiful, intuitive interfaces.\n\nI am proficient in Figma and Adobe CC, and I consistently aim to improve product conversion by simplifying the user journey. My creative approach and eye for aesthetics will make your team's products even more compelling.\n\nThank you for reviewing my portfolio and application.`,
    signOff: `Creatively yours,\n${name}`,
  }),
  sales: (_title, company, recipient, name) => ({
    subject: `Application for Sales Representative Position`,
    salutation: `Dear ${recipient || 'Hiring Manager'},`,
    body: `I am writing to express my interest in the Sales Representative position at "${company}". I possess strong skills in client relationship building, negotiations, and increasing sales volume.\n\nI have experience with CRM systems, market analysis, and handling objections effectively. I would be excited to contribute to expanding new markets and exceeding sales targets at your company.\n\nThank you for your time and consideration.`,
    signOff: `Sincerely,\n${name}`,
  }),
  marketing: (_title, company, recipient, name) => ({
    subject: `Application for Marketing Specialist Position`,
    salutation: `Dear ${recipient || 'Hiring Manager'},`,
    body: `I am writing to apply for the Marketing Specialist position at "${company}". I have hands-on experience planning and executing digital campaigns, growing social media engagement, and analyzing performance metrics to drive results.\n\nI am skilled in content strategy, SEO/SEM, and marketing analytics tools, and I enjoy turning data into actionable insights that improve brand visibility and conversion rates.\n\nThank you for considering my application. I would welcome the opportunity to bring fresh ideas to your marketing team.`,
    signOff: `Best regards,\n${name}`,
  }),
  hr: (_title, company, recipient, name) => ({
    subject: `Application for HR Manager Position`,
    salutation: `Dear ${recipient || 'Hiring Manager'},`,
    body: `I am excited to apply for the HR Manager position at "${company}". I have experience managing the full recruitment cycle, employee onboarding, performance reviews, and fostering a positive workplace culture.\n\nI am skilled in conflict resolution, policy development, and HR information systems, and I take pride in building strong relationships between staff and management.\n\nThank you for your time and consideration. I look forward to discussing how I can support your team.`,
    signOff: `Sincerely,\n${name}`,
  }),
  accountant: (_title, company, recipient, name) => ({
    subject: `Application for Accountant / Finance Specialist Position`,
    salutation: `Dear ${recipient || 'Hiring Manager'},`,
    body: `I am writing to apply for the Accountant position at "${company}". I have solid experience in financial reporting, budgeting, reconciliations, and ensuring compliance with accounting standards.\n\nI am proficient in accounting software and Excel, with a strong attention to detail and a track record of identifying cost-saving opportunities.\n\nThank you for reviewing my application. I look forward to the possibility of contributing to your finance team.`,
    signOff: `Best regards,\n${name}`,
  }),
  support: (_title, company, recipient, name) => ({
    subject: `Application for Customer Support Specialist Position`,
    salutation: `Dear ${recipient || 'Hiring Manager'},`,
    body: `I am interested in the Customer Support Specialist position at "${company}". I have experience resolving customer inquiries across phone, email, and chat channels while maintaining high satisfaction scores.\n\nI am patient, detail-oriented, and skilled at de-escalating difficult situations while finding practical solutions for customers.\n\nThank you for considering my application. I would be glad to bring my customer-first approach to your support team.`,
    signOff: `Sincerely,\n${name}`,
  }),
  teacher: (_title, company, recipient, name) => ({
    subject: `Application for Teaching Position`,
    salutation: `Dear ${recipient || 'Hiring Committee'},`,
    body: `I am writing to apply for the teaching position at "${company}". I am passionate about creating engaging lesson plans, supporting diverse learning styles, and fostering a positive classroom environment.\n\nI have experience using both traditional and digital teaching tools to track student progress and adapt instruction to individual needs.\n\nThank you for considering my application. I would welcome the opportunity to contribute to your students' growth.`,
    signOff: `Warm regards,\n${name}`,
  }),
  data_analyst: (_title, company, recipient, name) => ({
    subject: `Application for Data Analyst Position`,
    salutation: `Dear ${recipient || 'Hiring Manager'},`,
    body: `I am excited to apply for the Data Analyst position at "${company}". I have experience cleaning, analyzing, and visualizing large datasets to uncover actionable business insights.\n\nI am proficient in SQL, Python, and BI tools such as Power BI or Tableau, and I enjoy translating complex data into clear recommendations for stakeholders.\n\nThank you for your time and consideration. I look forward to discussing how my analytical skills can support your team.`,
    signOff: `Best regards,\n${name}`,
  }),
  admin: (_title, company, recipient, name) => ({
    subject: `Application for Administrative Assistant Position`,
    salutation: `Dear ${recipient || 'Hiring Manager'},`,
    body: `I am writing to apply for the Administrative Assistant position at "${company}". I have experience managing schedules, correspondence, and office operations to keep teams running smoothly.\n\nI am highly organized, proficient in office software, and skilled at handling multiple priorities while maintaining attention to detail.\n\nThank you for considering my application. I would be glad to bring my organizational skills to your office.`,
    signOff: `Sincerely,\n${name}`,
  }),
  nurse: (_title, company, recipient, name) => ({
    subject: `Application for Nursing Position`,
    salutation: `Dear ${recipient || 'Hiring Manager'},`,
    body: `I am writing to apply for the nursing position at "${company}". I am a compassionate and detail-oriented healthcare professional with experience providing patient care, administering treatments, and collaborating with medical teams.\n\nI am committed to patient safety, clear communication with families, and maintaining accurate medical records.\n\nThank you for considering my application. I look forward to the opportunity to contribute to your care team.`,
    signOff: `Warm regards,\n${name}`,
  }),
}

const PREVIEW_WIDTH = 700
const PREVIEW_HEIGHT = Math.round(PREVIEW_WIDTH * 1.414)

function loadInitial(): CoverLetterData {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return { ...defaultLetter, ...JSON.parse(saved) }
    } catch (e) {
      console.error('Error parsing cover letter data', e)
    }
  }
  return { ...defaultLetter }
}

function nextFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
}

export default function CoverLetterPage() {
  const [formData, setFormData] = useState<CoverLetterData>(loadInitial)
  const [activeTemplate, setActiveTemplate] = useState('modern')
  const [showDonateDialog, setShowDonateDialog] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [selectedRole, setSelectedRole] = useState<RoleKey>('developer')
  const [showPreviewMobile, setShowPreviewMobile] = useState(false)
  const [isCompactLayout, setIsCompactLayout] = useState(() => window.innerWidth < 1024)
  const [previewScale, setPreviewScale] = useState(1)

  const previewWrapRef = useRef<HTMLDivElement | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)

  const updatePreviewScale = useCallback(() => {
    const w = previewWrapRef.current?.clientWidth
    if (w) setPreviewScale(w / PREVIEW_WIDTH)
  }, [])

  useEffect(() => {
    const onResize = () => {
      setIsCompactLayout(window.innerWidth < 1024)
      updatePreviewScale()
    }
    window.addEventListener('resize', onResize)
    updatePreviewScale()
    const ro = new ResizeObserver(() => updatePreviewScale())
    if (previewWrapRef.current) ro.observe(previewWrapRef.current)
    return () => {
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [updatePreviewScale])

  useEffect(() => {
    if (showPreviewMobile) {
      requestAnimationFrame(() => updatePreviewScale())
    }
  }, [showPreviewMobile, updatePreviewScale])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all data?')) {
      setFormData({ ...defaultLetter, date: getLocalizedDate() })
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const updateField = <K extends keyof CoverLetterData>(field: K, value: CoverLetterData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateLetter = () => {
    const name = formData.senderName || 'John Smith'
    const title = formData.senderTitle || roleLabels[selectedRole]
    const company = formData.companyName || '...'
    const tpl = roleTemplates[selectedRole](title, company, formData.recipientName, name)
    setFormData((prev) => ({
      ...prev,
      subject: tpl.subject,
      salutation: tpl.salutation,
      bodyText: tpl.body,
      signOff: tpl.signOff,
    }))
  }

  const downloadPDF = async () => {
    const savedScale = previewScale
    const wasPreviewOpen = showPreviewMobile
    try {
      setIsExporting(true)

      if (isCompactLayout && !wasPreviewOpen) {
        flushSync(() => setShowPreviewMobile(true))
      }

      const html2Canvas = (await import('html2canvas-pro')).default
      const { jsPDF } = await import('jspdf')

      const element = previewRef.current
      if (!element) return

      flushSync(() => setPreviewScale(1))
      await nextFrame()
      await nextFrame()

      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready
      }

      const canvas = await captureElementAsCanvas(element, html2Canvas, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      const name = formData.senderName ? formData.senderName.replace(/\s+/g, '_') : 'Letter'
      pdf.save(`${name}_Cover_Letter.pdf`)
    } catch (err) {
      console.error(err)
      alert('An error occurred while generating the PDF')
    } finally {
      if (isCompactLayout && !wasPreviewOpen) {
        setShowPreviewMobile(false)
      }
      setPreviewScale(savedScale)
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Top Action Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-slate-100">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Cover Letter Builder
            </h1>
            <p className="text-slate-500 mt-1">Write professional cover letters for employers</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={clearAll}
              className="px-4 py-2.5 bg-red-50 text-red-700 font-semibold rounded-xl hover:bg-red-100 transition flex items-center gap-2 text-sm shadow-sm"
            >
              <DeleteOutlinedIcon sx={{ fontSize: 18 }} />
              Clear
            </button>
            <button
              onClick={() => setShowDonateDialog(true)}
              disabled={isExporting}
              className="px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 disabled:bg-indigo-400 transition flex items-center gap-2 text-sm shadow-md"
            >
              {isExporting ? (
                <AutorenewIcon className="animate-spin" sx={{ fontSize: 18 }} />
              ) : (
                <DownloadIcon sx={{ fontSize: 18 }} />
              )}
              Download PDF
            </button>
          </div>
        </div>

        {/* Main Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Form Editor */}
          <div className="space-y-6">
            {/* Template Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
                Choose Template
              </h3>

              {isCompactLayout ? (
                <TemplatePickerCarousel
                  value={activeTemplate}
                  onChange={setActiveTemplate}
                  templates={coverLetterTemplates}
                  className="mb-2"
                  renderThumb={(id) => (
                    <CoverLetterTemplateRender template={id} data={formData} />
                  )}
                />
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {coverLetterTemplates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => setActiveTemplate(tpl.id)}
                      className={
                        'px-2 py-3 border-2 rounded-xl text-center text-xs sm:text-sm transition ' +
                        (activeTemplate === tpl.id
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50')
                      }
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Automated Text Generator */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
                Auto Text Generator (Sample)
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Choose your field and quickly insert sample professional text:
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as RoleKey)}
                  className="w-full sm:flex-1 sm:min-w-0 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-slate-700"
                >
                  {(Object.keys(roleLabels) as RoleKey[]).map((key) => (
                    <option key={key} value={key}>
                      {roleLabels[key]}
                    </option>
                  ))}
                </select>
                <button
                  onClick={generateLetter}
                  className="w-full sm:w-auto justify-center px-4 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 text-sm transition flex items-center gap-1.5 shadow-md"
                >
                  <NoteAddOutlinedIcon sx={{ fontSize: 18 }} />
                  Generate
                </button>
              </div>
            </div>

            {/* Sender Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
                Sender (You)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    value={formData.senderName}
                    onChange={(e) => updateField('senderName', e.target.value)}
                    type="text"
                    placeholder="First Last"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Job Title
                  </label>
                  <input
                    value={formData.senderTitle}
                    onChange={(e) => updateField('senderTitle', e.target.value)}
                    type="text"
                    placeholder="e.g. Senior Vue Developer"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    value={formData.senderEmail}
                    onChange={(e) => updateField('senderEmail', e.target.value)}
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Phone
                  </label>
                  <input
                    value={formData.senderPhone}
                    onChange={(e) => updateField('senderPhone', e.target.value)}
                    type="text"
                    placeholder="+1 555 123 4567"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Address
                  </label>
                  <input
                    value={formData.senderAddress}
                    onChange={(e) => updateField('senderAddress', e.target.value)}
                    type="text"
                    placeholder="New York, USA"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Portfolio / Website
                  </label>
                  <input
                    value={formData.senderWebsite}
                    onChange={(e) => updateField('senderWebsite', e.target.value)}
                    type="text"
                    placeholder="github.com/username"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Recipient & Subject Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
                Recipient (Company)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Date
                  </label>
                  <input
                    value={formData.date}
                    onChange={(e) => updateField('date', e.target.value)}
                    type="text"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Hiring Manager Name
                  </label>
                  <input
                    value={formData.recipientName}
                    onChange={(e) => updateField('recipientName', e.target.value)}
                    type="text"
                    placeholder="e.g. Jane Doe"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Recipient's Title
                  </label>
                  <input
                    value={formData.recipientTitle}
                    onChange={(e) => updateField('recipientTitle', e.target.value)}
                    type="text"
                    placeholder="e.g. CTO"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Company Name
                  </label>
                  <input
                    value={formData.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    type="text"
                    placeholder="Company Inc."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Company Address
                  </label>
                  <input
                    value={formData.companyAddress}
                    onChange={(e) => updateField('companyAddress', e.target.value)}
                    type="text"
                    placeholder="Company address"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Subject Line
                  </label>
                  <input
                    value={formData.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                    type="text"
                    placeholder="e.g. Application for Senior Frontend Developer"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Letter Contents */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
                Letter Text
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Salutation
                  </label>
                  <input
                    value={formData.salutation}
                    onChange={(e) => updateField('salutation', e.target.value)}
                    type="text"
                    placeholder="e.g. Dear Mr. Doe,"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Letter Body
                  </label>
                  <textarea
                    value={formData.bodyText}
                    onChange={(e) => updateField('bodyText', e.target.value)}
                    rows={10}
                    placeholder="Why you're applying, your achievements and goals..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Sign-off
                  </label>
                  <textarea
                    value={formData.signOff}
                    onChange={(e) => updateField('signOff', e.target.value)}
                    rows={2}
                    placeholder={'Sincerely,\nYour Name'}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 transition text-sm text-slate-800"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div
            className={
              'space-y-4 ' +
              (isCompactLayout
                ? showPreviewMobile
                  ? 'mobile-preview-overlay'
                  : 'hidden'
                : 'lg:sticky lg:top-8')
            }
          >
            {isCompactLayout && showPreviewMobile ? (
              <div className="preview-overlay-bar">
                <button type="button" className="back-btn" onClick={() => setShowPreviewMobile(false)}>
                  <ArrowBackIcon sx={{ fontSize: 20 }} />
                  <span>Back</span>
                </button>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-full font-semibold">
                  A4 Format (210mm)
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Live Cover Letter Preview
                </span>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-semibold">
                  A4 Format (210mm)
                </span>
              </div>
            )}

            <div ref={previewWrapRef} className="w-full" style={{ height: PREVIEW_HEIGHT * previewScale + 'px' }}>
              <div
                ref={previewRef}
                className="bg-white shadow-xl border border-slate-200 overflow-hidden text-slate-800"
                style={{
                  width: PREVIEW_WIDTH + 'px',
                  height: PREVIEW_HEIGHT + 'px',
                  transform: 'scale(' + previewScale + ')',
                  transformOrigin: 'top left',
                }}
              >
                <CoverLetterTemplateRender template={activeTemplate} data={formData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isCompactLayout && !showPreviewMobile && (
        <button
          type="button"
          className="mobile-preview-fab"
          onClick={() => setShowPreviewMobile(true)}
        >
          <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
          Preview
        </button>
      )}

      <DonateDialog
        open={showDonateDialog}
        onClose={() => setShowDonateDialog(false)}
        onConfirm={downloadPDF}
      />
    </div>
  )
}
