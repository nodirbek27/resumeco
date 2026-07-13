import { Drawer, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined'
import ContactMailOutlinedIcon from '@mui/icons-material/ContactMailOutlined'
import { navMenus } from '@/router/routes'
import { THEME_COLORS } from '@/theme/themeColors'
import ThemeColorSwatches from './ThemeColorSwatches'

const menuIconMap: Record<string, typeof BadgeOutlinedIcon> = {
  resume: BadgeOutlinedIcon,
  coverLetter: EditNoteOutlinedIcon,
  obektivka: ContactMailOutlinedIcon,
}

interface Props {
  open: boolean
  onClose: () => void
  themeColor: string
  onThemeColorChange: (color: string) => void
}

export default function MobileDrawer({ open, onClose, themeColor, onThemeColorChange }: Props) {
  const { t } = useTranslation()

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className="flex h-full w-65 flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 pt-4 pb-3">
          <div className="flex items-center gap-2 text-base font-extrabold text-slate-800">
            <span className="flex size-7.5 items-center justify-center rounded-lg bg-(--brand-primary) text-[15px] font-black text-white">
              R
            </span>
            ResumeIO
          </div>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>

        <nav className="flex flex-col gap-1 px-2.5 py-3">
          {navMenus.map((menu) => {
            const Icon = menuIconMap[menu.name]
            return (
              <NavLink
                key={menu.name}
                to={`/${menu.path}`}
                end
                onClick={onClose}
                className={({ isActive }) =>
                  'flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-colors ' +
                  (isActive
                    ? 'bg-(--brand-primary)/10 font-semibold text-(--brand-primary)'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800')
                }
              >
                <Icon sx={{ fontSize: 20 }} />
                {t(menu.meta.titleKey)}
              </NavLink>
            )
          })}
        </nav>

        <div className="mx-4 my-1 h-px bg-slate-100" />

        <div className="px-4 py-3">
          <p className="mb-2.5 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
            {t('layout.color_theme')}
          </p>
          <ThemeColorSwatches
            colors={THEME_COLORS}
            active={themeColor}
            onSelect={onThemeColorChange}
            className="flex flex-wrap gap-2.5"
          />
        </div>

      </div>
    </Drawer>
  )
}
