import { useQuery } from '@tanstack/react-query'
import router from 'next/router';
import { GotRewardUIModel } from "src/types/data";

export const useGotRewards = () => {
  return useQuery<GotRewardUIModel[]>({
    queryKey: ['gotRewards'],
    queryFn: async (): Promise<GotRewardUIModel[]> => {
      const res = await fetch('/api/gotReward')
      if (res.status === 401) {
        router.replace('/login')
      }
      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
  })
}