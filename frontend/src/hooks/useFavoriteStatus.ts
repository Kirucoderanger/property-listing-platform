'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useFavoriteStatus(
  propertyId: string,
) {

  return useQuery({

    queryKey: [
      'favorite-status',
      propertyId,
    ],

    queryFn: async () => {

      const response =
        await api.get(
          '/favorites',
        );

      const favorites =
        response.data;

      return favorites.some(
        (favorite: any) =>
          favorite.propertyId ===
          propertyId,
      );
    },
  });
}
