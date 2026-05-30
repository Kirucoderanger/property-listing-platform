'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function EditPropertyPage() {

  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await api.get(`/properties/${id}`);
      setForm(res.data);
    };

    fetchProperty();
  }, [id]);

  const updateProperty = async (e: React.FormEvent) => {
    e.preventDefault();

    await api.patch(`/properties/${id}`, {
      title: form.title,
      description: form.description,
      location: form.location,
      price: Number(form.price),
      images: form.images?.map((img: any) => img.url),
    });

    router.push('/owner');
  };

  if (!form) return <p>Loading...</p>;

  return (
    <form onSubmit={updateProperty} className="p-8 space-y-4">

      <input
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <textarea
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        value={form.location}
        onChange={(e) =>
          setForm({ ...form, location: e.target.value })
        }
      />

      <input
        type="number"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: e.target.value })
        }
      />

      <button className="border px-4 py-2">
        Update
      </button>

    </form>
  );
}
