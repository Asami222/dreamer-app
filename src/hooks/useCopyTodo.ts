import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { TodoUIModel } from 'src/types/data'

export const useCopyTodo = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/todo/${id}/copy`, { method: 'POST' })
      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
    // Optimistic Update
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] })

      const previousTodos =
        queryClient.getQueryData<TodoUIModel[]>(['todos'])

      if (previousTodos) {
        const target = previousTodos.find(t => t.id === id)

        if (target) {
          const optimisticTodo = {
            ...target,
            id: `temp-${Date.now()}`, // 仮ID
          }

          queryClient.setQueryData(
            ['todos'],
            [...previousTodos, optimisticTodo]
          )
        }
      }

      return { previousTodos }
    },
    // 失敗時ロールバック
    onError: (_err, _id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos)
      }
    },
    // 成功後は正規データ取得
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })
}