import Navbar from "@/components/Navbar";
import AddToWishlistBtn from "@/components/AddToWishlistBtn";
import { Metadata } from "next";
import React from "react";
import { ProductModel } from "@/db/models/product";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

type SlugType = {
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const response = await fetch(`${BASE_URL}/api/products/${params.slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data }: { data: ProductModel } = await response.json();
  return {
    title: data.name,
    description: data.description,
    icons: {
      icon: "/favicon.ico",
    },
  };
}

const ProductDetail = async ({ params }: { params: SlugType }) => {
  const response = await fetch(`${BASE_URL}/api/products/${params.slug}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const { data }: { data: ProductModel } = await response.json();

  return (
    <>
      <Navbar />
      <main className="mt-20 py-5">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4">
              <img
                src={data.thumbnail}
                alt={data.name}
                className="w-96 h-auto object-cover rounded-lg border border-gray-200"
              />

              <div className="flex gap-2">
                {data.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${data.name} image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-green-500"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
              {data.name}
            </h1>

            <p className="text-3xl font-bold text-green-500">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(data.price)}
            </p>

            <p className="text-gray-500 mt-2">{data.excerpt}</p>

            <div className="mt-5">
              <h2 className="text-lg font-bold text-gray-800">Description</h2>
              <p className="text-gray-600 mt-1">{data.description}</p>
            </div>

            <div className="mt-5">
              <h3 className="text-lg font-bold text-gray-800">Tags</h3>
              <div className="flex gap-2 mt-2">
                {data.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <AddToWishlistBtn productId={data._id.toString()} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetail;
