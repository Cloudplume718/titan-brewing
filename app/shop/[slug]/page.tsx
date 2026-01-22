import Link from "next/link";
import { ArrowLeft, CheckCircle, Phone } from "lucide-react";
import { getProduct } from "@/lib/feishu";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const productId = resolvedParams.slug; 

  const product = await getProduct(productId); 

  if (!product) {
    return notFound();
  }

  return (
    // 🟢 修复点：添加 pt-24 防止顶部导航栏遮挡
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* 顶部导航 */}
        <Link href="/shop" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> 返回列表
        </Link>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 grid grid-cols-1 md:grid-cols-2">
          {/* 左侧：图片 */}
          <div className="bg-gray-100 h-96 md:h-auto relative">
             {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
             ) : (
                <div className="flex items-center justify-center h-full text-gray-400">暂无图片</div>
             )}
          </div>

          {/* 右侧：信息 */}
          <div className="p-8 md:p-12 flex flex-col">
            <div className="mb-auto">
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {product.category}
              </span>
              <h1 className="mt-4 text-3xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              <p className="mt-4 text-4xl font-bold text-red-600">
                 {isNaN(Number(product.price)) || Number(product.price) === 0 
                    ? "面议" 
                    : `¥ ${product.price}`}
              </p>
              
              <div className="mt-8 prose prose-gray text-gray-500">
                <h3 className="text-black font-bold text-lg mb-2">设备详情</h3>
                <p className="whitespace-pre-wrap leading-relaxed">
                  {product.desc || "暂无详细描述，请联系客服咨询。"}
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" /> 经过大山团队 26 项严格检测
                </div>
                <div className="flex items-center text-sm text-green-600">
                    <CheckCircle className="w-4 h-4 mr-2" /> 提供安装调试与酿造指导
                </div>
              </div>
            </div>

            {/* 底部按钮 */}
            <div className="mt-10 pt-8 border-t border-gray-100">
              <p className="text-sm text-gray-400 mb-3">有意购买此设备？</p>
              <div className="flex gap-4">
                {/* 🟢 修复点：链接跳转到 about 页面的底部 #contact */}
                <Link href="/about#contact" className="flex-1 bg-primary text-white text-center font-bold py-3 rounded-md hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> 联系大山咨询
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}