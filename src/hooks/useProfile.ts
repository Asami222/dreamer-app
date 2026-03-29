import { useQuery } from '@tanstack/react-query'

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await fetch('/api/profile')
      if (!res.ok) {
        throw new Error('Failed to fetch profile')
      }
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
  })
}