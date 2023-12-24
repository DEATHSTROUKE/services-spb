'use client'
import { useChangeProfile, useProfile } from '@/api/user'
import Input from '@/components/Input/Input'
import MainLayout from '@/components/Layouts/MainLayout'
import Loading from '@/components/Loading/Loading'
import { useMe } from '@/hooks/useMe'
import { UserType } from '@/types/user'
import { clearAccessToken } from '@/utils/login'
import { Box, Button, Stack, Typography } from '@mui/joy'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useEffect, useReducer, useState } from 'react'

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.EmailChange:
      return { ...state, email: action.payload }
    case ActionType.SubwayChange:
      return { ...state, subway: action.payload }
    case ActionType.ImageChange:
      return { ...state, image: action.payload }
    case ActionType.NameChange:
      return { ...state, name: action.payload }
    case ActionType.JobChange:
      return { ...state, job: action.payload }
    case ActionType.ExperienceChange:
      return { ...state, experience: action.payload }
    case ActionType.DescriptionChange:
      return { ...state, description: action.payload }
    case 'SetNewState':
      if (action.payload instanceof Object) {
        return { ...action.payload }
      }
      return { ...state }
  }
}

type State = {
  name: string
  job: string
  experience: string
  description: string
  email: string
  image: string
  subway: string
}

type Action =
  | {
      type: ActionType
      payload: string
    }
  | {
      type: 'SetNewState'
      payload: State
    }

enum ActionType {
  NameChange,
  EmailChange,
  JobChange,
  ExperienceChange,
  DescriptionChange,
  ImageChange,
  SubwayChange,
}

const initialValue: State = {
  name: '',
  job: '',
  experience: '',
  description: '',
  email: '',
  image: '',
  subway: '',
}

const ProfilePage = () => {
  const [state, dispatch] = useReducer(reducer, initialValue)
  const router = useRouter()
  const [isChanged, setIsChanged] = useState(false)
  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useProfile()
  const { mutate: changeProfile } = useChangeProfile()
  const isAuth = useMe()

  useEffect(() => {
    if (!data) return
    const user = data.profile
    console.log(user)

    dispatch({
      type: 'SetNewState',
      payload: {
        name: user.name,
        email: user.email,
        description: user.description,
        experience: user.experience,
        image: user.image || '',
        job: user.job,
        subway: user.subway || '',
      },
    })
  }, [data])

  useEffect(() => {
    if (!isAuth) {
      router.replace('/')
    }
  }, [isAuth])

  const onLogout = () => {
    router.replace('/')
    clearAccessToken()
    queryClient.invalidateQueries({ queryKey: ['checkAuth'] })
  }

  const onSave = () => {
    changeProfile({ ...state })
  }

  return (
    <MainLayout>
      <Box>
        {isLoading && <Loading />}
        {isError && <Box>{error.message}</Box>}
        {data && (
          <Stack gap="15px">
            <Typography level="h2">Личный кабинет</Typography>
            <Stack direction="row" gap="20px">
              <Box sx={{ maxWidth: '280px', maxHeight: '280px' }}>
                <img src={data.profile.image || ''} alt="Аватар" width="100%" />
              </Box>
              <Stack width="100%" gap="15px">
                <Input
                  label="ФИО"
                  value={state.name}
                  placeholder="Введите ваши данные"
                  onChange={(s: string) => {
                    setIsChanged(true)
                    dispatch({ type: ActionType.NameChange, payload: s })
                  }}
                />
                <Input
                  label="Email"
                  value={state.email}
                  type={'email'}
                  placeholder="Введите ваш email"
                  onChange={(s: string) => {
                    setIsChanged(true)
                    dispatch({ type: ActionType.EmailChange, payload: s })
                  }}
                />
                <Input
                  label="Ссылка на аватар"
                  value={state.image}
                  placeholder="Введите ссылку"
                  onChange={(s: string) => {
                    setIsChanged(true)
                    dispatch({ type: ActionType.ImageChange, payload: s })
                  }}
                />
                {data.profile.type === UserType.Worker && (
                  <Input
                    label="Должность"
                    value={state.job}
                    placeholder="Например: сантехник"
                    onChange={(s: string) => {
                      setIsChanged(true)
                      dispatch({ type: ActionType.JobChange, payload: s })
                    }}
                  />
                )}
                {data.profile.type === UserType.Worker && (
                  <Input
                    label="Описание"
                    value={state.description}
                    placeholder="Например: могу заменить смеситель  "
                    onChange={(s: string) => {
                      setIsChanged(true)
                      dispatch({
                        type: ActionType.DescriptionChange,
                        payload: s,
                      })
                    }}
                  />
                )}
                {data.profile.type === UserType.Worker && (
                  <Input
                    label="Стаж работы"
                    value={state.experience}
                    placeholder="Например: 5 лет"
                    onChange={(s: string) => {
                      setIsChanged(true)
                      dispatch({
                        type: ActionType.ExperienceChange,
                        payload: s,
                      })
                    }}
                  />
                )}
                {data.profile.type === UserType.Worker && (
                  <Input
                    label="Метро"
                    value={state.subway}
                    placeholder="Например: Беговая"
                    onChange={(s: string) => {
                      setIsChanged(true)
                      dispatch({
                        type: ActionType.SubwayChange,
                        payload: s,
                      })
                    }}
                  />
                )}
                <Stack direction={'row'} gap={'15px'}>
                  {isChanged && (
                    <Button onClick={() => onSave()}>Сохранить</Button>
                  )}
                  <Button color="danger" onClick={onLogout}>
                    Выйти
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Box>
    </MainLayout>
  )
}

export default ProfilePage
