import { config, fields, collection } from '@keystatic/core';

export default config({
  // 🟢 智能模式：本地开发用 local，线上用 github
  storage: process.env.NODE_ENV === 'development'
    ? { kind: 'local' }
    : {
        kind: 'github',
        // 🔴 务必确认这里是你的 "用户名/仓库名"
        repo: 'Cloudplume718/titan-brewing', 
      },
      
  collections: {
    // 📦 第一板块：设备库存
    products: collection({
      label: '设备库存',
      slugField: 'name',
      path: 'content/products/*',
      format: { contentField: 'content' },
      schema: {
        name: fields.slug({ name: { label: '设备名称' } }),
        price: fields.number({ 
            label: '价格 (填0或空则显示面议)',
            validation: { min: 0 }
        }),
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
        description: fields.text({ 
            label: '简短描述 (列表页显示)',
            multiline: true 
        }),
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

    // 🎓 第二板块：大山学院 (文章/教程)
    posts: collection({
      label: '大山学院',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '文章标题' } }),
        publishedDate: fields.date({ 
            label: '发布日期',
            defaultValue: { kind: 'today' } 
        }),
        coverImage: fields.image({
          label: '封面图片',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        excerpt: fields.text({
            label: '文章摘要 (显示在列表)',
            multiline: true
        }),
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
// 🟢 加一行注释：强制触发 Vercel 更新环境变量