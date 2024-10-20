import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/db/models/product";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { message: "Slug tidak disediakan", data: null },
        { status: 400 }
      );
    }

    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan", data: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Sukses", data: product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Terjadi kesalahan:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan server", data: null },
      { status: 500 }
    );
  }
}
