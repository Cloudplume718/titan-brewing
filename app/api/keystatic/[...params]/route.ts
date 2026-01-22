import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// 👇 1. 定义你的凭证 (请再次确认这里粘贴的是正确的)
const myClientId = 'Ov23li3ONSUPSyi9O8OB';
const myClientSecret = '89c582c0d256d2771001cf63e8f5cc0041fc5dfa'; 

// 👇 2. 打印日志 (这是为了在 Vercel Logs 里看到真相)
console.log('--- Keystatic Debug ---');
console.log('Using Client ID:', myClientId);
console.log('Using Secret Length:', myClientSecret.length); // 看看长度对不对(通常是40位)
console.log('Secret First 3 chars:', myClientSecret.substring(0, 3)); // 看看开头对不对
console.log('-----------------------');

export const { GET, POST } = makeRouteHandler({
  config,
  clientId: myClientId,
  clientSecret: myClientSecret,
  secret: 'super_secret_session_key_123', // Session加密密钥
});