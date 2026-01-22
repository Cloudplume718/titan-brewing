import { reader } from '@/lib/reader';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Phone, ShieldCheck, Truck } from 'lucide-react';
import WishlistButton from '@/components/WishlistButton'; // 🟢 引入收藏按钮

export async function generateStaticParams() {
  const slugs = await reader.collections.products.list();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;
  const product = await reader.collections.products.read(slug);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        
        <Link href="/shop" className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> 返回设备列表
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          
          {/* 左侧：图片 */}
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

          {/* 右侧：信息 */}
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

            <div className="prose prose-lg text-gray-600 mb-8">
                <h3 className="text-black font-bold text-lg mb-2">设备详情：</h3>
                <p className="whitespace-pre-line leading-relaxed">
                    {product.description || "暂无详细描述，请联系大山咨询更多细节。"}
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ShieldCheck className="w-5 h-5 text-green-500" /> 25年经验鉴定
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-5 h-5 text-blue-500" /> 物流破损包赔
                </div>
            </div>

            {/* 🟢 按钮区域 */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* 1. 联系大山按钮：跳转到 #contact */}
                <Link 
                    href="/about#contact" 
                    className="flex-[2] bg-primary hover:bg-red-700 text-white text-center font-bold py-4 rounded-sm transition-colors shadow-lg shadow-red-500/30 flex items-center justify-center"
                >
                    <Phone className="w-5 h-5 mr-2" />
                    联系大山 (134-7570-8779)
                </Link>

                {/* 2. 收藏按钮：使用新组件 */}
                <WishlistButton 
                    product={{
                        id: slug,
                        name: product.name,
                        price: product.price ?? 0,
                        image: product.image || '',
                        category: product.category
                    }}
                />
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}