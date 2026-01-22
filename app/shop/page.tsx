import Link from 'next/link';
import { reader } from '@/lib/reader';
import ProductCard from '@/components/ProductCard';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  // 1. 读取所有数据
  const allProducts = await reader.collections.products.all();
  
  // 2. 处理搜索参数
  const params = await searchParams;
  const searchQuery = params.search?.toLowerCase() || "";

  // 3. 过滤逻辑 (如果没有搜索词，就返回全部)
  const filteredProducts = allProducts.filter(product => {
     if (!searchQuery) return true; 
     return (
        product.entry.name.toLowerCase().includes(searchQuery) ||
        product.entry.category.toLowerCase().includes(searchQuery)
     );
  });

  // 4. 如果没有数据，且没有搜索词 -> 提示用户去后台添加
  if (allProducts.length === 0) {
      return (
        <div className="min-h-screen pt-32 px-4 text-center">
            <h1 className="text-2xl font-bold">暂无库存数据</h1>
            <p className="text-gray-500 mb-4">请确保你已经将 content/products 文件夹推送到 GitHub。</p>
            <Link href="/" className="text-primary underline">返回首页</Link>
        </div>
      );
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-12">
            <h1 className="text-4xl font-heading font-bold text-gray-900 uppercase mb-2">
                {searchQuery ? `搜索: "${searchQuery}"` : "全部库存"}
                <span className="text-gray-400 text-2xl font-light ml-2">
                    ({filteredProducts.length})
                </span>
            </h1>
            {searchQuery && (
                <Link href="/shop" className="text-primary underline mt-2 inline-block">清除搜索条件</Link>
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
        
        {/* 如果搜不到东西 */}
        {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-gray-500">
                没有找到匹配的设备。
            </div>
        )}

      </div>
    </main>
  );
}