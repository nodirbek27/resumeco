import { useState } from 'react'
import { Dialog, IconButton, Button, Divider } from '@mui/material'
import './DonateDialog.css'
import CloseIcon from '@mui/icons-material/Close'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import DownloadIcon from '@mui/icons-material/Download'
import { useSnackbar } from 'notistack'

interface Props {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const CARD_NUMBER = '4231 2000 8021 2037'

export default function DonateDialog({ open, onClose, onConfirm }: Props) {
  const [copied, setCopied] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const copyCard = async () => {
    try {
      await navigator.clipboard.writeText(CARD_NUMBER.replace(/\s/g, ''))
      setCopied(true)
      enqueueSnackbar('Card number copied', { variant: 'success' })
      setTimeout(() => setCopied(false), 1500)
    } catch {
      enqueueSnackbar('Could not copy', { variant: 'error' })
    }
  }

  const proceedDownload = () => {
    onConfirm()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} slotProps={{ paper: { className: 'donate-card' } }}>
      <IconButton size="small" className="close-btn" onClick={onClose}>
        <CloseIcon fontSize="small" />
      </IconButton>

      <div className="donate-header">
        <div className="donate-icon">
          <FavoriteIcon sx={{ fontSize: 22, color: 'white' }} />
        </div>
        <h3 className="donate-title">Enjoying ResumeIO?</h3>
        <p className="donate-sub">
          This tool is free. If it helped you, consider supporting its development.
        </p>
      </div>

      <div className="card-visual">
        <div className="card-visual-top">
          <CreditCardIcon sx={{ fontSize: 20 }} />
          <span className="card-brand">VISA</span>
        </div>
        <p className="card-number">{CARD_NUMBER}</p>
      </div>

      <Button
        variant="outlined"
        color={copied ? 'success' : 'primary'}
        fullWidth
        className="copy-btn"
        startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
        onClick={copyCard}
        sx={{ borderRadius: 999, textTransform: 'none', fontWeight: 600, fontSize: 13 }}
      >
        {copied ? 'Copied!' : 'Copy card number'}
      </Button>

      <Divider sx={{ my: 2 }} />

      <Button
        variant="contained"
        fullWidth
        className="download-btn"
        startIcon={<DownloadIcon />}
        onClick={proceedDownload}
        sx={{ borderRadius: 999, textTransform: 'none', fontWeight: 700, fontSize: 14, py: 1.25 }}
      >
        Download
      </Button>
    </Dialog>
  )
}
