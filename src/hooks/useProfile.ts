import { useQuery } from '@tanstack/react-query'
import { useRouter } from "next/navigation"

export const useProfile = () => {
  const router = useRouter();
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const res = await fetch('/api/profile')
      if (!res.ok) {
        if (res.status === 401) {
        router.replace('/login')
        }
        throw new Error('Failed to fetch profile')
      }
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
  })
}