import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { baseApiRequest } from './baseApiRequest'
import { ChangeProfileData, FullWorker, Profile } from '@/types/worker'

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () =>
      baseApiRequest<Profile>({
        url: `/profile`,
      }),
    retry: false,
  })
}

export const useChangeProfile = () => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: ['changeProfile'],
    mutationFn: (data: ChangeProfileData) =>
      baseApiRequest({
        url: '/profile',
        method: 'POST',
        data,
      }),
    retry: false,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}
