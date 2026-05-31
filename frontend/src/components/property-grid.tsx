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
        lg:grid-cols-3
        gap-6
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
