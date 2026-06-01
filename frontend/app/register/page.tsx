'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function RegisterPage() {

  const router = useRouter();

  const [form, setForm] =
    useState({
      
      email: '',
      password: '',
      role: 'USER',
    });

  const [loading, setLoading] =
    useState(false);

  const submit = async (
    e: React.FormEvent,
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post(
        '/auth/register',
        form,
      );

      router.push('/login');

    } catch (error) {

      alert(
        'Registration failed',
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">

      <h1 className="text-3xl font-bold mb-6">
        Register
      </h1>

      <form
        onSubmit={submit}
        className="space-y-4"
      >

        

        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email:
                e.target.value,
            })
          }
        />

        <input
          type="password"
          className="border p-2 w-full"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password:
                e.target.value,
            })
          }
        />

        <select
          className="border p-2 w-full"
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role:
                e.target.value,
            })
          }
        >

          <option value="USER">
            User
          </option>

          <option value="OWNER">
            Property Owner
          </option>
          <option value="ADMIN">
            Admin
          </option>


        </select>

        <button
          disabled={loading}
          className="bg-black text-white px-4 py-2 w-full"
        >
          {loading
            ? 'Creating...'
            : 'Register'}
        </button>

      </form>

    </div>
  );
}
