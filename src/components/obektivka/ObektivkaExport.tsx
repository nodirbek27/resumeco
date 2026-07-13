import { useState } from 'react'
import type { ObektivkaFormData } from '@/types/obektivka'
import DonateDialog from '@/components/DonateDialog'
import './ObektivkaExport.css'

interface Props {
  formData: ObektivkaFormData
  previewRef: HTMLDivElement | null
}

export default function ObektivkaExport({ formData, previewRef }: Props) {
  const [showDonateDialog, setShowDonateDialog] = useState(false)
  const [pendingAction, setPendingAction] = useState<'pdf' | 'word' | null>(null)

  const downloadPDF = async () => {
    try {
      const html2Canvas = (await import('html2canvas-pro')).default
      const { jsPDF } = await import('jspdf')

      if (!previewRef) {
        alert('Preview topilmadi')
        return
      }

      const pages = previewRef.querySelectorAll<HTMLElement>('.obektivka-pdf-page')

      if (pages.length === 0) {
        alert('Sahifalar topilmadi')
        return
      }

      const pdf = new jsPDF('p', 'mm', 'a4')
      let isFirstPage = true

      for (const el of Array.from(pages)) {
        const rect = el.getBoundingClientRect()
        const canvas = await html2Canvas(el, {
          scale: window.devicePixelRatio > 1 ? 1.5 : 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          backgroundColor: '#ffffff',
          scrollX: -rect.left,
          scrollY: -rect.top,
          windowWidth: el.scrollWidth,
          windowHeight: el.scrollHeight,
        })

        const imgData = canvas.toDataURL('image/png')
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width

        if (!isFirstPage) {
          pdf.addPage()
        }

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        isFirstPage = false
      }

      const fileName = `${formData.familiya}_${formData.ism}_Obektivka.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error('PDF generation error:', error)
      alert('PDF yaratishda xatolik yuz berdi')
    }
  }

  const downloadWord = async () => {
    const { generateObektivkaDocx } = await import('@/utils/generateObektivkaDocx')
    await generateObektivkaDocx(formData)
  }

  const requestPdf = () => {
    setPendingAction('pdf')
    setShowDonateDialog(true)
  }

  const requestWord = () => {
    setPendingAction('word')
    setShowDonateDialog(true)
  }

  const onConfirmDownload = () => {
    if (pendingAction === 'pdf') downloadPDF()
    else if (pendingAction === 'word') downloadWord()
    setPendingAction(null)
  }

  return (
    <div className="download-actions">
      <button onClick={requestPdf} type="button" className="btn btn-pdf">
        <svg className="icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8l-6-4m6 4l6-4" />
        </svg>
        <span>PDF yuklash</span>
      </button>

      <button onClick={requestWord} type="button" className="btn btn-word">
        <svg className="icon" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 19l9 2-9-18-9 18 9-2m0 0v-8m0 8l-6-4m6 4l6-4" />
        </svg>
        <span>Word yuklash</span>
      </button>

      <DonateDialog
        open={showDonateDialog}
        onClose={() => setShowDonateDialog(false)}
        onConfirm={onConfirmDownload}
      />
    </div>
  )
}
