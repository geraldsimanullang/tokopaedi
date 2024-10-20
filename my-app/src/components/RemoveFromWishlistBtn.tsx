"use client";

import React from "react";
import { Button } from "./ui/button";
import { deleteWishlist } from "@/app/wishlist/action";

const RemoveFromWishlistBtn = ({ wishlistId }: { wishlistId: string }) => {
  async function handleRemoveFromWishlistBtn() {
    try {
      await deleteWishlist(wishlistId);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <Button
        className="bg-white border-2 border-red-500 text-red-500 font-semibold py-1 px-3 text-sm w-fit rounded-md"
        onClick={() => handleRemoveFromWishlistBtn()}
      >
        Remove from Wishlist
      </Button>
    </div>
  );
};

export default RemoveFromWishlistBtn;
