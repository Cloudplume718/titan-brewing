import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// ⚡️ 核心关键点 1：强制动态模式
// 这行代码能解决 Vercel 把 API 错误缓存为静态文件的问题，是解决 401 的第一杀招
export const dynamic = 'force-dynamic';

// 🔍 核心关键点 2：环境变量校验
// 在代码运行时实时检查，如果缺变量直接在 Vercel 日志里报错，而不是静默失败
const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
const secret = process.env.KEYSTATIC_SECRET;

if (!clientId || !clientSecret || !secret) {
  console.error('❌ [Keystatic Fatal Error] 环境变量缺失！');
  console.error('请检查 Vercel 后台设置：KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET');
}

// 🛡️ 核心关键点 3：使用新版处理器
export const { GET, POST } = makeRouteHandler({
  config,
  clientId: clientId || '',
  clientSecret: clientSecret || '',
  secret: secret || '',
});