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
    onMutate: async ( id ) => {
      await queryClient.cancelQueries({ queryKey: ['rewards'] })

      const previousRewards =
        queryClient.getQueryData<RewardUIModel[]>(['rewards'])

      if (previousRewards) {
        queryClient.setQueryData(
          ['rewards'],
          previousRewards.filter(r => r.id !== id)
        )
      }

      return { previousRewards }
    },

    onError: (_err, _id, context) => {
      if (context?.previousRewards) {
        queryClient.setQueryData(['rewards'], context.previousRewards)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['rewards'] })
    },
  })
}