import { reader } from '@/lib/reader';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Phone, ShieldCheck, Truck } from 'lucide-react';

// 🟢 1. 生成静态路径 (SSG 核心)
// 告诉 Next.js 一共有多少台设备，提前把页面都生成好
export async function generateStaticParams() {
  const slugs = await reader.collections.products.list();
  return slugs.map((slug) => ({ slug }));
}

// 🟢 2. 页面组件
export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  // 等待参数解析 (Next.js 15+ 新规范)
  const params = await props.params;
  const slug = params.slug;

  // 从后台读取这台设备的数据
  const product = await reader.collections.products.read(slug);

  // 如果找不到 (比如乱输网址)，显示 404
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* 面包屑导航 */}
        <Link href="/shop" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> 返回设备列表
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* 左侧：大图展示 */}
          <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100 relative aspect-square md:aspect-[4/3]">
             {product.image ? (
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 mix-blend-multiply"
                  priority
                />
             ) : (
                <div className="flex items-center justify-center h-full text-gray-300 font-bold">暂无图片</div>
             )}
          </div>

          {/* 右侧：详细信息 */}
          <div>
            <div className="mb-2 text-primary font-bold uppercase tracking-wider text-sm">
                {product.category}
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                {product.name}
            </h1>
            
            <div className="text-3xl font-bold text-red-600 mb-8 border-b border-gray-100 pb-8">
               {product.price && product.price > 0 
                  ? `¥ ${product.price.toLocaleString()}` 
                  : <span className="text-green-600">价格面议</span>
               }
            </div>

            {/* 描述文本 */}
            <div className="prose prose-lg text-gray-600 mb-8">
                <h3 className="text-black font-bold text-lg mb-2">设备详情：</h3>
                <p className="whitespace-pre-line leading-relaxed">
                    {product.description || "暂无详细描述，请联系大山咨询更多细节。"}
                </p>
            </div>

            {/* 承诺图标 */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ShieldCheck className="w-5 h-5 text-green-500" /> 25年经验鉴定
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-5 h-5 text-blue-500" /> 物流破损包赔
                </div>
            </div>

            {/* 联系按钮 */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="font-bold text-gray-900 mb-2">对这台设备感兴趣？</p>
                <p className="text-sm text-gray-500 mb-4">库存流转快，建议直接电话联系大山锁定设备。</p>
                <Link href="/about" className="block w-full bg-primary hover:bg-red-700 text-white text-center font-bold py-4 rounded-sm transition-colors shadow-lg">
                    <Phone className="w-5 h-5 inline-block mr-2 -mt-1" />
                    联系大山 (134-7570-8779)
                </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}