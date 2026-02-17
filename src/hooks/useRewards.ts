import { useQuery } from '@tanstack/react-query'
import router from 'next/router';
import { RewardUIModel } from "src/types/data";

export const useRewards = () => {
  return useQuery<RewardUIModel[]>({
    queryKey: ['rewards'],
    queryFn: async (): Promise<RewardUIModel[]> => {
      const res = await fetch('/api/reward')
      if (res.status === 401) {
        router.replace('/login')
      }
      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
  })
}