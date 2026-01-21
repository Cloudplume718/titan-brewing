import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";

const query = `*[_type == "guide" && slug.current == $slug][0]{..., "videoUrl": videoUrl}`;

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
};

// ⚠️ 重点修改：富文本样式适配白底 (text-black, text-gray-700)
const ptComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null;
      return <div className="my-10"><img src={urlFor(value).url()} alt="插图" className="w-full h-auto rounded-sm shadow-lg" /></div>;
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl font-heading font-bold text-black mt-12 mb-6 uppercase">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl font-heading font-bold text-primary mt-12 mb-6 uppercase border-l-4 border-primary pl-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl font-bold text-black mt-8 mb-4">{children}</h3>,
    normal: ({ children }: any) => <p className="mb-6 leading-relaxed text-gray-700 text-lg">{children}</p>,
    blockquote: ({ children }: any) => <blockquote className="border-l-4 border-gray-300 pl-6 italic text-gray-500 my-8 bg-gray-50 p-6 rounded-r-sm">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-disc pl-5 mb-8 space-y-2 text-gray-700">{children}</ul>,
    number: ({ children }: any) => <ol className="list-decimal pl-5 mb-8 space-y-2 text-gray-700">{children}</ol>,
  },
};

interface PageProps { params: Promise<{ slug: string }>; }

export default async function GuideDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = await client.fetch(query, { slug });

  if (!guide) return <div className="text-center py-20 text-gray-500">文章未找到。</div>;
  const embedUrl = guide.videoUrl ? getYouTubeEmbedUrl(guide.videoUrl) : null;

  return (
    <article className="min-h-screen bg-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Link href="/learn" className="text-gray-500 hover:text-primary mb-8 inline-flex items-center gap-2 uppercase font-bold text-xs tracking-widest transition-colors">
            <ArrowLeft className="w-4 h-4" /> 返回学院
        </Link>

        <header className="mb-8 text-center border-b border-gray-100 pb-8">
            <p className="text-primary font-bold uppercase tracking-widest mb-4 inline-block bg-red-50 px-3 py-1 rounded-sm text-xs">
                {guide.category}
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-black font-bold uppercase mb-6 leading-tight">
                {guide.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-400 text-sm">
                <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {new Date(guide._createdAt).toLocaleDateString('zh-CN')}</span>
            </div>
        </header>

        {embedUrl ? (
          <div className="mb-12 aspect-video overflow-hidden rounded-sm bg-black shadow-xl relative">
             <iframe width="100%" height="100%" src={embedUrl} title="Video" frameBorder="0" allowFullScreen className="absolute inset-0"></iframe>
          </div>
        ) : guide.mainImage && (
            <div className="mb-12 aspect-video overflow-hidden rounded-sm shadow-xl">
                <img src={urlFor(guide.mainImage).url()} alt={guide.title} className="w-full h-full object-cover" />
            </div>
        )}

        {/* 正文 (使用适配后的 ptComponents) */}
        <div className="prose prose-lg prose-red max-w-none text-gray-700">
            <PortableText value={guide.body} components={ptComponents} />
        </div>
      </div>
    </article>
  );
}