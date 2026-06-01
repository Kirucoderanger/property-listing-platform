'use client';

import Link
from 'next/link';

import {
  useAuth,
} from '@/hooks/use-auth';

export default function Navbar() {

  const {
    user,
    role,
    logout,
    loading,
  } = useAuth();

  if (loading) {
    return null;
  }

  return (

    <nav className="
      flex
      justify-between
      items-center
      p-4
      border-b
    ">

      <Link href="/">
        Property Platform
      </Link>

      <div className="
        flex
        gap-4
      ">

        <Link href="/">
          Home
        </Link>

        <Link href="/properties">
          Properties
        </Link>

        {!user && (
          <>
            <Link href="/login">
              Login
            </Link>

            <Link href="/register">
              Register
            </Link>
          </>
        )}

        {role === 'USER' && (
          <>
            <Link href="/dashboard">
              Dashboard
            </Link>

            <Link href="/favorites">
              Favorites
            </Link>
          </>
        )}

        {role === 'OWNER' && (
          <>
            <Link href="/owner">
              My Properties
            </Link>

            <Link href="/owner/create">
              Create Property
            </Link>
          </>
        )}

        {role === 'ADMIN' && (
          <>
            <Link href="/admin">
              Admin
            </Link>
          </>
        )}

        {user && (

          <button
            onClick={logout}
          >
            Logout
          </button>

        )}

      </div>

    </nav>
  );
}
