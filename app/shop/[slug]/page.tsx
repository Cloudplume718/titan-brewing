import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle, CheckCircle, Truck, ShieldCheck } from "lucide-react";
import { getProduct } from "@/lib/feishu";
// 🟢 引入收藏按钮组件
import ProductWishlistButton from "@/components/ProductWishlistButton";

// 强制动态渲染
export const dynamic = 'force-dynamic';

interface PageProps {
  // 🟢 因为你的文件夹叫 [slug]，所以这里参数名必须是 slug
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  // 1. 获取 URL 参数 (Next.js 15+ 需要 await)
  const { slug } = await params;
  
  // 2. 用这个 slug (其实就是商品ID) 去飞书查数据
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // 3. 数据清洗
  const priceNumber = isNaN(Number(product.price)) ? 0 : Number(product.price);
  // 🟢 关键修复：给 category 一个默认值，防止飞书没填导致报错
  const safeCategory = product.category || '精选设备';

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 面包屑导航 */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/shop" className="hover:text-primary flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回商城
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* 左侧：图片展示区 */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative group">
                {product.imageUrl ? (
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105" 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50">
                        暂无图片
                    </div>
                )}
            </div>
            
            {/* 服务承诺 */}
            <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border border-gray-100 text-xs text-gray-600">
                    <CheckCircle className="w-4 h-4 text-primary" /> 专业检测
                </div>
                <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border border-gray-100 text-xs text-gray-600">
                    <Truck className="w-4 h-4 text-primary" /> 全国物流
                </div>
                <div className="flex items-center justify-center gap-2 bg-white p-3 rounded-lg border border-gray-100 text-xs text-gray-600">
                    <ShieldCheck className="w-4 h-4 text-primary" /> 售后保障
                </div>
            </div>
          </div>

          {/* 右侧：信息详情区 */}
          <div className="flex flex-col h-full">
            
            {/* 分类标签 */}
            <div className="mb-4">
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {safeCategory}
                </span>
            </div>

            {/* 标题 */}
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6 leading-tight">
                {product.name}
            </h1>

            {/* 价格 */}
            <div className="flex items-baseline gap-2 mb-8 pb-8 border-b border-gray-100">
                {priceNumber > 0 ? (
                    <>
                        <span className="text-4xl font-bold text-primary">¥{priceNumber.toLocaleString()}</span>
                        <span className="text-gray-400 text-sm">不含运费</span>
                    </>
                ) : (
                    <span className="text-4xl font-bold text-primary">价格面议</span>
                )}
            </div>

            {/* 描述 */}
            <div className="prose prose-gray max-w-none text-gray-600 mb-10 flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-3">设备详情</h3>
                <p className="whitespace-pre-line leading-relaxed">
                    {product.desc || "暂无详细描述，请联系客服获取更多信息。"}
                </p>
            </div>

            {/* 🟢 底部按钮组 */}
            <div className="flex gap-4 mt-auto">
                <Link 
                    href="/about#contact" 
                    className="flex-1 bg-primary hover:bg-red-700 text-white font-bold py-4 px-8 rounded-sm transition-all shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 group"
                >
                    <MessageCircle className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                    联系大山购买
                </Link>

                {/* 🟢 收藏按钮：现在传入了 category，不会再报错了 */}
                <ProductWishlistButton 
                    data={{
                        id: product.id,
                        name: product.name,
                        price: priceNumber,
                        image: product.imageUrl || '',
                        category: safeCategory // 👈 补全了这个字段
                    }} 
                />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}