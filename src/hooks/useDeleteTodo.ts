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
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos =
        queryClient.getQueryData<TodoUIModel[]>(['todos'])

      if (previousTodos) {
        queryClient.setQueryData(
          ['todos'],
          previousTodos.filter(t => t.id !== id)
        )
      }

      return { previousTodos }
    },

    onError: (_err, _vars, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
  })
}