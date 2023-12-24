import { getAccessToken } from '@/utils/login'

export const useMe = () => {
  const token = getAccessToken()
  if (token) return true
  return false
}
