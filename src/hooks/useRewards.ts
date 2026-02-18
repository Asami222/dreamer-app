import { useQuery } from '@tanstack/react-query'
import { useRouter } from "next/navigation"
import { RewardUIModel } from "src/types/data";

export const useRewards = () => {
  const router = useRouter();
  return useQuery<RewardUIModel[]>({
    queryKey: ['rewards'],
    queryFn: async (): Promise<RewardUIModel[]> => {
      const res = await fetch('/api/reward')
      if (!res.ok) {
        if (res.status === 401) {
        router.replace('/login')
      }
        throw new Error('Failed')
      }
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
  })
}