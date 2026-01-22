'use client'

import { useState } from 'react';
import ProductCard from "@/components/ProductCard";
import { Package, Search } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
}

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProducts = initialProducts.filter(product => {
    // 🟢 修复点：加了 || '' 保护
    // 如果 name 或 category 是空的，就用空字符串代替，防止报错
    const productName = product.name || '';
    const productCategory = product.category || '';
    
    return productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           productCategory.includes(searchTerm);
  });

  return (
    <>
      {/* 顶部 Header & 搜索框 */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold text-gray-900 uppercase">
                全部设备库存 <span className="text-gray-400 text-xl font-light pl-2">Inventory</span>
              </h1>
              <p className="text-gray-500 mt-2 flex items-center gap-2">
                <Package className="w-4 h-4" />
                当前共有 <span className="text-primary font-bold">{filteredProducts.length}</span> 台在售设备
              </p>
            </div>
            
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="搜索设备名称..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent rounded-full text-sm transition-all outline-none"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* 产品列表区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                data={{
                  id: product.id, 
                  name: product.name || '未命名设备', // 这里也加个保护
                  price: product.price,
                  category: product.category || '未分类',
                  image: product.imageUrl, 
                }}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-lg border border-dashed border-gray-300">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">未找到相关设备</h3>
            <p className="text-gray-500 mt-1">换个关键词试试？</p>
          </div>
        )}
      </div>
    </>
  );
}