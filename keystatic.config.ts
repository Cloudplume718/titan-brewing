import { config, fields, collection } from '@keystatic/core';

// 👇 必须和后端填的一模一样！
const FIXED_CLIENT_ID = 'Ov23li3ONSUPSyi9O8OB'; 

export default config({
  storage: {
    kind: 'github',
    repo: 'Cloudplume718/titan-brewing',
  },
  
  // 🟢 暴力写入 ID (配合最下面的 as any 使用)
  clientId: FIXED_CLIENT_ID,

  ui: {
    brand: { name: '欧瑞堡后台' },
  },
  
  collections: {
    // ... (请保留你之前的 products 和 posts 集合代码，这里省略是为了节省篇幅)
    products: collection({
      label: '设备库存',
      slugField: 'name',
      path: 'content/products/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: '设备名称' } }),
        price: fields.number({ label: '价格', validation: { min: 0 } }),
        category: fields.select({
           label: '分类',
           options: [
             { label: '发酵罐', value: '发酵罐' },
             { label: '糖化设备', value: '糖化设备' },
             { label: '制冷系统', value: '制冷系统' },
             { label: '包装/灌装', value: '包装设备' },
             { label: '整店打包', value: '整店打包' },
             { label: '其他配件', value: '其他' },
           ],
           defaultValue: '发酵罐',
         }),
        image: fields.image({
          label: '设备图片',
          directory: 'public/images/products',
          publicPath: '/images/products/',
        }),
        description: fields.text({ label: '简短描述', multiline: true }),
        content: fields.document({
          label: '详细介绍',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/products',
            publicPath: '/images/products/',
          },
        }),
      },
    }),
    posts: collection({
      label: '大山学院',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '文章标题' } }),
        publishedDate: fields.date({ label: '发布日期', defaultValue: { kind: 'today' } }),
        coverImage: fields.image({
          label: '封面图片',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        excerpt: fields.text({ label: '文章摘要', multiline: true }),
        content: fields.document({
          label: '文章正文',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/posts',
            publicPath: '/images/posts/',
          },
        }),
      },
    }),
  },
} as any); // 👈 这一行是关键！加上 as any 就可以强行写入 clientId 而不报错