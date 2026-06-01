'use client';

import {
  useEffect,
  useState,
} from 'react';

import { api }
from '@/lib/api';

interface User {
  id: string;
  email: string;
  role: string;
}

export function useAuth() {

  const [user,
    setUser] =
    useState<User | null>(
      null,
    );

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    const loadUser =
      async () => {

        const token =
          localStorage.getItem(
            'accessToken',
          );

        if (!token) {

          setLoading(
            false,
          );

          return;
        }

        try {

          const res =
            await api.get(
              '/auth/profile',
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              },
            );

          setUser(
            res.data,
          );

        } catch {

          localStorage.removeItem(
            'accessToken',
          );

          setUser(
            null,
          );
        }

        setLoading(
          false,
        );
      };

    loadUser();

  }, []);

  const logout =
    () => {

      localStorage.removeItem(
        'accessToken',
      );

      setUser(
        null,
      );

      window.location.href =
        '/login';
    };

  return {

    user,

    role:
      user?.role,

    loading,

    logout,
  };
}
