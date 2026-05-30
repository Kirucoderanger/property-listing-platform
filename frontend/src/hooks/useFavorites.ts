'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useAddFavorite() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: async (
      propertyId: string,
    ) => {

      const response =
        await api.post(
          `/favorites/${propertyId}`,
        );

      return response.data;
    },

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });

      localStorage.setItem(
        'favoritesUpdated',
        Date.now().toString(),
      );
    },
  });
}

export function useRemoveFavorite() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: async (
      propertyId: string,
    ) => {

      const response =
        await api.delete(
          `/favorites/${propertyId}`,
        );

      return response.data;
    },

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });

      localStorage.setItem(
        'favoritesUpdated',
        Date.now().toString(),
      );
    },
  });
}
