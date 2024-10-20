import { ProductModel } from "@/db/models/product";
import Link from "next/link";
import { formatPrice } from "./utils/format-price";
import AddToWishlistBtn from "./AddToWishlistBtn";

const FeaturedProducts = ({ products }: { products: ProductModel[] }) => {
  return (
    <div className="flex flex-col justify-start items-start w-full gap-5 shadow-md rounded-xl p-4 border-[0.5px] border-slate-200">
      <h2 className="text-2xl font-bold">
        Featured Products{" "}
        <Link href="/products" className="pl-5 text-sm text-green-600">
          Lihat Semua
        </Link>
      </h2>
      <div className="flex flex-wrap gap-8 w-full px-8">
        {products.map((product) => {
          return (
            <div
              className="flex flex-col h-fit w-[200px] shadow-md gap-2 border-[0.5px] border-slate-200 rounded-md"
              key={product._id.toString()}
            >
              <Link href={`/products/${product.slug}`}>
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </Link>
              <div className="flex flex-col gap-1">
                <Link href={`/products/${product.slug}`}>
                  <p className="text-wrap text-sm px-2 h-10">
                    {product.name.length > 46
                      ? product.name.slice(0, 45) + "..."
                      : product.name}
                  </p>
                </Link>
                <p className="text-wrap px-2 font-semibold text-md m-0">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="flex justify-start pl-2 pt-1 pb-4">
                <AddToWishlistBtn productId={product._id.toString()} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturedProducts;
