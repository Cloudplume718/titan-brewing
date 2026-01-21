import { Target, Users, History, Award, ThumbsUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 pt-32">
      
      {/* 1. 顶部 Header */}
      <div className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-primary font-bold uppercase tracking-widest mb-4">Since 2009</p>
            <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase mb-6 text-black tracking-tight">
              大山精酿 · 欧瑞堡
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
              真诚做人，踏实做事，选择大山靠谱。
            </p>
        </div>
      </div>

      {/* 2. 品牌故事 */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* 左侧文字 */}
            <div className="space-y-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Users className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-heading font-bold uppercase text-black">我是大山</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        大家好，我是大山。一名拥有25年经验的资深酿酒师，也是在这个行业摸爬滚打了15年的设备人。我深知每一位创业者的不易，设备不仅要好用，更要性价比高。
                    </p>
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Award className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-heading font-bold uppercase text-black">我们的实力</h2>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        我们在聊城拥有1000多平的仓储运营中心，常年储备大量优质二手啤酒设备。服务过国内外上千家烧烤店、酒吧、火锅店和精酿啤酒屋。我们不玩虚的，只做实实在在的生意。
                    </p>
                </div>
            </div>

            {/* 右侧图片 */}
            <div className="relative h-[500px] bg-gray-100 rounded-sm overflow-hidden shadow-2xl">
                <img 
                    src='/images/changfang.jpg' 
                    alt="Warehouse" 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                 {/* 模拟一张大山的照片或者仓库照片 */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 text-center">
                    <p className="font-bold">聊城 1000平米 实体仓储中心</p>
                </div>
            </div>
        </div>
      </div>

      {/* 3. 数据统计条 */}
      <div className="bg-primary py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
                <div className="text-4xl font-heading font-bold mb-2">25年</div>
                <div className="text-sm uppercase tracking-wider opacity-80">酿酒经验</div>
            </div>
            <div>
                <div className="text-4xl font-heading font-bold mb-2">15年</div>
                <div className="text-sm uppercase tracking-wider opacity-80">设备行业深耕</div>
            </div>
            <div>
                <div className="text-4xl font-heading font-bold mb-2">1000+</div>
                <div className="text-sm uppercase tracking-wider opacity-80">服务客户</div>
            </div>
            <div>
                <div className="text-4xl font-heading font-bold mb-2">1000㎡</div>
                <div className="text-sm uppercase tracking-wider opacity-80">仓储中心</div>
            </div>
        </div>
      </div>

      {/* 4. 底部 Slogan */}
      <div className="py-20 bg-gray-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center px-4">
            <ThumbsUp className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="font-heading text-3xl font-bold uppercase mb-6 text-black">选择大山，创业无忧</h2>
            <p className="text-gray-600 mb-8 text-lg">
                无论你是想开一家小酒馆，还是大型啤酒厂，大山都能为你提供最合适的解决方案。
            </p>
            <button className="bg-black text-white font-bold py-3 px-8 rounded-sm hover:bg-primary transition-colors">
                拨打 134-7570-8779
            </button>
        </div>
      </div>
    </div>
  );
}