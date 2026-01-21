"use client";

import { ShoppingCart, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

interface ProductActionsProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string; // URL string
    category: string;
  };
}

export default function ProductActions({ product }: ProductActionsProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isSaved = isInWishlist(product.id);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleWishlist = () => {
    setIsAnimating(true);
    if (isSaved) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    setTimeout(() => setIsAnimating(false), 300); // 简单的动画复位
  };

  return (
    <div className="flex gap-4">
      {/* 购物车按钮 (暂时只是摆设) */}
      <button className="flex-1 bg-primary text-black font-bold py-4 px-8 uppercase tracking-widest hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 text-lg">
        <ShoppingCart className="w-6 h-6" /> 加入购物车
      </button>

      {/* 收藏按钮 */}
      <button 
        onClick={toggleWishlist}
        className={`px-6 border-2 transition-all duration-300 flex items-center justify-center ${
            isSaved 
            ? "border-red-500 bg-red-500/10 text-red-500" 
            : "border-white/20 text-gray-400 hover:border-white hover:text-white"
        }`}
      >
        <Heart 
            className={`w-8 h-8 transition-transform ${isSaved ? "fill-current" : ""} ${isAnimating ? "scale-125" : "scale-100"}`} 
        />
      </button>
    </div>
  );
}