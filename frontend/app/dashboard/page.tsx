'use client';

import ProtectedRoute from '@/components/protected-route';

import { useCurrentUser } from '@/hooks/use-current-user';

export default function DashboardPage() {

  const {
    data,
    isLoading,
  } = useCurrentUser();

  return (
    <ProtectedRoute allowedRoles={['USER', 'OWNER', 'ADMIN']}>

      <div className="p-10">

        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <p>
              Email:
              {' '}
              {data?.email}
            </p>

            <p>
              Role:
              {' '}
              {data?.role}
            </p>
          </>
        )}

      </div>

    </ProtectedRoute>
  );
}
