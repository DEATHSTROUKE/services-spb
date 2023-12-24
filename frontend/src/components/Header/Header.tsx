import { useCheckAuth } from '@/api/login'
import ProfileIcon from '@/assets/icons/ProfileIcon'
import { Box, Button, Input, Sheet, Stack, Typography } from '@mui/joy'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const { isError } = useCheckAuth()

  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: 'auto',
        width: '100%',
        padding: '20px',
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Link href="/">
          <Typography level="h2">Услуги СПБ</Typography>
        </Link>
        {isError ? (
          <Stack direction="row" gap="15px">
            <Link href="/login">
              <Button>Войти</Button>
            </Link>
            <Link href="/register">
              <Button>Регистрация</Button>
            </Link>
          </Stack>
        ) : (
          <Box>
            <Stack direction="row" alignItems="center" gap="5px">
              <Input value={''} placeholder="Поиск..." />
              <Link href="/profile">
                <Stack>
                  <ProfileIcon />
                </Stack>
              </Link>
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  )
}

export default Header
