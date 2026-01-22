import * as lark from '@larksuiteoapi/node-sdk';

// 🛠️ 强力清洗函数：去除所有空格、换行、不可见字符
const clean = (str: string | undefined) => {
  if (!str) return '';
  return str.replace(/\s+/g, ''); // 把所有空格和换行符统统删掉
};

// 🔍 调试日志：看看你的 ID 到底长什么样
console.log("--- 飞书配置检查 ---");
console.log(`APP_ID:     "${process.env.FEISHU_APP_ID}" (长度: ${process.env.FEISHU_APP_ID?.length})`);
console.log(`APP_TOKEN:  "${process.env.FEISHU_APP_TOKEN}" (长度: ${process.env.FEISHU_APP_TOKEN?.length})`);
console.log(`TABLE_ID:   "${process.env.FEISHU_TABLE_ID}" (长度: ${process.env.FEISHU_TABLE_ID?.length})`);
console.log("--- 清洗后 ---");
console.log(`APP_ID:     "${clean(process.env.FEISHU_APP_ID)}"`);
console.log("-------------------");

// 初始化飞书客户端 (使用清洗后的 ID)
const client = new lark.Client({
  appId: clean(process.env.FEISHU_APP_ID),
  appSecret: clean(process.env.FEISHU_APP_SECRET),
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

// 1. 获取产品列表
export async function getProducts(): Promise<FeishuProduct[]> {
  try {
    const appToken = clean(process.env.FEISHU_APP_TOKEN);
    const tableId = clean(process.env.FEISHU_TABLE_ID);

    if (!appToken || !tableId) {
      console.error("❌ 错误: 产品库 APP_TOKEN 或 TABLE_ID 为空！请检查 .env.local");
      return [];
    }

    const res = await client.bitable.appTableRecord.list({
      path: {
        app_token: appToken,
        table_id: tableId,
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
    console.error('❌ 获取产品列表失败 (请检查上方 ID 是否有误):', e);
    return [];
  }
}

// 2. 获取单个产品
export async function getProduct(id: string): Promise<FeishuProduct | null> {
  try {
    const res = await client.bitable.appTableRecord.get({
      path: {
        app_token: clean(process.env.FEISHU_APP_TOKEN),
        table_id: clean(process.env.FEISHU_TABLE_ID),
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
    console.error(`❌ 获取产品 ${id} 失败:`, e);
    return null;
  }
}

// 3. 获取文章列表
export async function getPosts(): Promise<FeishuPost[]> {
  try {
    const appToken = clean(process.env.FEISHU_POSTS_APP_TOKEN);
    const tableId = clean(process.env.FEISHU_POSTS_TABLE_ID);

    if (!appToken || !tableId) {
       console.warn("⚠️ 警告: 文章库配置为空，跳过加载文章。");
       return [];
    }

    const res = await client.bitable.appTableRecord.list({
      path: {
        app_token: appToken, 
        table_id: tableId, 
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
    console.error('❌ 获取文章失败:', e);
    return [];
  }
}

export const feishuClient = client;