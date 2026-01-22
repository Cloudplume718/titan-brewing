"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

interface WishlistButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

export default function WishlistButton({ product }: WishlistButtonProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(product.id);

  const toggleWishlist = () => {
    if (isLiked) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`flex-1 py-4 rounded-sm font-bold border transition-colors flex items-center justify-center gap-2 ${
        isLiked
          ? "border-primary bg-red-50 text-primary"
          : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
      }`}
    >
      <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
      {isLiked ? "已收藏" : "加入收藏"}
    </button>
  );
}