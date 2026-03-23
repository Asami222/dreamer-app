import { fetchUserData } from '@/libs/fetchUserData';
import { useQuery } from '@tanstack/react-query'
import { TodoUIModel } from "src/types/data";

export const useTodos = (initialData?: TodoUIModel[]) => {
  return useQuery<TodoUIModel[]>({
    queryKey: ['todos'],
    queryFn: () => fetchUserData('/api/todo'),
    initialData: initialData ?? undefined,
    staleTime: 5 * 60 * 1000,
  })
}