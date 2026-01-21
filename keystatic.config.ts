import { config, fields, collection } from '@keystatic/core';

export default config({
  // 🟢 智能存储模式：本地开发用 local，上线后用 github
storage: { kind: 'local' },

  // ☁️ 云端配置 (保持不变)
  cloud: {
    project: 'dashan-website',
  },

  collections: {
    // 1. 📦 设备库存管理
    products: collection({
      label: '设备库存',
      slugField: 'name',
      path: 'content/products/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: '设备名称' } }),
        price: fields.number({ 
            label: '价格 (元)',
            validation: { min: 0 },
            description: '输入数字即可，前台会自动加 ¥ 符号'
        }),
        category: fields.select({
          label: '设备分类',
          options: [
            { label: '发酵罐', value: '发酵罐' },
            { label: '糖化锅', value: '糖化锅' },
            { label: '整套系统', value: '整套系统' },
            { label: '配件/原料', value: '配件' },
          ],
          defaultValue: '发酵罐',
        }),
        image: fields.image({
          label: '设备实拍图',
          directory: 'public/images/products',
          publicPath: '/images/products/',
        }),
        description: fields.text({ 
            label: '设备描述', 
            multiline: true 
        }),
      },
    }),

    // 2. 🎓 大山学院文章
    guides: collection({
      label: '大山学院',
      slugField: 'title',
      path: 'content/guides/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: '文章标题' } }),
        publishedDate: fields.date({ label: '发布日期' }),
        coverImage: fields.image({
            label: '封面图',
            directory: 'public/images/guides',
            publicPath: '/images/guides/',
        }),
        content: fields.document({
          label: '正文内容',
          formatting: true,
          dividers: true,
          links: true,
          images: {
             directory: 'public/images/guides/content',
             publicPath: '/images/guides/content/',
          },
        }),
      },
    }),
  },
});