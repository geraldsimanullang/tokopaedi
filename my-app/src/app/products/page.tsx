"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductModel } from "@/db/models/product";
import { fetchData } from "./action";
import { formatPrice } from "@/components/utils/format-price";
import { useRouter } from "next/navigation";
import AddToWishlistBtn from "@/components/AddToWishlistBtn";

function debounce<T extends unknown[]>(
  func: (...args: T) => Promise<void>,
  wait: number
) {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const Products = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const [items, setItems] = useState<ProductModel[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isGettingParams, setIsGettingParams] = useState(false);

  // Sebenarnya di sini saya membuat fitur user bisa melakukan search pada URL bar browser (/products?search=mencari),
  // Fitur ini bekerja dengan baik pada localhost, tetapi menjadi sebuah masalah ketika deploy.

  // const getSearchParams = () => {
  //   const search = searchParams.get("search");

  //   if (!search) {
  //     setQuery("");
  //     return;
  //   }

  //   setQuery(search);
  //   return;
  // };

  const fetchInitialData = async () => {
    setIsLoading(true);
    const products = await fetchData(query, 1);
    setItems(products);
    setHasMore(products.length > 0);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsGettingParams(true);
    // getSearchParams();
    setIsGettingParams(false);

    if (!isGettingParams) {
      fetchInitialData();
    }
  }, []);

  useEffect(() => {
    const fetchFromSearch = async () => {
      setIsLoading(true);
      const products = await fetchData(query, 1);
      setItems(products);
      setHasMore(products.length > 0);
      setIsLoading(false);
    };

    fetchFromSearch();
  }, [query]);

  const handleSearch = debounce(async (query: string) => {
    router.push(`/products?search=${query}`);

    setQuery(query);
    setPage(1);
    setIsLoading(true);
    const products = await fetchData(query, 1);
    setItems(products);
    setHasMore(products.length > 0);
    setIsLoading(false);
  }, 800);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleSearch(value);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;
    setIsLoading(true);
    const products = await fetchData(query, nextPage);
    if (products.length > 0) {
      setItems((prevItems) => [...prevItems, ...products]);
      setPage(nextPage);
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      <nav className="bg-white border-b-slate-400 flex justify-center shadow-sm">
        <div className="container py-4 flex justify-between items-center align-center gap-16">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={150}
                height={0}
                style={{ width: "auto", height: "auto" }}
              />
            </Link>
          </div>

          <div className="flex-1 mx-4">
            <input
              type="text"
              name="search"
              placeholder="Cari di Tokopaedi"
              className="w-full text-gray-800 py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
              onChange={onInputChange}
              defaultValue={query}
            />
          </div>
          <Link href="/wishlist">
            <button className="text-gray-800 pr-3">Wishlist</button>
          </Link>
        </div>
      </nav>
      <main className="px-20 py-8 flex flex-col gap-8">
        <h1 className="text-xl font-semibold">Produk</h1>
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            isLoading && items.length === 0 ? (
              <p className="animate-pulse text-center text-gray-500">
                Memuat, mohon tunggu...
              </p>
            ) : null
          }
          endMessage={
            !hasMore &&
            !isLoading &&
            items.length > 0 && (
              <p className="text-center py-10 text-gray-500">
                Tidak ada produk lain lagi
              </p>
            )
          }
        >
          <section className="flex flex-wrap gap-10 justify-start">
            {items.map((item) => (
              <div
                key={item._id.toString()}
                className="flex flex-col min-h-fit w-[200px] shadow-md gap-2 border-[0.5px] border-slate-200 rounded-md"
              >
                <Link href={`/products/${item.slug}`}>
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </Link>

                <div className="flex flex-col gap-1">
                  <Link href={`/products/${item.slug}`}>
                    <p className="text-wrap text-sm px-2 h-10">
                      {item.name.length > 46
                        ? item.name.slice(0, 45) + "..."
                        : item.name}
                    </p>
                  </Link>
                  <p className="text-wrap px-2 font-semibold text-md m-0">
                    {formatPrice(item.price)}
                  </p>
                </div>
                <div className="flex justify-start pl-2 pt-1 pb-4">
                  <AddToWishlistBtn productId={item._id.toString()} />
                </div>
              </div>
            ))}
          </section>
        </InfiniteScroll>

        {!isLoading && items.length === 0 && (
          <p className="text-center">Oops, produk tidak ditemukan</p>
        )}
      </main>
    </>
  );
};

export default Products;
