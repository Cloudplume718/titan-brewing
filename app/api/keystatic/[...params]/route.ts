import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

export const { GET, POST } = makeRouteHandler({
  config,
  // 👇 🔴 请直接在这里填入你的 GitHub 信息！
  // 这样就能 100% 绕过 Vercel 环境变量的 BUG
  
  clientId: 'Ov23li3ONSUPSyi9O8OB', 
  
  // ⚠️ 警告：下面这个引号里，请去 GitHub 复制你最新的 Secret 粘贴进来！
  clientSecret: '89c582c0d256d2771001cf63e8f5cc0041fc5dfa', 
  
  // 这个乱码是用来加密登录状态的，随便写
  secret: 'yangqiou07189694',
});