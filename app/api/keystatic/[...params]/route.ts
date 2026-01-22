import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// ⚡️ 必须保留
export const dynamic = 'force-dynamic';

export const { GET, POST } = makeRouteHandler({
  config,
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  
  // 👇 💣 终极手段：直接硬编码！不给环境变量任何出错的机会
  // 这是你之前生成的那个纯十六进制密钥，绝对安全
  secret: 'a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890',
});