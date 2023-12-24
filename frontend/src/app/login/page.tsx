'use client'
import { useLogin } from '@/api/login'
import Input from '@/components/Input/Input'
import { Box, Button, Stack, Typography } from '@mui/joy'
import React, { useReducer } from 'react'

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.EmailChange:
      return { ...state, email: action.payload }
    case ActionType.PasswordChange:
      return { ...state, password: action.payload }
  }
}

type State = {
  email: string
  password: string
}

type Action = {
  type: ActionType
  payload: string
}

enum ActionType {
  EmailChange,
  PasswordChange,
}

const initialValue: State = {
  email: '',
  password: '',
}

const LoginPage = () => {
  const [state, dispatch] = useReducer(reducer, initialValue)
  const { mutate: loginRequest } = useLogin()

  const onLogin = () => {
    if (!state.email || !state.password) return
    loginRequest(state)
  }

  return (
    <Box
      sx={{
        maxWidth: '780px',
        margin: 'auto',
        width: '100%',
        background: 'white',
        borderRadius: 15,
      }}
    >
      <Box sx={{ maxWidth: '580px', margin: '0 auto', padding: '39px 0' }}>
        <Typography level="h2">Вход</Typography>

        <Stack gap={'15px'}>
          <Input
            label="Email"
            type="email"
            value={state.email}
            placeholder="Введите ваши данные"
            onChange={(s: string) =>
              dispatch({ type: ActionType.EmailChange, payload: s })
            }
          />
          <Input
            label="Пароль"
            type="password"
            value={state.password}
            placeholder="Введите ваши данные"
            onChange={(s: string) =>
              dispatch({ type: ActionType.PasswordChange, payload: s })
            }
          />
          <Button onClick={() => onLogin()}>Войти</Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default LoginPage
