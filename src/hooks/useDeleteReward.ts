import { UserData } from '@/services/getUserData/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { RewardUIModel } from 'src/types/data'

export const useDeleteReward = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/reward/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
    onMutate: async (id) => {
  await queryClient.cancelQueries({ queryKey: ['user-data'] })

  const previousUserData =
    queryClient.getQueryData<UserData>(['user-data'])

  if (previousUserData) {
    queryClient.setQueryData(['user-data'], {
      ...previousUserData,
      rewards: previousUserData.rewards.filter(
        (r: RewardUIModel) => r.id !== id
      ),
    })
  }

  return { previousUserData }
},

    onError: (_err, _id, context) => {
      if (context?.previousUserData) {
        queryClient.setQueryData(['user-data'], context.previousUserData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user-data'] })
    },
  })
}