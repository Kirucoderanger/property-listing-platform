'use client';

import {
  useAddFavorite,
  useRemoveFavorite,
} from '@/hooks/useFavorites';

import {
  useFavoriteStatus,
} from '@/hooks/useFavoriteStatus';

export default function FavoriteButton({
  propertyId,
}: {
  propertyId: string;
}) {

  const {
    data: isFavorite = false,
    refetch,
  } = useFavoriteStatus(
    propertyId,
  );

  const addFavorite =
    useAddFavorite();

  const removeFavorite =
    useRemoveFavorite();

  const toggleFavorite =
    async () => {

      try {

        if (isFavorite) {

          await removeFavorite.mutateAsync(
            propertyId,
          );

        } else {

          await addFavorite.mutateAsync(
            propertyId,
          );
        }

        await refetch();

      } catch (error) {

        console.error(error);
      }
    };

  return (

    <button
      onClick={toggleFavorite}
      className="border px-4 py-2"
    >

      {isFavorite
        ? '♥ Favorited'
        : '♡ Save Favorite'}

    </button>
  );
}
