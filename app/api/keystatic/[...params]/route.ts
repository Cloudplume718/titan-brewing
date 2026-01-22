import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

export const { GET, POST } = makeRouteHandler({
  config,
  // 👇 🔴 只有在这里手动填入，才能 100% 绕过 Vercel 的环境变量 BUG
  // 请去 GitHub 再复制一次 Secret，直接粘贴在引号里！
  clientId: 'Ov23li3ONSUPSyi9O8OB',
  clientSecret: '89c582c0d256d2771001cf63e8f5cc0041fc5dfa', 
  secret: 'yangqiou07189694',
});