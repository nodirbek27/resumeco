import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useCommonStore } from '@/store/commonStore'
import { hexToRgbString } from '@/utils/colorTint'
import Header from './Header'
import MobileDrawer from './MobileDrawer'
import Footer from './Footer'

export default function MainLayout() {
  const { themeColor, setThemeColor } = useCommonStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    document.body.style.setProperty('--brand-primary', themeColor)
    document.body.style.setProperty('--brand-primary-rgb', hexToRgbString(themeColor))
  }, [themeColor])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 0)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header
        isScrolled={isScrolled}
        themeColor={themeColor}
        onThemeColorChange={setThemeColor}
        onOpenDrawer={() => setDrawerOpen(true)}
      />

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        themeColor={themeColor}
        onThemeColorChange={setThemeColor}
      />

      <main className="flex-1 p-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}
