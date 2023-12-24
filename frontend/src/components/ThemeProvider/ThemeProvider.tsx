import { theme } from '@/theme/theme'
import { CssVarsProvider } from '@mui/joy'
import { FC } from 'react'

const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <CssVarsProvider theme={theme}>{children}</CssVarsProvider>
}

export default ThemeProvider
