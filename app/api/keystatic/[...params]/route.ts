import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

export const { GET, POST } = makeRouteHandler({
  config,
  // 👇 再次检查：必须和 config 文件里那个 ID 一字不差
  clientId: 'Ov23li3ONSUPSyi9O8OB',
  
  // 👇 你的最新密码
  clientSecret: 'f53e758c91981f1d643c205e8b5cdc5a63b29011', 
  
  secret: 'final_sync_check_123',
});