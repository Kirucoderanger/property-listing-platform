import PropertyCard from './property-card';

interface PropertyGridProps {
  properties: any[];
}

export default function PropertyGrid({
  properties,
}: PropertyGridProps) {
  return (
    <div
      className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        gap-4
      "
    >
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}
