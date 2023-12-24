import { Box, Stack, Typography } from '@mui/joy'
import React, { FC } from 'react'
import { Input as JoyInput } from '@mui/joy'

type InputProps = {
  label: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  type?: string
}

const Input: FC<InputProps> = ({
  label,
  placeholder,
  onChange,
  value,
  type = 'text',
}) => {
  return (
    <Box>
      <Stack gap="5px">
        <Typography level="body-sm">{label}</Typography>
        <JoyInput
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      </Stack>
    </Box>
  )
}

export default Input
