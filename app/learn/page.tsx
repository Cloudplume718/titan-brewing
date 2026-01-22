import Link from 'next/link';
import { getPosts } from '@/lib/feishu';
import { ArrowLeft, Calendar, ExternalLink } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function LearnPage() {
  const posts = await getPosts();

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* 顶部导航 */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-500 hover:text-primary transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> 返回首页
          </Link>
          <h1 className="text-3xl font-heading font-bold text-gray-900">大山酿造学院</h1>
          <p className="text-gray-500 mt-2">分享酿造技术、开店经验与避坑指南</p>
        </div>

        {/* 文章列表 */}
        <div className="grid gap-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <a 
                key={post.id} 
                href={post.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100"
              >
                <div className="flex flex-col md:flex-row h-full">
                  {/* 封面图 */}
                  <div className="w-full md:w-64 h-48 md:h-auto bg-gray-200 shrink-0 relative overflow-hidden">
                    {post.coverUrl ? (
                      <img 
                        src={post.coverUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">暂无封面</div>
                    )}
                  </div>
                  
                  {/* 内容区 */}
                  <div className="p-6 flex flex-col justify-center flex-1">
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                      <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> {post.date}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2 text-sm leading-relaxed">
                      {post.desc || '暂无简介'}
                    </p>
                    <span className="mt-4 text-primary text-sm font-bold inline-block opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all">
                      阅读全文 →
                    </span>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
              <p className="text-gray-400">暂无文章，大山正在整理中...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}