'use client';

import Link from 'next/link';

export default function PropertyCard({
  property,
}: {
  property: any;
}) {
  return (
    <Link
      href={`/properties/${property.id}`}
    >
      <div className="
        bg-white
        rounded-xl
        shadow
        overflow-hidden
        hover:shadow-lg
        transition
      ">

        <img
          src={property.images?.[0]?.url}
          alt={property.title}
          className="
            w-full
            h-56
            object-cover
          "
        />

        <div className="p-4">

          <h2 className="font-bold text-lg">
            {property.title}
          </h2>

          <p className="text-gray-500">
            {property.location}
          </p>

          <p className="mt-2 text-2xl font-bold">
            ${property.price}
          </p>

        </div>

      </div>
    </Link>
  );
}
