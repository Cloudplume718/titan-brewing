import Link from "next/link";
import { getProducts } from "@/lib/feishu";
import ShopClient from "@/components/ShopClient"; // 引入搜索组件
import { ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  // 1. 服务端获取数据
  const products = await getProducts();
  
  // 2. 数据清洗（把价格逻辑处理好再传给客户端）
  const cleanProducts = products.map(p => ({
    ...p,
    // 确保 price 是数字或 0 (面议)
    price: isNaN(Number(p.price)) ? 0 : Number(p.price)
  }));

  return (
    // 🟢 修复点1：添加 pt-24 防止顶部导航栏遮挡内容
    <main className="min-h-screen bg-gray-50 pt-24">
      
      {/* 面包屑导航 (放在这里作为静态内容) */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
           <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> 返回首页
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">所有库存</span>
          </div>
        </div>
      </div>

      {/* 🟢 修复点2：加载带有搜索功能的客户端组件 */}
      <ShopClient initialProducts={cleanProducts} />

      {/* 底部补充说明 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className="bg-blue-50 border border-blue-100 rounded-md p-6 text-center md:text-left md:flex justify-between items-center">
          <div>
            <h4 className="text-blue-900 font-bold text-lg mb-1">没找到想要的设备？</h4>
            <p className="text-blue-700 text-sm">我们仓库还有部分未上架资源，或者可以帮您寻找特定型号。</p>
          </div>
          <Link href="/about#contact" className="mt-4 md:mt-0 inline-block bg-white text-blue-700 border border-blue-200 font-bold py-2 px-6 rounded-sm hover:bg-blue-50 transition-colors">
            联系大山咨询
          </Link>
        </div>
      </div>
    </main>
  );
}