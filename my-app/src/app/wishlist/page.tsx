import Navbar from "@/components/Navbar";
import { getData } from "./action";
import Link from "next/link";
import { formatPrice } from "@/components/utils/format-price";
import RemoveFromWishlistBtn from "@/components/RemoveFromWishlistBtn";

const Wishlist = async () => {
  const wishlists = await getData();

  return (
    <section>
      <Navbar />
      <main className="px-20 py-5 mt-20 flex flex-col gap-8">
        <p className="text-xl font-semibold">Wishlist</p>
        <section className="flex flex-wrap gap-10 justify-start">
          {wishlists &&
            wishlists.map((wishlist) => {
              return (
                <>
                  <div className="flex flex-col h-fit w-[200px] shadow-md gap-2 border-[0.5px] border-slate-200 rounded-md">
                    <Link href={`/products/${wishlist.Product.slug}`}>
                      <img
                        src={wishlist.Product.thumbnail}
                        alt={wishlist.Product.name}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                    </Link>
                    <div className="flex flex-col gap-1">
                      <Link href={`/products/${wishlist.Product.slug}`}>
                        <p className="text-wrap text-sm px-2 h-10">
                          {wishlist.Product.name.length > 46
                            ? wishlist.Product.name.slice(0, 45) + "..."
                            : wishlist.Product.name}
                        </p>
                      </Link>
                      <p className="text-wrap px-2 font-semibold text-md m-0">
                        {formatPrice(wishlist.Product.price)}
                      </p>
                    </div>
                    <div className="flex justify-start pl-2 pt-1 pb-4">
                      <RemoveFromWishlistBtn
                        wishlistId={wishlist._id.toString()}
                      />
                    </div>
                  </div>
                </>
              );
            })}
        </section>
      </main>
    </section>
  );
};

export default Wishlist;
