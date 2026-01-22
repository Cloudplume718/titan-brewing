import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

export const dynamic = 'force-dynamic';

export const { GET, POST } = makeRouteHandler({
  config,
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  // 保持你刚才用的那个纯净的十六进制密钥
  secret: 'a1b2c3d4e5f67890abcdef1234567890abcdef1234567890abcdef1234567890',
});