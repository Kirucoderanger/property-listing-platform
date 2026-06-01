'use client';

import {
  useRouter,
} from 'next/navigation';

export default function LogoutButton() {

  const router =
    useRouter();

  function logout() {

    localStorage.removeItem(
      'accessToken',
    );

    router.push(
      '/login',
    );
  }

  return (
    <button
      onClick={logout}
      className="
        px-4
        py-2
        bg-red-500
        text-white
        rounded
      "
    >
      Logout
    </button>
  );
}
