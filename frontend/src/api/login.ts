import { useMutation, useQueryClient } from '@tanstack/react-query'
import { baseApiRequest } from './baseApiRequest'
import { UserLogin } from '@/types/login'

export const useLogin = () => {
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: UserLogin) =>
      baseApiRequest({
        url: '/login',
        method: 'POST',
        data,
      }),
    retry: false,
    onSuccess: () => {},
  })
}

export const useRegister = () => {
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data: any) =>
      baseApiRequest({
        url: '/register',
        method: 'POST',
        data,
      }),
    retry: false,
    onSuccess: () => {},
  })
}

export const useCheckAuth = () => {
  return useMutation({
    mutationKey: ['checkAuth'],
    mutationFn: () =>
      baseApiRequest({
        url: '/check_auth',
        method: 'POST',
      }),
    retry: false,
  })
}
