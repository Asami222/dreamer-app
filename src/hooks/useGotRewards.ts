import { useQuery } from '@tanstack/react-query'
import { useRouter } from "next/navigation"
import { GotRewardUIModel } from "src/types/data";

export const useGotRewards = () => {
  const router = useRouter();
  return useQuery<GotRewardUIModel[]>({
    queryKey: ['gotRewards'],
    queryFn: async (): Promise<GotRewardUIModel[]> => {
      const res = await fetch('/api/gotReward')
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