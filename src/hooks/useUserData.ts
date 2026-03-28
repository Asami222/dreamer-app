import { useQuery } from '@tanstack/react-query'
import { fetchUserData } from '@/libs/fetchUserData';
//import type { UserData } from '@/services/getUserData/core';

export const useUserData = () => {
  return useQuery({
    queryKey: ['user-data'],
    queryFn: () => fetchUserData('/api/user-data'),
    staleTime: 5 * 60 * 1000,
  })
}