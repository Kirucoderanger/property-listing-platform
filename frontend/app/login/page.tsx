'use client';

import { useState } from 'react';

import {
  useRouter,
} from 'next/navigation';

import { api } from '@/lib/api';

import {
  useAuthStore,
} from '@/store/auth-store';

export default function LoginPage() {

  const router =
    useRouter();

  const setToken =
    useAuthStore(
      (state) =>
        state.setToken,
    );

  const [email, setEmail] =
    useState('');

  const [password,
    setPassword] =
    useState('');

  const [loading,
    setLoading] =
    useState(false);

  const submit = async (
    e:
      React.FormEvent,
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      const res =
        await api.post(
          '/auth/login',
          {
            email,
            password,
          },
        );

      setToken(
        res.data
          .access_token,
      );

      router.push(
        '/dashboard',
      );

    } catch {

      alert(
        'Invalid credentials',
      );
    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">

      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <form
        onSubmit={submit}
        className="space-y-4"
      >

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value,
            )
          }
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value,
            )
          }
        />

        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 w-full"
        >
          {loading
            ? 'Signing in...'
            : 'Login'}
        </button>

      </form>

    </div>
  );
}
