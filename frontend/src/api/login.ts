import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { baseApiRequest } from './baseApiRequest'
import { UserLogin, UserReply, WorkerRegister } from '@/types/login'
import { saveAccessToken } from '@/utils/login'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const router = useRouter()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['login'],
    mutationFn: (data: UserLogin) =>
      baseApiRequest<UserReply>({
        url: '/login',
        method: 'POST',
        data,
      }),
    retry: false,
    onSuccess: (data: UserReply) => {
      saveAccessToken(data.token)
      client.invalidateQueries({ queryKey: ['checkAuth'] })
      router.push('/')
    },
  })
}

export const useRegister = () => {
  const router = useRouter()
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['register'],
    mutationFn: (data: WorkerRegister) =>
      baseApiRequest<UserReply>({
        url: '/register',
        method: 'POST',
        data,
      }),
    retry: false,
    onSuccess: (data: UserReply) => {
      saveAccessToken(data.token)
      client.invalidateQueries({ queryKey: ['checkAuth'] })
      router.push('/')
    },
  })
}

export const useCheckAuth = () => {
  return useQuery({
    queryKey: ['checkAuth'],
    queryFn: () =>
      baseApiRequest({
        url: '/check_auth',
      }),
    retry: false,
  })
}
