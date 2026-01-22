import * as lark from '@larksuiteoapi/node-sdk';

const client = new lark.Client({
  appId: process.env.FEISHU_APP_ID!,
  appSecret: process.env.FEISHU_APP_SECRET!,
});

// --- 类型定义 ---
export interface FeishuProduct {
  id: string;
  name: string;
  price: number | string;
  category: string;
  desc: string;
  imageUrl: string;
}

export interface FeishuPost {
  id: string;
  title: string;
  desc: string;
  date: string;
  coverUrl: string;
  link: string;
}

// 1. 获取产品列表 (使用原来的 APP_TOKEN)
export async function getProducts(): Promise<FeishuProduct[]> {
  try {
    const res = await client.bitable.appTableRecord.list({
      path: {
        app_token: process.env.FEISHU_APP_TOKEN!, // 👈 产品库 ID
        table_id: process.env.FEISHU_TABLE_ID!,
      },
      params: { page_size: 100 },
    });
    if (!res.data?.items) return [];

    return res.data.items.map((item) => {
      const fields = item.fields as any;
      const imageToken = fields.image?.[0]?.file_token || null;
      return {
        id: item.record_id!,
        name: fields.name as string,
        price: fields.price,
        category: fields.category as string,
        desc: fields.desc as string,
        imageUrl: imageToken ? `/api/image?token=${imageToken}` : '', 
      };
    });
  } catch (e) {
    console.error('获取产品列表失败:', e);
    return [];
  }
}

// 2. 获取单个产品 (使用原来的 APP_TOKEN)
export async function getProduct(id: string): Promise<FeishuProduct | null> {
  try {
    const res = await client.bitable.appTableRecord.get({
      path: {
        app_token: process.env.FEISHU_APP_TOKEN!, // 👈 产品库 ID
        table_id: process.env.FEISHU_TABLE_ID!,
        record_id: id,
      },
    });
    if (!res.data?.record) return null;
    const fields = res.data.record.fields as any;
    const imageToken = fields.image?.[0]?.file_token || null;
    return {
      id: res.data.record.record_id!,
      name: fields.name as string,
      price: fields.price,
      category: fields.category as string,
      desc: fields.desc as string,
      imageUrl: imageToken ? `/api/image?token=${imageToken}` : '',
    };
  } catch (e) {
    console.error(`获取产品 ${id} 失败:`, e);
    return null;
  }
}

// 🟢 3. 获取文章列表 (切换为新的 POSTS_APP_TOKEN)
export async function getPosts(): Promise<FeishuPost[]> {
  try {
    const res = await client.bitable.appTableRecord.list({
      path: {
        // 👇 关键修改：这里要用新的文章库 App Token
        app_token: process.env.FEISHU_POSTS_APP_TOKEN!, 
        table_id: process.env.FEISHU_POSTS_TABLE_ID!, 
      },
      params: { 
        page_size: 50,
        sort: '["date DESC"]' 
      },
    });

    if (!res.data?.items) return [];

    return res.data.items.map((item) => {
      const fields = item.fields as any;
      const coverToken = fields.cover?.[0]?.file_token || null;
      
      let dateStr = '';
      if (fields.date) {
        const dateObj = new Date(fields.date);
        dateStr = dateObj.toISOString().split('T')[0];
      }

      return {
        id: item.record_id!,
        title: fields.title as string,
        date: dateStr,
        desc: fields.desc as string,
        link: fields.link?.link || '#', 
        coverUrl: coverToken ? `/api/image?token=${coverToken}` : '', 
      };
    });
  } catch (e) {
    console.error('获取文章失败:', e);
    return [];
  }
}