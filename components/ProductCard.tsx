"use client"; // 🟢 必须转为 Client Component 才能交互

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

interface ProductProps {
  data: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
}

export default function ProductCard({ data }: ProductProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const isLiked = isInWishlist(data.id);

  // 🟢 点击爱心时的处理
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // 阻止跳转到详情页
    e.stopPropagation();
    if (isLiked) {
      removeFromWishlist(data.id);
    } else {
      addToWishlist(data);
    }
  };

  return (
    <Link href={`/shop/${data.id}`} className="group block bg-white border border-gray-200 hover:border-primary/50 hover:shadow-xl transition-all duration-300 rounded-sm overflow-hidden flex flex-col h-full">
      {/* 图片区 */}
      <div className="aspect-square bg-gray-50 relative overflow-hidden p-6 flex items-center justify-center">
        {data.image ? (
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="text-gray-300 font-bold text-xl">暂无图片</div>
        )}
        
        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
            查看详情
        </div>
      </div>

      {/* 信息区 */}
      <div className="p-5 flex flex-col flex-1">
        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{data.category}</p>
        <h3 className="font-heading text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {data.name}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
            <span className={`font-bold text-xl ${data.price > 0 ? "text-primary" : "text-green-600"}`}>
                {data.price > 0 ? `¥ ${data.price.toLocaleString()}` : "面议"}
            </span>
            
            {/* 🟢 收藏按钮：点击变色 */}
            <button 
                onClick={handleLike}
                className={`p-2 rounded-full transition-colors z-20 ${
                    isLiked ? "bg-red-50 text-red-500" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                }`}
            >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
        </div>
      </div>
    </Link>
  );
}