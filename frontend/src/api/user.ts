import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { baseApiRequest } from './baseApiRequest'

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: () =>
      baseApiRequest<Worker>({
        url: `/profile`,
      }),
    retry: false,
  })
}

export const useChangeProfile = () => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: ['changeProfile'],
    mutationFn: () =>
      baseApiRequest({
        url: '/profile',
        method: 'POST',
        data: {},
      }),
    retry: false,
    onSuccess: () => {},
  })
}
