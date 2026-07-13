import { createTheme } from '@mui/material/styles'

export function createAppTheme(primaryColor: string) {
  return createTheme({
    palette: {
      primary: { main: primaryColor },
    },
    typography: {
      fontFamily: "'BaseFont', 'Inter', sans-serif",
    },
    shape: {
      borderRadius: 10,
    },
  })
}
