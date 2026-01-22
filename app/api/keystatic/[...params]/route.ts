import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// ⚡️ 必须保留：防止 Vercel 缓存登录状态
export const dynamic = 'force-dynamic';

export const { GET, POST } = makeRouteHandler({
  config,
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  // 👇 这里读取你刚刚改过的那个纯字母数字的新密钥
  secret: process.env.KEYSTATIC_SECRET,
});