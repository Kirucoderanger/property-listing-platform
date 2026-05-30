'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['profile'],

    queryFn: async () => {
      const response =
        await api.get('/auth/profile');

      return response.data;
    },

    retry: false,
  });
}
