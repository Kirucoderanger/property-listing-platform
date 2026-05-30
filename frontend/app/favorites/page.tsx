'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useFavoritesSync } from '@/hooks/useFavoritesSync';

export default function FavoritesPage() {

  const {
    data,
    isLoading,
  } = useQuery({

    queryKey: ['favorites'],

    queryFn: async () => {

      const response =
        await api.get(
          '/favorites',
        );

      return response.data;
    },
  });

  useFavoritesSync();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        My Favorites
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {data?.map(
          (favorite: any) => (

            <div
              key={favorite.id}
              className="border p-4 rounded"
            >

              <img
                src={
                  favorite.property.images?.[0]?.url
                }
                alt={
                  favorite.property.title
                }
                className="w-full h-48 object-cover"
              />

              <h2 className="font-bold mt-2">
                {favorite.property.title}
              </h2>

              <p>
                {favorite.property.location}
              </p>

              <p>
                ${favorite.property.price}
              </p>

            </div>
          ),
        )}

      </div>

    </div>
  );
}
