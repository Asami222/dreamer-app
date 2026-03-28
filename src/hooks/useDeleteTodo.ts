import { UserData } from '@/services/getUserData/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { TodoUIModel } from 'src/types/data'


export const useDeleteTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      isChecked,
    }: {
      id: string
      isChecked?: boolean
    }) => {
      const res = await fetch(`/api/todo/${id}/delete`, {
        method: 'DELETE',
        body: JSON.stringify({ isChecked }),
      })

      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
    onMutate: async ({ id, isChecked }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })
      await queryClient.cancelQueries({ queryKey: ['user-data'] })

      const previousTodos =
        queryClient.getQueryData<TodoUIModel[]>(['todos'])

      const previousUserData =
        queryClient.getQueryData<UserData>(['user-data'])

      const targetTodo = previousTodos?.find(t => t.id === id)

      if (previousTodos) {
        queryClient.setQueryData(
          ['todos'],
          previousTodos.filter(t => t.id !== id)
        )
      }

      if (previousUserData && isChecked) {
        const addStars = targetTodo?.star ?? 0

        queryClient.setQueryData<UserData>(['user-data'], {
          ...previousUserData,
          profile: {
            ...previousUserData.profile,
            stars: (previousUserData.profile.stars ?? 0) + addStars,
          },
        })
      }

      return { previousTodos, previousUserData }
    },

    onError: (_err, _vars, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
      if (context?.previousUserData) {
        queryClient.setQueryData(['user-data'], context.previousUserData)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.invalidateQueries({ queryKey: ['user-data'] })
    },
  })
}