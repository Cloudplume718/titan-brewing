import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// ⚡️ 强制动态，防止缓存
export const dynamic = 'force-dynamic';

export async function GET(req: Request, context: any) {
  // 🔍 1. 植入计数器逻辑
  const requestId = Math.random().toString(36).substring(7);
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  // 只在回调阶段（Callback）且有 code 时才打印，避免日志刷屏
  if (url.pathname.includes('oauth/callback') && code) {
    console.log(`[${requestId}] 🛑 收到回调请求！Code前5位: ${code.substring(0, 5)}`);
    console.log(`[${requestId}] 🕵️ 检查 Code 是否被复用...`);
  }

  // 🛠️ 2. 初始化 Keystatic 处理器
  const handler = makeRouteHandler({
    config,
    clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    secret: process.env.KEYSTATIC_SECRET,
  });

  // 💉 3. 修复报错的关键点：加了 (as any)
  // 告诉 TypeScript：“别管参数数量了，照我说的做”
  return (handler.GET as any)(req, context);
}

// POST 请求直接透传，不需要监控
export const POST = makeRouteHandler({
  config,
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: process.env.KEYSTATIC_SECRET,
}).POST;