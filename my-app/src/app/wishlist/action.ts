"use server";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

import { ProductModel } from "@/db/models/product";

type WishListType<T> = {
  _id: string;
  userId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  Product: T;
};

export async function getData() {
  try {
    const res = await fetch(`${BASE_URL}/api/wishlist`, {
      method: "GET",
      headers: {
        Cookie: cookies().toString(),
      },
    });

    const json = await res.json();
    const data: WishListType<ProductModel>[] = json.data;
    if (!data) {
      return [];
    }
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addWishlist(productId: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      credentials: "include",
      body: JSON.stringify({
        productId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      return redirect("/login");
    }
    revalidatePath("/wishlist");
    redirect("/wishlist");
  } catch (error) {
    throw error;
  }
}

export async function deleteWishlist(wishlistId: string) {
  try {
    await fetch(`${BASE_URL}/api/wishlist`, {
      cache: "no-store",
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
      body: JSON.stringify({
        wishlistId,
      }),
    });
    revalidatePath("/wishlist");
    redirect("/wishlist");
  } catch (error) {
    throw error;
  }
}
