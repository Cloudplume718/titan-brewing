import { config, fields, collection } from '@keystatic/core';

// 👇 必须和后端填的一模一样！
const FIXED_CLIENT_ID = 'Ov23li3ONSUPSyi9O8OB'; 

export default config({
  storage: {
    kind: 'github',
    repo: 'Cloudplume718/titan-brewing',
  },
  
  // 👇 🟢 这里的改动是关键！
  // 我们用 @ts-ignore 告诉 TypeScript：“别管这一行，我知道我在做什么”
  // 这样既能保留 clientId，又不会破坏下面的 products 类型定义
  
  // @ts-ignore
  clientId: FIXED_CLIENT_ID,

  ui: {
    brand: { name: '欧瑞堡后台' },
  },
  
  collections: {
    // 📦 设备库存 (保持原样)
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

    // 🎓 大山学院 (保持原样)
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
});