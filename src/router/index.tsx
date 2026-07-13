import type { ReactNode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import ErrorPage from '@/layouts/ErrorPage'
import { routeDefs, type RouteMeta } from './routes'
import { useSeo } from '@/hooks/useSeo'

function MetaPage({ meta, children }: { meta: RouteMeta; children: ReactNode }) {
  useSeo(meta)
  return children
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routeDefs.map((r) => (
            <Route
              key={r.name}
              index={r.path === ''}
              path={r.path === '' ? undefined : r.path}
              element={<MetaPage meta={r.meta}>{r.element}</MetaPage>}
            />
          ))}
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}
