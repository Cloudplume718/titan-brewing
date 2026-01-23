'use client';

import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';

interface ProductWishlistButtonProps {
  data: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string; // 🟢 1. 新增：这里必须接收 category
  };
}

export default function ProductWishlistButton({ data }: ProductWishlistButtonProps) {
  const { items, addToWishlist, removeFromWishlist } = useWishlist();
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(items.some((item) => item.id === data.id));
  }, [items, data.id]);

  const toggleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(data.id);
    } else {
      addToWishlist({
        id: data.id,
        name: data.name,
        price: data.price,
        image: data.image,
        category: data.category, // 🟢 2. 新增：加入收藏时带上 category
      });
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`group flex items-center justify-center w-14 h-14 rounded-sm border transition-all duration-200 ${
        isInWishlist
          ? 'bg-red-50 border-red-200 text-red-500' 
          : 'bg-white border-gray-200 text-gray-400 hover:border-primary hover:text-primary'
      }`}
      title={isInWishlist ? "取消收藏" : "加入收藏"}
    >
      <Heart
        className={`w-6 h-6 transition-transform duration-200 ${
          isInWishlist ? 'fill-current scale-110' : 'group-hover:scale-110'
        }`}
      />
    </button>
  );
}