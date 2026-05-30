'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function CreatePropertyPage() {

  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [imageUploading, setImageUploading] =
    useState(false);

  const [form, setForm] =
    useState({
      title: '',
      description: '',
      location: '',
      price: '',
      images: [] as string[],
    });

  const uploadImage = async (
    file: File,
  ) => {

    const formData =
      new FormData();

    formData.append(
      'file',
      file,
    );

    const response =
      await api.post(
        '/upload',
        formData,
        {
          headers: {
            'Content-Type':
              'multipart/form-data',
          },
        },
      );

    return response.data.url;
  };

  const handleImageChange =
    async (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {

      if (
        !e.target.files?.length
      ) {
        return;
      }

      try {

        setImageUploading(
          true,
        );

        const uploadedUrl =
          await uploadImage(
            e.target.files[0],
          );

        setForm(
          previous => ({
            ...previous,
            images: [
              ...previous.images,
              uploadedUrl,
            ],
          }),
        );

      } finally {

        setImageUploading(
          false,
        );
      }
    };

  const submit =
    async (
      e: React.FormEvent,
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        await api.post(
          '/properties',
          {
            ...form,
            price:
              Number(
                form.price,
              ),
          },
        );

        router.push(
          '/owner',
        );

      } catch (
        error
      ) {

        alert(
          'Failed to create property',
        );
      } finally {

        setLoading(
          false,
        );
      }
    };

  return (

    <div className="max-w-2xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Create Property
      </h1>

      <form
        onSubmit={submit}
        className="space-y-4"
      >

        <input
          placeholder="Title"
          className="border p-2 w-full"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title:
                e.target.value,
            })
          }
        />

        <textarea
          placeholder="Description"
          className="border p-2 w-full"
          value={
            form.description
          }
          onChange={(e) =>
            setForm({
              ...form,
              description:
                e.target.value,
            })
          }
        />

        <input
          placeholder="Location"
          className="border p-2 w-full"
          value={form.location}
          onChange={(e) =>
            setForm({
              ...form,
              location:
                e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 w-full"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price:
                e.target.value,
            })
          }
        />

        <input
          type="file"
          accept="image/*"
          onChange={
            handleImageChange
          }
        />

        {imageUploading && (
          <p>
            Uploading image...
          </p>
        )}

        <div className="grid grid-cols-3 gap-2">

          {form.images.map(
            (
              image,
              index,
            ) => (

              <img
                key={index}
                src={image}
                alt="Property"
                className="w-full h-32 object-cover"
              />
            ),
          )}

        </div>

        <button
          disabled={
            loading
          }
          className="border px-4 py-2"
        >

          {loading
            ? 'Saving...'
            : 'Create Property'}

        </button>

      </form>

    </div>
  );
}
