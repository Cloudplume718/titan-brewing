import { NextRequest, NextResponse } from 'next/server';
import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

// 🔴 必填：请填入你最新的 ID 和 新密码
const CLIENT_ID = 'Ov23li3ONSUPSyi9O8OB';
const CLIENT_SECRET = 'de2493be82eb06f408caeb5dd6d262625d334d3e'; 

// 初始化 Keystatic
const { GET: keystaticGet, POST: keystaticPost } = makeRouteHandler({
  config,
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  secret: 'debug_session_secret_123',
});

// 拦截 GET 请求
export async function GET(req: NextRequest, context: any) {
  const url = new URL(req.url);
  
  // 🕵️ 侦测：如果是 GitHub 回调 (Callback) 阶段，我们拦截它！
  if (url.pathname.includes('/github/oauth/callback')) {
    const code = url.searchParams.get('code');
    
    if (code) {
      console.log('--- 🛑 DEBUG INTERCEPTOR START 🛑 ---');
      console.log('Received Code:', code);
      console.log('Exchanging with ID:', CLIENT_ID);
      
      // 🔥 手动向 GitHub 发起请求 (绕过 Keystatic)
      try {
        const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: code,
          }),
        });

        const tokenData = await tokenRes.json();
        console.log('GitHub Response:', tokenData);

        // 🚨 如果 GitHub 返回错误，直接把错误显示在浏览器上！
        if (tokenData.error) {
          return NextResponse.json({
            status: '❌ GitHub Refused Connection',
            error_code: tokenData.error,
            error_description: tokenData.error_description,
            error_uri: tokenData.error_uri,
            debug_info: {
              used_client_id: CLIENT_ID,
              used_secret_preview: CLIENT_SECRET ? CLIENT_SECRET.substring(0, 3) + '...' : 'EMPTY',
            }
          }, { status: 400 });
        }
        
        console.log('✅ Token received successfully! Passing to Keystatic...');
      } catch (e: any) {
        return NextResponse.json({ error: 'Fetch failed', details: e.message });
      }
    }
  }

  // 🟢 修复报错的关键点：
  // 我们强制把它转换成 any 类型，这样 TypeScript 就不会报“参数数量不对”的错误了
  // 实际上 Keystatic 运行时是需要这两个参数的
  return (keystaticGet as any)(req, context);
}

export const POST = keystaticPost;