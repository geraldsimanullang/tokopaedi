"use client";

import { useRouter } from "next/navigation";
import { addWishlist } from "@/app/wishlist/action";
import { revalidatePath } from "next/cache";

const AddToWishlistBtn = ({ productId }: { productId: string }) => {
  const router = useRouter();
  async function addToWishlist(productId: string) {
    try {
      await addWishlist(productId);
      revalidatePath("/wishlist");
      router.push("/wishlist");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button
        className="bg-white border-2 border-green-600 text-green-600 font-semibold py-1 px-3 text-sm w-fit rounded-md"
        onClick={() => addToWishlist(productId)}
      >
        Add to Wishlist
      </button>
    </>
  );
};

export default AddToWishlistBtn;
