import ProductCard from "@/components/ProductCard";
import HeroCarousel from "@/components/HeroCarousel";
import VideoModal from "@/components/VideoModal"; // 🟢 引入刚才拆出去的组件
import { reader } from "@/lib/reader"; // 🟢 引入读取器
import { ArrowRight, Warehouse, History, Handshake, PlayCircle } from "lucide-react";
import Link from "next/link";

// 1. 定义轮播图数据 (更新了稳定的图片链接)
const heroSlides = [
  {
    _id: '1',
    title: '山之欧瑞堡',
    subtitle: '专注二手精酿设备供应链',
    // 🍺 一张啤酒酿造设备的图
    image: '/images/banner4.jpg',
    buttonText: '了解更多'
  },
  {
    _id: '2',
    title: '大山严选',
    subtitle: '每一台设备都经过专业检测',
    // 🏭 一张工厂内部的图
    image: '/images/banner2.jpg',
    buttonText: '了解更多'
  },
   {
    _id: '3',
    title: '专业二手设备',
    subtitle: '提供完善教学经验支持',
    // 🏭 一张工厂内部的图
    image: '/images/banner3.jpg',
    buttonText: '了解更多'
  },
];


export default async function Home() {
  // 🟢 1. 从后台读取所有产品
  const allProducts = await reader.collections.products.all();
  // 🟢 2. 只取最新的 4 个显示在首页
  const recentProducts = allProducts.slice(0, 4);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      
      {/* 1. 顶部轮播图 */}
      <HeroCarousel slides={heroSlides} />

      {/* 2. 核心实力展示 */}
      <section className="max-w-7xl mx-auto px-4 my-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm hover:shadow-lg transition-shadow flex items-start gap-4">
                <div className="bg-red-50 p-4 rounded-full text-primary shrink-0"><History className="w-8 h-8" /></div>
                <div><h3 className="font-heading text-xl font-bold uppercase mb-2">15年行业深耕</h3><p className="text-gray-500 text-sm leading-relaxed">大山专注二手精酿设备15年，25年资深酿酒师经验，懂酒更懂设备。</p></div>
            </div>
            <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm hover:shadow-lg transition-shadow flex items-start gap-4">
                <div className="bg-red-50 p-4 rounded-full text-primary shrink-0"><Warehouse className="w-8 h-8" /></div>
                <div><h3 className="font-heading text-xl font-bold uppercase mb-2">1000平仓储中心</h3><p className="text-gray-500 text-sm leading-relaxed">聊城实体展厅，现货储备充足。100升到10吨设备应有尽有，欢迎实地考察。</p></div>
            </div>
            <div className="bg-white border border-gray-100 p-8 rounded-sm shadow-sm hover:shadow-lg transition-shadow flex items-start gap-4">
                <div className="bg-red-50 p-4 rounded-full text-primary shrink-0"><Handshake className="w-8 h-8" /></div>
                <div><h3 className="font-heading text-xl font-bold uppercase mb-2">全程技术扶持</h3><p className="text-gray-500 text-sm leading-relaxed">不仅卖设备，更教你酿酒。从安装调试到酿造配方，大山全程指导。</p></div>
            </div>
        </div>
      </section>

      {/* 3. 热门商品区 (真实数据) */}
      <section className="py-16 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
                <div className="w-12 h-1 bg-primary mb-4"></div>
                <h2 className="font-heading text-4xl text-black font-bold uppercase mb-2">
                    严选二手设备 <span className="text-gray-400 text-2xl font-light pl-2">Selected Gear</span>
                </h2>
                <p className="text-gray-500">高性价比，成色如新，品质保障。</p>
            </div>
            <Link href="/shop" className="group flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-sm hover:border-primary hover:text-primary transition-colors font-bold uppercase text-sm bg-white">
                查看全部库存 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 🟢 渲染真实数据 */}
            {recentProducts.length > 0 ? (
                recentProducts.map((product) => (
                <ProductCard 
                    key={product.slug} 
                    data={{
                        id: product.slug,
                        name: product.entry.name,
                        price: product.entry.price ?? 0,
                        category: product.entry.category,
                        image: product.entry.image || '' // 确保 image 存在
                    }} 
                />
                ))
            ) : (
                <div className="col-span-4 text-center py-10 text-gray-400">
                    暂无推荐设备，请去后台添加。
                </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. 大山学院 Banner + 视频组件 */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* 🟢 调用新拆分的视频组件 */}
            <VideoModal />

            <div>
                <p className="text-primary font-bold uppercase tracking-widest mb-2">技术扶持</p>
                <h2 className="font-heading text-4xl text-black font-bold uppercase mb-6 leading-tight">
                    大山教你酿好酒<br/>开店避坑指南
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    真诚做人，踏实做事。我是大山，25年酿酒经验毫无保留分享。不仅提供高性价比的二手设备，更提供烧烤店、酒吧整店输出方案，助你创业成功。
                </p>
                <div className="flex gap-4">
                    <Link href="/learn" className="bg-primary text-white font-bold py-3 px-8 rounded-sm hover:bg-red-700 transition-colors uppercase tracking-widest shadow-lg shadow-red-500/30">
                        进入大山学院
                    </Link>
                    <Link href="/about" className="border border-gray-300 text-gray-700 font-bold py-3 px-8 rounded-sm hover:border-black hover:text-black transition-colors uppercase tracking-widest">
                        联系大山
                    </Link>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}