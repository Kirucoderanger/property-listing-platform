'use client';

import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function useFavoritesSync() {

  const queryClient =
    useQueryClient();

  useEffect(() => {

    const listener = (
      event: StorageEvent,
    ) => {

      if (
        event.key ===
        'favoritesUpdated'
      ) {

        queryClient.invalidateQueries({
          queryKey: ['favorites'],
        });
      }
    };

    window.addEventListener(
      'storage',
      listener,
    );

    return () =>
      window.removeEventListener(
        'storage',
        listener,
      );

  }, [queryClient]);
}
