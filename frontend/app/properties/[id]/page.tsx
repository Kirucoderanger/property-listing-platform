interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function getProperty(
  id: string,
) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`,
    {
      cache: 'no-store',
    },
  );

  if (!res.ok) {
  const text =
    await res.text();

  throw new Error(
    `Status: ${res.status} | ${text}`,
  );
}

  return res.json();
}

export default async function PropertyDetailsPage({
  params,
}: Props) {

  const { id } =
    await params;

  const property =
    await getProperty(id);

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold">
        {property.title}
      </h1>

      <p>{property.location}</p>

      <p>${property.price}</p>

      <div className="grid grid-cols-3 gap-4 mt-6">

        {property.images?.map(
          (image: any) => (
            <img
              key={image.id}
              src={image.url}
              alt={property.title}
            />
          ),
        )}

      </div>

      <p className="mt-6">
        {property.description}
      </p>

    </div>
  );
}
