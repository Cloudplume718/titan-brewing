import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// 🟢 这一步是决胜关键！
// 请把刚才那个证明有效的【新密码】填在下面
const CLIENT_ID = 'Ov23li3ONSUPSyi9O8OB';
const CLIENT_SECRET = 'f53e758c91981f1d643c205e8b5cdc5a63b29011'; 

// 👇 纯净版配置，没有任何拦截逻辑
export const { GET, POST } = makeRouteHandler({
  config,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  secret: 'final_check_session_secret_123', // 随便写
});