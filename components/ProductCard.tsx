import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

interface ProductProps {
  data: {
    id: string;
    name: string;
    price: number; // 这里接收 0 或者具体金额
    image: string;
    category: string;
  };
}

export default function ProductCard({ data }: ProductProps) {
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
            {/* 🟢 核心修改：价格显示逻辑 */}
            <span className={`font-bold text-xl ${data.price > 0 ? "text-primary" : "text-green-600"}`}>
                {data.price > 0 ? `¥ ${data.price.toLocaleString()}` : "面议"}
            </span>
            
            <span className="bg-gray-100 text-gray-600 p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                <ShoppingCart className="w-4 h-4" />
            </span>
        </div>
      </div>
    </Link>
  );
}