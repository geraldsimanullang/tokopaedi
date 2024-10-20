import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/db/models/product";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;
    const query = search ? { name: { $regex: search, $options: "i" } } : {};

    const data = await getProducts(query, skip, limit);

    return NextResponse.json({
      products: data.products,
      currentPage: page,
      totalPages: Math.ceil(data.totalProducts / limit),
      totalProducts: data.totalProducts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
