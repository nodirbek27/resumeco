import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { navMenus } from '@/router/routes'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-275 flex-wrap items-center justify-between gap-4 px-5 py-5 max-[600px]:flex-col max-[600px]:justify-center max-[600px]:text-center">
        <div className="flex flex-col gap-1 max-[600px]:items-center">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[15px] font-extrabold text-slate-800 no-underline"
          >
            <span className="flex size-5.5 shrink-0 items-center justify-center rounded-md bg-(--brand-primary) text-[11px] font-black text-white">
              R
            </span>
            ResumeIO
          </Link>
          <p className="m-0 flex items-center gap-1 text-[11.5px] text-slate-400">
            <LockOutlinedIcon sx={{ fontSize: 13 }} />
            {t('layout.footer_tagline')}
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-1">
          {navMenus.map((menu) => (
            <NavLink
              key={menu.name}
              to={`/${menu.path}`}
              end
              className="rounded-md px-2.5 py-1.5 text-[13px] font-medium text-slate-500 no-underline transition-colors hover:bg-slate-100 hover:text-slate-800"
            >
              {t(menu.meta.titleKey)}
            </NavLink>
          ))}
        </nav>

        <p className="m-0 text-xs whitespace-nowrap text-slate-400">
          &copy; {new Date().getFullYear()} ResumeIO &middot; {t('layout.footer_free_forever')}
        </p>
      </div>
    </footer>
  )
}
