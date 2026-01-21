import Link from "next/link";
import { MapPin, Phone, Mail, User, Beer } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-600 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          
          {/* 1. 联系我们 */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-lg">联系我们</h4>
            <ul className="space-y-5 text-base">
              <li className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-gray-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  聊城东昌府区北区街道兴农路<br/>周公河国际商贸城
                </span>
              </li>
              <li className="flex items-center gap-4">
                <User className="w-6 h-6 text-gray-400 shrink-0" />
                <span>联系人：大山 (资深酿酒师)</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-gray-400 shrink-0" />
                <span className="text-gray-900 font-medium text-xl">134-7570-8779</span>
              </li>
              <li className="flex items-center gap-4">
                <Beer className="w-6 h-6 text-gray-400 shrink-0" />
                <span>服务：设备 / 原料 / 技术</span>
              </li>
            </ul>
          </div>

          {/* 2. 主营业务 (根据你的描述修改) */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-lg">主营业务</h4>
            <ul className="space-y-5 text-base">
              <li><Link href="/shop" className="hover:text-primary transition-colors block">二手啤酒设备 (100L - 10吨)</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors block">精酿啤酒原料供应</Link></li>
              <li><Link href="/learn" className="hover:text-primary transition-colors block">整店输出 / 技术扶持</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors block">设备回收与置换</Link></li>
            </ul>
          </div>

          {/* 3. 适用场景 (新增板块) */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-lg">适用场景</h4>
            <ul className="space-y-5 text-base">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> 烧烤店 / 火锅店 / 自助餐</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> 精酿啤酒屋 / 酒吧</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> 小型 / 大型啤酒厂</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> 院校教学实训设备</li>
            </ul>
          </div>

           {/* 4. 关于公司 */}
           <div>
             <h4 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-lg">关于山之欧瑞堡</h4>
             <p className="text-base leading-relaxed text-gray-600 mb-4">
              聊城山之欧瑞堡机械设备有限公司。拥有1000多平仓储运营中心，专注二手精酿设备15年，服务国内外上千家客户。
            </p>
            <p className="font-bold text-primary">真诚做人，踏实做事，选择大山靠谱。</p>
          </div>

        </div>
      </div>

      <div className="bg-gray-100 border-t border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2026 聊城山之欧瑞堡机械设备有限公司. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
             <span>技术支持: 大山团队</span>
          </div>
        </div>
      </div>
    </footer>
  );
}