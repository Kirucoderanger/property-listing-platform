'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link
          href="/"
          className="font-bold text-xl"
        >
          PropertyHub
        </Link>

        <div className="flex gap-6 text-sm">

          <Link href="/properties">
            Properties
          </Link>

          <Link href="/favorites">
            Favorites
          </Link>

          <Link href="/owner">
            Owner
          </Link>

          <Link href="/admin">
            Admin
          </Link>

        </div>

      </div>
    </nav>
  );
}
