import { useQuery } from '@tanstack/react-query'
import { TodoUIModel } from "src/types/data";

export const useTodos = () => {
  return useQuery<TodoUIModel[]>({
    queryKey: ['todos'],
    queryFn: async (): Promise<TodoUIModel[]> => {
      const res = await fetch('/api/todo')
      if (!res.ok) throw new Error('Failed')
      return res.json()
    },
    staleTime: 5 * 60 * 1000,
  })
}