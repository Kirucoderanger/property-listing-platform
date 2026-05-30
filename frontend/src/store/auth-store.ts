'use client';

import { create } from 'zustand';

interface AuthState {
  token: string | null;

  setToken: (token: string) => void;

  logout: () => void;

  isAuthenticated: () => boolean;
}

export const useAuthStore =
  create<AuthState>((set, get) => ({

    token:
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null,

    setToken: (token) => {

      localStorage.setItem(
        'accessToken',
        token,
      );

      set({ token });
    },

    logout: () => {

      localStorage.removeItem(
        'accessToken',
      );

      set({ token: null });
    },

    isAuthenticated: () =>
      !!get().token,
  }));
  