import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, User, Mail, Settings, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 主要内容区：4列布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 第1列：联系我们 */}
          <div>
            <h3 className="font-heading font-bold text-lg text-gray-900 mb-6">联系我们</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  聊城东昌府区北区街道兴农路<br />周公河国际商贸城
                </span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <User className="w-5 h-5 text-primary shrink-0" />
                <span>联系人：大山(杨)</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:13475708779" className="hover:text-primary transition-colors font-bold text-lg">
                  134-7570-8779
                </a>
              </li>
              {/* 🟢 新增：邮箱地址 */}
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:260538288@qq.com" className="hover:text-primary transition-colors">
                  260538288@qq.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Settings className="w-5 h-5 text-primary shrink-0" />
                <span>服务：设备 / 原料 / 技术</span>
              </li>
            </ul>
          </div>

          {/* 第2列：主营业务 */}
          <div>
            <h3 className="font-heading font-bold text-lg text-gray-900 mb-6">主营业务</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <Link href="/shop" className="hover:text-primary transition-colors">
                  二手啤酒设备 (100L - 10吨)
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span>精酿啤酒原料供应</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <Link href="/learn" className="hover:text-primary transition-colors">
                  整店输出 / 技术扶持
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span>设备回收与置换</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <Link href="/learn" className="hover:text-primary transition-colors">
                  优质低价灌装机 / 灌桶机
                </Link>
              </li>
            </ul>
          </div>

          {/* 第3列：适用场景 */}
          <div>
            <h3 className="font-heading font-bold text-lg text-gray-900 mb-6">适用场景</h3>
            <div className="grid grid-cols-1 gap-3 text-gray-600">
              {['烧烤店 / 火锅店 / 自助餐', '精酿啤酒屋 / 酒吧', '小型 / 大型啤酒厂', '院校教学实训设备'].map((item, index) => (
                <div key={index} className="flex items-center gap-2 group">
                   <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                   <span className="group-hover:text-gray-900 transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 第4列：品牌介绍 */}
          <div>
            <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 relative">
                    <Image src="/icon.svg" alt="Logo" fill className="object-contain" />
                </div>
                <h3 className="font-heading font-bold text-xl uppercase tracking-tighter">OURUIBAO</h3>
            </div>
            <p className="text-gray-500 leading-relaxed mb-6">
              聊城山之欧瑞堡机械设备有限公司。拥有1000多平仓储运营中心，专注二手精酿设备15年，服务国内外上千家客户。
            </p>
            <div className="bg-primary/5 border border-primary/10 p-4 rounded-sm">
                <p className="text-primary font-bold text-md">
                    真诚做人，踏实做事，选择大山靠谱。
                </p>
            </div>
          </div>

        </div>

        {/* 底部版权栏 */}
        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} 聊城山之欧瑞堡机械设备有限公司. All rights reserved.</p>
          <div className="flex gap-6">
             <Link href="#" className="hover:text-gray-600">隐私政策</Link>
             <Link href="#" className="hover:text-gray-600">服务条款</Link>
             {/* <a href="https://beian.miit.gov.cn/" target="_blank" className="hover:text-gray-600">鲁ICP备xxxxxxxx号</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}