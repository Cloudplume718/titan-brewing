import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// 👇👇👇 必须加这一行！这是解决 Vercel 401/Authorization failed 的终极杀招
export const dynamic = 'force-dynamic';

export const { GET, POST } = makeRouteHandler({
  config,
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: process.env.KEYSTATIC_SECRET,
});