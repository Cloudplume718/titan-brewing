import { client, urlFor } from "@/lib/sanity";
import { BookOpen, FlaskConical, PlayCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const query = `*[_type == "guide"] | order(_createdAt desc)`;

const getIcon = (category: string) => {
  if (category === '经典配方') return <FlaskConical className="w-10 h-10 text-primary mb-4" />;
  if (category === '视频教程') return <PlayCircle className="w-10 h-10 text-primary mb-4" />;
  return <BookOpen className="w-10 h-10 text-primary mb-4" />;
};

export default async function LearnPage() {
  const guides = await client.fetch(query);

  return (
    <div className="min-h-screen bg-white text-gray-900 py-16 pt-40">
      <div className="max-w-7xl mx-auto px-4">
        {/* 头部 */}
        <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="font-heading text-5xl font-bold uppercase mb-4 text-black">酿造学院</h1>
            <p className="text-gray-500 text-lg">知识就是力量，更是好酒的源泉。<br/>从入门技巧到大师配方，这里应有尽有。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guides.length > 0 ? (
            guides.map((guide: any) => {
                if (!guide.slug || !guide.slug.current) return null;
                return (
                  <Link 
                    href={`/learn/${guide.slug.current}`}
                    key={guide._id} 
                    className="bg-white border border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300 group block rounded-sm overflow-hidden flex flex-col h-full"
                  >
                    {/* 封面图 */}
                    <div className="h-56 overflow-hidden bg-gray-100 relative">
                        {guide.mainImage ? (
                             <img src={urlFor(guide.mainImage).url()} alt={guide.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                             <div className="flex items-center justify-center h-full bg-gray-50">{getIcon(guide.category)}</div>
                        )}
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase text-black rounded-sm shadow-sm">
                            {guide.category}
                        </div>
                    </div>
                    
                    {/* 内容 */}
                    <div className="p-8 flex flex-col flex-1">
                        <h3 className="font-heading text-2xl font-bold uppercase mb-3 text-black group-hover:text-primary transition-colors line-clamp-2">
                            {guide.title}
                        </h3>
                        <p className="text-gray-500 mb-6 line-clamp-3 text-sm leading-relaxed">
                            {guide.excerpt}
                        </p>
                        
                        <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between text-sm">
                            <span className="text-gray-400 font-medium">阅读详情</span>
                            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                  </Link>
                )
            })
          ) : (
            <p className="text-center col-span-full text-gray-500">暂无教程，请去后台发布。</p>
          )}
        </div>
      </div>
    </div>
  );
}