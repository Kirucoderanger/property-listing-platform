'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import ProtectedRoute from '@/components/protected-route';

export default function AdminPage() {

  const {
    data,
    isLoading,
    error,
  } = useQuery({

    queryKey: ['admin-metrics'],

    queryFn: async () => {

      const response =
        await api.get(
          '/admin/metrics',
        );

      return response.data;
    },
  });

  return (

    <ProtectedRoute>

      <div className="p-8">

        <h1 className="text-3xl font-bold mb-8">
          Admin Dashboard
        </h1>

        {isLoading && (
          <p>Loading metrics...</p>
        )}

        {error && (
          <p>
            Failed to load metrics
          </p>
        )}

        {data && (

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <div className="border p-4 rounded">
              <h2>Total Users</h2>

              <p className="text-3xl font-bold">
                {data.totalUsers}
              </p>
            </div>

            <div className="border p-4 rounded">
              <h2>Total Properties</h2>

              <p className="text-3xl font-bold">
                {data.totalProperties}
              </p>
            </div>

            <div className="border p-4 rounded">
              <h2>Published</h2>

              <p className="text-3xl font-bold">
                {data.publishedProperties}
              </p>
            </div>

            <div className="border p-4 rounded">
              <h2>Drafts</h2>

              <p className="text-3xl font-bold">
                {data.draftProperties}
              </p>
            </div>

          </div>
        )}

      </div>

    </ProtectedRoute>
  );
}
