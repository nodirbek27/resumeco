import { useEffect, useRef, useState, useCallback } from 'react'
import { Dialog, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ObektivkaForm from '@/components/obektivka/ObektivkaForm'
import ObektivkaPreview from '@/components/obektivka/ObektivkaPreview'
import ObektivkaExport from '@/components/obektivka/ObektivkaExport'
import type { ObektivkaFormData } from '@/types/obektivka'
import { obektivkaStorage } from '@/utils/obektivkaStorage'
import './ObektivkaPage.css'

const defaultFormData: ObektivkaFormData = {
  familiya: '',
  ism: '',
  sharif: '',
  rasm: null,
  joriyLavozimSanasi: '',
  joriyLavozimToliq: '',
  tugilganSana: '',
  tugilganJoyi: '',
  millati: '',
  malumoti: '',
  partiyaviyligi: '',
  tamomlagan: '',
  malumotiMutaxassisligi: '',
  ilmiyDarajasi: '',
  ilmiyUnvoni: '',
  harbiyUnvoni: '',
  qaysiChetTillarini: '',
  davlatMukofotlari: '',
  xalqDeputatlari: '',
  telefon: '',
  mehnatFaoliyatiRoyxat: [],
  qarindoshlar: [],
}

const A4_PX = (210 / 25.4) * 96
const A4_HEIGHT_PX = (297 / 25.4) * 96

export default function ObektivkaPage() {
  const [formData, setFormData] = useState<ObektivkaFormData>({ ...defaultFormData })
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024)
  const [mobileScale, setMobileScale] = useState(1)
  const previewRef = useRef<HTMLDivElement | null>(null)

  const updateScale = useCallback(() => {
    setIsMobile(window.innerWidth < 960)
    setMobileScale(Math.min(1, (window.innerWidth - 32) / A4_PX))
  }, [])

  useEffect(() => {
    const saved = obektivkaStorage.load()
    if (saved) setFormData(saved)
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [updateScale])

  useEffect(() => {
    obektivkaStorage.save(formData)
  }, [formData])

  const clearAllData = () => {
    if (confirm("Haqiqatan ham barcha ma'lumotlarni o'chirmoqchisiz?")) {
      setFormData({ ...defaultFormData, mehnatFaoliyatiRoyxat: [], qarindoshlar: [] })
      obektivkaStorage.clear()
    }
  }

  const mobileOuterStyle = {
    height: `${(A4_HEIGHT_PX * 2 + 24) * mobileScale}px`,
    position: 'relative' as const,
  }
  const mobileInnerStyle = {
    transform: `scale(${mobileScale})`,
    transformOrigin: 'top left',
    width: '210mm',
    position: 'absolute' as const,
  }

  return (
    <div className="obektivka-page-wrap">
      <div className="obektivka-container">
        <div className="obektivka-topbar">
          <div>
            <h1 className="obektivka-heading">Obyektivka (MA'LUMOTNOMA)</h1>
            <p className="obektivka-sub">Ma'lumotlarni to'ldiring va yuklab oling</p>
          </div>
          <div className="obektivka-actions">
            <ObektivkaExport formData={formData} previewRef={previewRef.current} />
            <button onClick={clearAllData} type="button" className="clear-btn">
              <DeleteOutlineIcon sx={{ fontSize: 18 }} />
              O'chirish
            </button>
          </div>
        </div>

        <div className="obektivka-grid">
          <div ref={previewRef} className="preview-col">
            <ObektivkaPreview value={formData} />
          </div>

          <div className="form-col">
            <ObektivkaForm value={formData} onChange={setFormData} />
          </div>
        </div>

        {isMobile && (
          <button
            type="button"
            className="mobile-preview-btn"
            onClick={() => setShowPreviewDialog(true)}
          >
            <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
            Ko'rish
          </button>
        )}
      </div>

      <Dialog fullScreen open={showPreviewDialog} onClose={() => setShowPreviewDialog(false)}>
        <div className="dialog-bar">
          <DescriptionOutlinedIcon sx={{ fontSize: 20 }} />
          <span style={{ marginLeft: 8 }}>Obektivka Preview</span>
          <div style={{ flex: 1 }} />
          <IconButton size="small" onClick={() => setShowPreviewDialog(false)}>
            <CloseIcon sx={{ color: 'white' }} fontSize="small" />
          </IconButton>
        </div>
        <div style={{ padding: 8, overflowY: 'auto', maxHeight: 'calc(100vh - 50px)' }}>
          <div style={mobileOuterStyle}>
            <div style={mobileInnerStyle}>
              <ObektivkaPreview value={formData} />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
