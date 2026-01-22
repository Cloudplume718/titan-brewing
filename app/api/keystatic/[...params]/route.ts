import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

export const { GET, POST } = makeRouteHandler({
  config,
  // 1. 确保 ID 和 GitHub 后台一致
  clientId: 'Ov23li3ONSUPSyi9O8OB',
  
  // 2. 确保 Secret 是你刚刚在 GitHub 生成的那个新的 (不要填中文!)
  clientSecret: 'de2493be82eb06f408caeb5dd6d262625d334d3e', 
  
  // 3. 🚨 关键嫌疑人：这里必须填入刚才生成的“强壮密钥”
  // 以前那个随便写的单词可能因为安全性不够被拒绝了
  secret: 'k9QZ/2lqJ8w5x4Gt+rN0m1vP3yX7dE8fA4bH2jL5nMs=', 
});