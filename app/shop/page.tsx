import Link from 'next/link';
import { reader } from '@/lib/reader';
import ProductCard from '@/components/ProductCard';

export default async function ShopPage() {
  // 1. 读取所有设备
  const products = await reader.collections.products.all();

  // 2. 空状态提示
  if (!products || products.length === 0) {
    return (
      <div className="min-h-screen pt-32 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-heading font-bold mb-4">设备展厅</h1>
        <p className="text-gray-500">暂时还没有上架设备，请去后台添加几台吧！</p>
        <Link href="/keystatic" className="mt-8 inline-block bg-primary text-white px-6 py-2 rounded-sm">
          去后台添加
        </Link>
      </div>
    );
  }

  // 3. 正常显示
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-12">
            <h1 className="text-4xl font-heading font-bold text-gray-900 uppercase mb-2">
                全部库存 <span className="text-gray-400 text-2xl font-light">({products.length})</span>
            </h1>
            <p className="text-gray-500">大山严选，品质保证。所有设备均在聊城仓库，欢迎实地考察。</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.slug} 
              data={{
                id: product.slug, 
                name: product.entry.name,
                
                // 🟢 修复点：加了 ?? 0
                // 意思是：如果价格是 null (没填)，就用 0 代替，消除报错
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