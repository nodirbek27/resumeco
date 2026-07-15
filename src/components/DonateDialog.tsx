import { Dialog, IconButton, Button, Divider } from '@mui/material'
import './DonateDialog.css'
import CloseIcon from '@mui/icons-material/Close'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DownloadIcon from '@mui/icons-material/Download'
import LocalCafeIcon from '@mui/icons-material/LocalCafe'
import PaymentIcon from '@mui/icons-material/Payment'

interface Props {
    open: boolean
    onClose: () => void
    onConfirm: () => void
}

const BUY_ME_A_COFFEE_URL = 'https://buymeacoffee.com/nodirjon09a'
const CLICK_URL = 'https://my.click.uz/pay/HAVOLANGIZNI_SHU_YERGA_QOYING'
const PAYME_URL = 'https://payme.uz/HAVOLANGIZNI_SHU_YERGA_QOYING'

export default function DonateDialog({ open, onClose, onConfirm }: Props) {
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
        
              <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<LocalCafeIcon />}
                        component="a"
                        href={BUY_ME_A_COFFEE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ borderRadius: 999, textTransform: 'none', fontWeight: 600, fontSize: 13, mb: 1.5 }}
                      >
                      Buy Me a Coffee
              </Button>
        
              <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<PaymentIcon />}
                        component="a"
                        href={CLICK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ borderRadius: 999, textTransform: 'none', fontWeight: 600, fontSize: 13, mb: 1.5 }}
                      >
                      Click orqali qo'llab-quvvatlash
              </Button>
        
              <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<PaymentIcon />}
                        component="a"
                        href={PAYME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ borderRadius: 999, textTransform: 'none', fontWeight: 600, fontSize: 13 }}
                      >
                      Payme orqali qo'llab-quvvatlash
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
