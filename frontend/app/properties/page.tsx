'use client';

import { useEffect, useState } from 'react';

import { api } from '@/lib/api';

import PropertyGrid from '@/components/property-grid';

export default function PropertiesPage() {

  const [properties, setProperties] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadProperties();

  }, [page]);

  async function loadProperties() {

    try {

      setLoading(true);

      const res =
        await api.get(
          `/properties?page=${page}&limit=9`,
        );

      setProperties(
        res.data.data,
      );

      setTotalPages(
        res.data.totalPages,
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1
        className="
          text-3xl
          font-bold
          mb-8
        "
      >
        Properties
      </h1>

      <PropertyGrid
        properties={properties}
      />

      <div
        className="
          flex
          justify-center
          gap-4
          mt-10
        "
      >

        <button
          disabled={page === 1}
          onClick={() =>
            setPage(
              prev => prev - 1,
            )
          }
          className="
            px-4
            py-2
            bg-gray-800
            text-white
            hover:bg-gray-600
            rounded
            disabled:opacity-50
          "
        >
          Previous
        </button>

        <span
          className="
            flex
            items-center
          "
        >
          Page {page} of {totalPages}
        </span>

        <button
          disabled={
            page === totalPages
          }
          onClick={() =>
            setPage(
              prev => prev + 1,
            )
          }
          className="
            text-white
            px-4
            py-2
            bg-gray-800
            text-white
            hover:bg-gray-600
            rounded
            disabled:opacity-50
          "
        >
          Next
        </button>

      </div>

    </div>
  );
}
