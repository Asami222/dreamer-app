import { fetchUserData } from '@/libs/fetchUserData';
import { useQuery } from '@tanstack/react-query'
import { GotRewardUIModel } from "src/types/data";


export const useGotRewards = (initialData?: GotRewardUIModel[]) => {
  return useQuery<GotRewardUIModel[]>({
    queryKey: ['gotRewards'],
    queryFn: () => fetchUserData('gotReward'),
    initialData: initialData ?? undefined,
    staleTime: 5 * 60 * 1000,
  })
}