'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  useAuthStore,
} from '@/store/auth-store';

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const token =
    useAuthStore(
      (state) => state.token,
    );

  useEffect(() => {

    const savedToken =
      localStorage.getItem(
        'accessToken',
      );

    if (!savedToken) {
      router.push('/login');
    }

  }, [router]);

  return <>{children}</>;
}
