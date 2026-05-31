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
        shadow
        overflow-hidden
        hover:shadow-lg
        transition
      "
    >
      <img
        src={
          property.images?.[0]?.url ||
          'https://via.placeholder.com/400x300'
        }
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

        <p className="text-gray-600">
          {property.location}
        </p>

        <p className="font-semibold mt-2">
          ${property.price}
        </p>
      </div>
    </Link>
  );
}
