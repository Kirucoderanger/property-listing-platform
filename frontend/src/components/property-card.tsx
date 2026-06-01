'use client';

import Link from 'next/link';

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    images?: {
      url: string;
    }[];
  };
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {

  return (
    <Link
      href={`/properties/${property.id}`}
      className="
         bg-white
        rounded-lg
        shadow-sm
        overflow-hidden
        hover:shadow-md
        transition-all
        duration-200
      "
    >
      <img
        src={
          property.images?.[0]?.url ||
          'https://via.placeholder.com/300x200'
        }
        alt={property.title}
        className="
          w-full
          h-56
          object-cover
        "
      />

      <div className="p-3">
        <h2
          className="
            font-semibold
            text-gray-800
            text-sm
            truncate
          "
        >
          {property.title}
        </h2>

        <p
          className="
            text-gray-500
            text-xs
            truncate
            mt-1
          "
        >
          📍 {property.location}
        </p>

        <p
          className="
            text-green-600
            font-bold
            text-sm
            mt-2
          "
        >
          ${property.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}
