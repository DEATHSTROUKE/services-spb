import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { baseApiRequest } from './baseApiRequest'
import { FullWorker } from '@/types/worker'

export const useWorkers = () => {
  return useQuery({
    queryKey: ['getWorkers'],
    queryFn: () =>
      baseApiRequest<Worker[]>({
        url: '/workers',
      }),
    retry: false,
  })
}

export const useWorker = (id: string) => {
  return useQuery({
    queryKey: ['getWorker', id],
    queryFn: () =>
      baseApiRequest<FullWorker>({
        url: `/worker/${id}`,
      }),
    retry: false,
  })
}

export const useSendFeedback = () => {
  const client = useQueryClient()
  return useMutation({
    mutationKey: ['sendFeedback'],
    mutationFn: () =>
      baseApiRequest({ url: '/feedback', method: 'POST', data: {} }),
    retry: false,
    onSuccess: () => {},
  })
}
