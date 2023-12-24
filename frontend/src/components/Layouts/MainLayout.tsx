import { Box } from '@mui/joy'
import React, { FC } from 'react'

const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      sx={{
        background: 'white',
        borderRadius: '15px',
      }}
    >
      <Box
        sx={{
          maxWidth: '980px',
          width: '100%',
          margin: '0 auto',
          padding: '30px',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default MainLayout
