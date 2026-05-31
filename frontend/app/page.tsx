import Link from 'next/link';

export default function HomePage() {

  return (
    <div className="p-10">

      <h1 className="text-5xl font-bold">
        Property Listing Platform
      </h1>

      <div className="mt-6 flex gap-4">

        <Link
          href="/properties"
          className="border px-4 py-2"
        >
          Browse Properties
        </Link>

        <Link
          href="/login"
          className="border px-4 py-2"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="border px-4 py-2"
        >
          Register
        </Link>

      </div>

    </div>
  );
}
