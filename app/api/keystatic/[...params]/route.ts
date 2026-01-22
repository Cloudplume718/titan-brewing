import { NextRequest, NextResponse } from 'next/server';
import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

export const dynamic = 'force-dynamic';

// 初始化原版 Keystatic 处理器（作为备用）
const keystaticHandler = makeRouteHandler({
  config,
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: process.env.KEYSTATIC_SECRET,
});

export async function GET(req: NextRequest, context: any) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  // 🕵️‍♂️ 侦探逻辑：如果是回调请求，先拦截下来问问 GitHub 到底怎么回事
  if (url.pathname.includes('oauth/callback') && code) {
    console.log('--- 🛑 开始手动诊断 GitHub 响应 ---');
    
    const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
    const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      console.error('❌ 致命错误：环境变量缺失！');
      return NextResponse.json({ error: 'Env Missing' }, { status: 500 });
    }

    try {
      // 🔥 手动向 GitHub 发起询问
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json', // 强制要求 JSON 格式
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: code,
        }),
      });

      const data = await tokenRes.json();
      
      // 🖨️ 把 GitHub 的心里话打印出来！
      console.log('📨 GitHub 原始响应:', JSON.stringify(data, null, 2));

      // 如果有错，直接在日志里标记出来
      if (data.error) {
        console.error('❌ GitHub 拒绝原因:', data.error_description);
      } else if (data.access_token) {
        console.log('✅ GitHub 验证通过！Token 已拿到（说明 ID/Secret 是对的）');
        console.log('🤔 既然这一步对了，那问题肯定出在 Session 加密上');
      }

    } catch (e: any) {
      console.error('❌ 网络请求炸了:', e.message);
    }
    console.log('--- 🛑 诊断结束 ---');
  }

  // 继续让 Keystatic 跑（虽然 code 已经被消耗，可能会报错，但我们只看上面的日志）
  return (keystaticHandler.GET as any)(req, context);
}

export const POST = keystaticHandler.POST;