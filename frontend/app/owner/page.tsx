'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import ProtectedRoute from '@/components/protected-route';

export default function OwnerPage() {

  const {
    data,
    isLoading,
  } = useQuery({

    queryKey: ['my-properties'],

    queryFn: async () => {

      const response =
        await api.get(
          '/properties/my-properties',
        );

      return response.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (

    <ProtectedRoute>

      <div className="p-8">

        <div className="flex justify-between mb-6">

          <h1 className="text-3xl font-bold">
            My Properties
          </h1>

          <Link
            href="/owner/create"
            className="border px-4 py-2"
          >
            Create Property
          </Link>

        </div>

        <div className="space-y-4">

          {data?.map(
            (property: any) => (

              <div
                key={property.id}
                className="border p-4 rounded"
              >

                <h2 className="font-bold">
                  {property.title}
                </h2>

                <p>
                  {property.location}
                </p>

                <p>
                  ${property.price}
                </p>

                <p>
                  Status:
                  {' '}
                  {property.status}
                </p>

                <div className="flex gap-2 mt-3">

                  <Link
                    href={`/owner/edit/${property.id}`}
                    className="border px-3 py-1"
                  >
                    Edit
                  </Link>

                  {property.status ===
                    'DRAFT' && (

                    <button
                      className="border px-3 py-1"
                    >
                      Publish
                    </button>
                  )}

                </div>

              </div>
            ),
          )}

        </div>

      </div>

    </ProtectedRoute>
  );
}
