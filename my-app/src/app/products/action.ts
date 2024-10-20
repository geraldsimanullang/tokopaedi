"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const fetchData = async (searchQuery: string, pageNumber: number) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/products?search=${searchQuery}&page=${pageNumber}&limit=10`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data.products;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
