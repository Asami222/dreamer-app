import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { GotRewardUIModel } from 'src/types/data'

export const useDeleteGotReward = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/gotReward/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
    onMutate: async ( id ) => {
      await queryClient.cancelQueries({ queryKey: ['gotRewards'] })

      const previousGotRewards =
        queryClient.getQueryData<GotRewardUIModel[]>(['gotRewards'])

      if (previousGotRewards) {
        queryClient.setQueryData(
          ['gotRewards'],
          previousGotRewards.filter(r => r.id !== id)
        )
      }

      return { previousGotRewards }
    },

    onError: (_err, _id, context) => {
      if (context?.previousGotRewards) {
        queryClient.setQueryData(['gotRewards'], context.previousGotRewards)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['gotRewards'] })
    },
  })
}