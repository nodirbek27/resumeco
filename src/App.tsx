import { useMemo } from 'react'
import { StyledEngineProvider, ThemeProvider, CssBaseline } from '@mui/material'
import { SnackbarProvider } from 'notistack'
import { createAppTheme } from './theme/muiTheme'
import { useCommonStore } from './store/commonStore'
import AppRouter from './router'

export default function App() {
  const themeColor = useCommonStore((s) => s.themeColor)
  const theme = useMemo(() => createAppTheme(themeColor), [themeColor])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <AppRouter />
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
