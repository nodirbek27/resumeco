import { useEffect, useRef, useState, useCallback } from 'react'
import { flushSync } from 'react-dom'
import BoltIcon from '@mui/icons-material/Bolt'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import DownloadIcon from '@mui/icons-material/Download'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DonateDialog from '@/components/DonateDialog'
import TemplatePickerCarousel from '@/components/TemplatePickerCarousel'
import ResumeTemplateRender from '@/components/resume/ResumeTemplateRender'
import type { ResumeData, Experience, Education } from '@/types/resume'
import './ResumePage.css'

const resumeTemplates = [
  { id: 'modern', label: 'Modern Minimalist' },
  { id: 'classic', label: 'Classic Professional' },
  { id: 'creative', label: 'Creative Accent' },
  { id: 'minimal', label: 'Minimal Lines' },
  { id: 'sidebar-right', label: 'Sidebar Right' },
  { id: 'timeline', label: 'Elegant Timeline' },
  { id: 'bold-header', label: 'Bold Header' },
  { id: 'executive-photo', label: 'Executive Photo' },
  { id: 'professional-icons', label: 'Professional Icons' },
]

const accentSwatches = [
  '#4f46e5',
  '#2563eb',
  '#0d9488',
  '#16a34a',
  '#d97706',
  '#dc2626',
  '#db2777',
  '#475569',
]

const STORAGE_KEY = 'resume_builder_data'

const defaultResume: ResumeData = {
  fullname: '',
  title: '',
  photo: null,
  email: '',
  phone: '',
  address: '',
  website: '',
  summary: '',
  skills: '',
  languages: '',
  experience: [],
  education: [],
  accentColor: '#4f46e5',
}

const demoResume: ResumeData = {
  fullname: 'John Smith',
  title: 'Senior Frontend Developer',
  photo: null,
  email: 'john.smith@email.com',
  phone: '+1 555 123 4567',
  address: 'New York, NY',
  website: 'johnsmith.dev',
  summary:
    'Senior Frontend Developer with 5+ years of experience. Specialist in Vue.js, React, TypeScript and modern web technologies. Focused on building high-quality, fast interfaces.',
  skills:
    'JavaScript, TypeScript, Vue 3, React, Pinia, Tailwind CSS, Quasar, Webpack, Vite, Git, REST API',
  languages: 'English (native), Spanish (fluent), French (intermediate)',
  experience: [
    {
      company: 'Digital Solutions LLC',
      position: 'Senior Frontend Developer',
      startDate: '2023-01',
      endDate: 'Present',
      description:
        'Developed and optimized a large-scale ERP system using Vue 3 and TypeScript. Reduced load time by 40% and built a design system from scratch.',
    },
    {
      company: 'Soft Innovation',
      position: 'Mid Web Developer',
      startDate: '2021-02',
      endDate: '2022-12',
      description:
        'Successfully delivered 10+ e-commerce sites and SaaS projects using React and Redux.',
    },
  ],
  education: [
    {
      school: 'State University of Technology',
      degree: 'Computer Engineering (Bachelor)',
      startDate: '2017',
      endDate: '2021',
      description: 'In-depth study of computer science and programming fundamentals.',
    },
  ],
  accentColor: '#4f46e5',
}

const PREVIEW_WIDTH = 700
const PREVIEW_HEIGHT = Math.round(PREVIEW_WIDTH * 1.414)

function loadInitial(): ResumeData {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return { ...defaultResume, ...JSON.parse(saved) }
    } catch (e) {
      console.error('Error parsing resume data', e)
    }
  }
  return { ...defaultResume }
}

function nextFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
}

export default function ResumePage() {
  const [formData, setFormData] = useState<ResumeData>(loadInitial)
  const [activeTemplate, setActiveTemplate] = useState('modern')
  const [showPreviewMobile, setShowPreviewMobile] = useState(false)
  const [showDonateDialog, setShowDonateDialog] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [isCompactLayout, setIsCompactLayout] = useState(() => window.innerWidth < 1024)
  const [previewScale, setPreviewScale] = useState(1)

  const previewWrapRef = useRef<HTMLDivElement | null>(null)
  const previewRef = useRef<HTMLDivElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

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

  const loadDemo = () => setFormData({ ...demoResume })

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all data?')) {
      setFormData({ ...defaultResume })
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const updateField = <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addExperience = () => {
    const item: Experience = { company: '', position: '', startDate: '', endDate: '', description: '' }
    setFormData((prev) => ({ ...prev, experience: [...prev.experience, item] }))
  }
  const removeExperience = (index: number) => {
    setFormData((prev) => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }))
  }
  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    setFormData((prev) => {
      const list = [...prev.experience]
      list[index] = { ...list[index], [field]: value }
      return { ...prev, experience: list }
    })
  }

  const addEducation = () => {
    const item: Education = { school: '', degree: '', startDate: '', endDate: '', description: '' }
    setFormData((prev) => ({ ...prev, education: [...prev.education, item] }))
  }
  const removeEducation = (index: number) => {
    setFormData((prev) => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }))
  }
  const updateEducation = (index: number, field: keyof Education, value: string) => {
    setFormData((prev) => {
      const list = [...prev.education]
      list[index] = { ...list[index], [field]: value }
      return { ...prev, education: list }
    })
  }

  const triggerPhotoUpload = () => fileInputRef.current?.click()
  const onPhotoSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('Photo size must be under 1MB')
        return
      }
      const reader = new FileReader()
      reader.onload = () => updateField('photo', reader.result as string)
      reader.readAsDataURL(file)
    }
  }
  const removePhoto = () => updateField('photo', null)

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

      const canvas = await html2Canvas(element, {
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
      const name = formData.fullname ? formData.fullname.replace(/\s+/g, '_') : 'Resume'
      pdf.save(`${name}_Resume.pdf`)
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
              Resume Builder
            </h1>
            <p className="text-slate-500 mt-1">
              Fill in professional templates and download your resume as PDF
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={loadDemo}
              className="px-4 py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-100 transition flex items-center gap-2 text-sm shadow-sm"
            >
              <BoltIcon sx={{ fontSize: 18 }} />
              Load Sample
            </button>
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
          {/* Left: Forms */}
          <div className="space-y-6">
            {/* Template Selection Card */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
                Choose Template
              </h3>

              {isCompactLayout ? (
                <TemplatePickerCarousel
                  value={activeTemplate}
                  onChange={setActiveTemplate}
                  templates={resumeTemplates}
                  className="mb-6"
                  renderThumb={(id) => <ResumeTemplateRender template={id} data={formData} />}
                />
              ) : (
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {resumeTemplates.map((tpl) => (
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

              {/* Accent Color Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Accent Color
                </label>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {accentSwatches.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => updateField('accentColor', color)}
                      className="w-8 h-8 rounded-full border-2 transition flex items-center justify-center"
                      style={{
                        background: color,
                        borderColor: formData.accentColor === color ? '#1e293b' : 'transparent',
                      }}
                    >
                      {formData.accentColor === color && (
                        <CheckIcon sx={{ fontSize: 16, color: 'white' }} />
                      )}
                    </button>
                  ))}
                  <input
                    value={formData.accentColor}
                    onChange={(e) => updateField('accentColor', e.target.value)}
                    type="color"
                    className="w-8 h-8 rounded-full border-2 border-slate-200 cursor-pointer bg-transparent p-0"
                    title="Custom color"
                  />
                </div>
              </div>
            </div>

            {/* General Information */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 flex items-center gap-4 border-b border-slate-100 pb-4">
                  <div
                    onClick={triggerPhotoUpload}
                    className="w-20 h-20 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/20 transition overflow-hidden relative group"
                  >
                    {formData.photo ? (
                      <img src={formData.photo} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <div className="text-center text-slate-400">
                        <CameraAltOutlinedIcon sx={{ fontSize: 24 }} />
                        <span className="text-[10px] block mt-0.5">Photo 3x4</span>
                      </div>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={onPhotoSelected}
                    />
                  </div>
                  {formData.photo ? (
                    <div className="space-y-1">
                      <span className="text-sm font-semibold text-slate-700">
                        Profile photo uploaded
                      </span>
                      <button
                        onClick={removePhoto}
                        className="block text-xs font-semibold text-red-600 hover:text-red-700"
                      >
                        Remove photo
                      </button>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-500">
                      This photo will appear in the relevant spot on your resume (max: 1MB).
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <input
                    value={formData.fullname}
                    onChange={(e) => updateField('fullname', e.target.value)}
                    type="text"
                    placeholder="e.g. John Smith"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Job Title
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    type="text"
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Email
                  </label>
                  <input
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    type="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Phone Number
                  </label>
                  <input
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    type="text"
                    placeholder="+1 555 123 4567"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Address
                  </label>
                  <input
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    type="text"
                    placeholder="New York, USA"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Website / Portfolio
                  </label>
                  <input
                    value={formData.website}
                    onChange={(e) => updateField('website', e.target.value)}
                    type="text"
                    placeholder="github.com/profile"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Summary
                  </label>
                  <textarea
                    value={formData.summary}
                    onChange={(e) => updateField('summary', e.target.value)}
                    rows={3}
                    placeholder="A short overview of your background, experience and goals..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-slate-800"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Skills and Languages */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
                Skills & Languages
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Professional Skills (comma-separated)
                  </label>
                  <input
                    value={formData.skills}
                    onChange={(e) => updateField('skills', e.target.value)}
                    type="text"
                    placeholder="HTML, CSS, JavaScript, Vue"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Languages (comma-separated)
                  </label>
                  <input
                    value={formData.languages}
                    onChange={(e) => updateField('languages', e.target.value)}
                    type="text"
                    placeholder="English, Spanish, French"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition text-sm text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Experience Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
                  Work Experience
                </h3>
                <button
                  onClick={addExperience}
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-700 font-bold rounded-lg hover:bg-indigo-100 text-xs transition flex items-center gap-1"
                >
                  <AddIcon sx={{ fontSize: 14 }} /> Add
                </button>
              </div>

              {formData.experience.length === 0 && (
                <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-100 rounded-xl text-sm">
                  No work experience added
                </div>
              )}

              {formData.experience.map((exp, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-4 relative">
                  <button
                    onClick={() => removeExperience(index)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
                  >
                    <CloseIcon sx={{ fontSize: 18 }} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Company / Organization
                      </label>
                      <input
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                        type="text"
                        placeholder="e.g. Soft LLC"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Position
                      </label>
                      <input
                        value={exp.position}
                        onChange={(e) => updateExperience(index, 'position', e.target.value)}
                        type="text"
                        placeholder="e.g. Frontend Developer"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Start Date
                      </label>
                      <input
                        value={exp.startDate}
                        onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        type="text"
                        placeholder="e.g. 2021-06"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        End Date (or Present)
                      </label>
                      <input
                        value={exp.endDate}
                        onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                        type="text"
                        placeholder="e.g. Present"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Responsibilities & Achievements
                      </label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        rows={2}
                        placeholder="Project highlights, what you accomplished..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-6 bg-indigo-600 rounded-full inline-block"></span>
                  Education
                </h3>
                <button
                  onClick={addEducation}
                  className="px-3 py-1.5 bg-indigo-50 text-indigo-700 font-bold rounded-lg hover:bg-indigo-100 text-xs transition flex items-center gap-1"
                >
                  <AddIcon sx={{ fontSize: 14 }} /> Add
                </button>
              </div>

              {formData.education.length === 0 && (
                <div className="text-center py-6 text-slate-400 border-2 border-dashed border-slate-100 rounded-xl text-sm">
                  No education added
                </div>
              )}

              {formData.education.map((edu, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-xl border border-slate-100 mb-4 relative">
                  <button
                    onClick={() => removeEducation(index)}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition"
                  >
                    <CloseIcon sx={{ fontSize: 18 }} />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        School / University
                      </label>
                      <input
                        value={edu.school}
                        onChange={(e) => updateEducation(index, 'school', e.target.value)}
                        type="text"
                        placeholder="e.g. MIT"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Degree
                      </label>
                      <input
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        type="text"
                        placeholder="e.g. Software Engineering (BSc)"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Start Year
                      </label>
                      <input
                        value={edu.startDate}
                        onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                        type="text"
                        placeholder="e.g. 2017"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        End Year (or In Progress)
                      </label>
                      <input
                        value={edu.endDate}
                        onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                        type="text"
                        placeholder="e.g. 2021"
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        Additional Info (Optional)
                      </label>
                      <textarea
                        value={edu.description}
                        onChange={(e) => updateEducation(index, 'description', e.target.value)}
                        rows={2}
                        placeholder="Coursework, certificates..."
                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-indigo-500"
                      ></textarea>
                    </div>
                  </div>
                </div>
              ))}
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
                  Live Resume Preview
                </span>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-semibold">
                  A4 Format (210mm)
                </span>
              </div>
            )}

            <div ref={previewWrapRef} className="w-full" style={{ height: PREVIEW_HEIGHT * previewScale + 'px' }}>
              <div
                ref={previewRef}
                className="bg-white shadow-xl border border-slate-200 overflow-hidden"
                style={{
                  width: PREVIEW_WIDTH + 'px',
                  height: PREVIEW_HEIGHT + 'px',
                  transform: 'scale(' + previewScale + ')',
                  transformOrigin: 'top left',
                }}
              >
                <ResumeTemplateRender template={activeTemplate} data={formData} />
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
