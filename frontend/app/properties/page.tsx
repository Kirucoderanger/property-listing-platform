import Link from 'next/link';


async function getProperties() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/properties`,
    {
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    throw new Error(
      'Failed to load properties'
    );
  }

  return res.json();
}

export default async function PropertiesPage() {

  const result =
    await getProperties();

  const properties =
    result.data || result;

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Available Properties
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {properties.map(
          (property: any) => (

            <Link
              key={property.id}
              href={`/properties/${property.id}`}
            >

              <div className="border rounded-lg overflow-hidden shadow">

                {property.images?.[0] && (

                  <img
                    src={
                      property.images[0].url
                    }
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4">

                  <h2 className="font-bold text-lg">
                    {property.title}
                  </h2>

                  <p>
                    {property.location}
                  </p>

                  <p className="font-semibold">
                    ${property.price}
                  </p>

                    

                </div>

              </div>

            </Link>
          )
        )}

      </div>

    </div>
  );
}