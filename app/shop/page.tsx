import Link from 'next/link';
import { reader } from '@/lib/reader';
import ProductCard from '@/components/ProductCard';

// 🟢 接收 searchParams 参数
export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  // 读取所有数据
  const allProducts = await reader.collections.products.all();
  
  // 等待搜索参数 (Next.js 15+)
  const params = await searchParams;
  const searchQuery = params.search?.toLowerCase() || "";

  // 🟢 过滤逻辑：匹配名称或分类
  const filteredProducts = allProducts.filter(product => {
     if (!searchQuery) return true; // 没搜东西就全显示
     return (
        product.entry.name.toLowerCase().includes(searchQuery) ||
        product.entry.category.toLowerCase().includes(searchQuery)
     );
  });

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-12">
            <h1 className="text-4xl font-heading font-bold text-gray-900 uppercase mb-2">
                {searchQuery ? `搜索结果: "${searchQuery}"` : "全部库存"}
                <span className="text-gray-400 text-2xl font-light ml-2">
                    ({filteredProducts.length})
                </span>
            </h1>
            <p className="text-gray-500">
                {filteredProducts.length === 0 
                    ? "未找到相关设备，请尝试其他关键词。" 
                    : "大山严选，品质保证。所有设备均在聊城仓库，欢迎实地考察。"}
            </p>
            {/* 如果是搜索状态，给个返回按钮 */}
            {searchQuery && (
                <Link href="/shop" className="mt-4 inline-block text-primary underline">
                    返回全部列表
                </Link>
            )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.slug} 
              data={{
                id: product.slug, 
                name: product.entry.name,
                price: product.entry.price ?? 0, 
                image: product.entry.image || '', 
                category: product.entry.category
              }} 
            />
          ))}
        </div>

      </div>
    </main>
  );
}