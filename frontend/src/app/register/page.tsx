'use client'
import { useRegister } from '@/api/login'
import Input from '@/components/Input/Input'
import { UserType } from '@/types/user'
import { Box, Typography, Stack, Button } from '@mui/joy'
import React, { useReducer, useState } from 'react'

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.EmailChange:
      return { ...state, email: action.payload }
    case ActionType.PasswordChange:
      return { ...state, password: action.payload }
    case ActionType.NameChange:
      return { ...state, name: action.payload }
    case ActionType.JobChange:
      return { ...state, job: action.payload }
    case ActionType.ExperienceChange:
      return { ...state, experience: action.payload }
    case ActionType.DescriptionChange:
      return { ...state, description: action.payload }
  }
}

type State = {
  name: string
  job: string
  experience: string
  description: string
  email: string
  password: string
}

type Action = {
  type: ActionType
  payload: string
}

enum ActionType {
  NameChange,
  EmailChange,
  JobChange,
  ExperienceChange,
  DescriptionChange,
  PasswordChange,
}

const initialValue: State = {
  name: '',
  job: '',
  experience: '',
  description: '',
  email: '',
  password: '',
}

const RegisterPage = () => {
  const [state, dispatch] = useReducer(reducer, initialValue)
  const [workerType, setWorkerType] = useState<UserType>(UserType.Worker)
  const { mutate: registerRequest } = useRegister()

  const onRegister = () => {
    if (
      !state.email ||
      !state.password ||
      !state.name ||
      (!state.job && workerType === UserType.Worker) ||
      (!state.experience && workerType === UserType.Worker) ||
      (!state.description && workerType === UserType.Worker)
    )
      return
    registerRequest({ ...state, type: workerType })
  }

  const changeWorkerType = (type: UserType) => {
    setWorkerType(type)
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
        <Stack gap={'15px'}>
          <Typography level="h2">Регистрация</Typography>
          <Stack direction={'row'} gap={'10px'}>
            <Button
              fullWidth
              variant={workerType === UserType.Worker ? 'solid' : 'outlined'}
              onClick={() => changeWorkerType(UserType.Worker)}
            >
              Работник
            </Button>
            <Button
              fullWidth
              variant={workerType === UserType.Client ? 'solid' : 'outlined'}
              onClick={() => changeWorkerType(UserType.Client)}
            >
              Клиент
            </Button>
          </Stack>
          <Input
            label="ФИО"
            value={state.name}
            placeholder="Введите ваши данные"
            onChange={(s: string) =>
              dispatch({ type: ActionType.NameChange, payload: s })
            }
          />
          {workerType === UserType.Worker && (
            <>
              <Input
                label="Должность"
                value={state.job}
                placeholder="Например: сантехник"
                onChange={(s: string) =>
                  dispatch({ type: ActionType.JobChange, payload: s })
                }
              />
              <Input
                label="Описание"
                value={state.description}
                placeholder="Например: могу заменить смеситель  "
                onChange={(s: string) =>
                  dispatch({ type: ActionType.DescriptionChange, payload: s })
                }
              />
              <Input
                label="Стаж работы"
                value={state.experience}
                placeholder="Например: 5 лет"
                onChange={(s: string) =>
                  dispatch({ type: ActionType.ExperienceChange, payload: s })
                }
              />
            </>
          )}
          <Input
            label="Email"
            value={state.email}
            type={'email'}
            placeholder="Введите ваш email"
            onChange={(s: string) =>
              dispatch({ type: ActionType.EmailChange, payload: s })
            }
          />
          <Input
            label="Пароль"
            value={state.password}
            type={'password'}
            placeholder="Введите пароль"
            onChange={(s: string) =>
              dispatch({ type: ActionType.PasswordChange, payload: s })
            }
          />
          <Button fullWidth onClick={() => onRegister()}>
            Зарегистрироваться
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default RegisterPage
