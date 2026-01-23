import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/feishu';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await getProducts();
    
    // 简单的清洗一下数据
    const cleanProducts = products.map(p => ({
      id: p.id,
      name: p.name || '未命名',
      price: isNaN(Number(p.price)) ? 0 : Number(p.price),
      category: p.category || '未分类',
      imageUrl: p.imageUrl || ''
    }));

    return NextResponse.json(cleanProducts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}