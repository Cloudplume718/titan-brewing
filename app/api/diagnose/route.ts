import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // 强制实时检查，不使用缓存

export async function GET(request: Request) {
  // 1. 获取所有关键变量
  const serverId = process.env.KEYSTATIC_GITHUB_CLIENT_ID || '';
  const publicId = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID || '';
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET || '';
  const sessionSecret = process.env.KEYSTATIC_SECRET || '';
  
  // 2. 获取当前请求的域名（判断回调地址是否匹配）
  const host = request.headers.get('host') || '';
  const protocol = host.includes('localhost') ? 'http' : 'https';
  const callbackUrl = `${protocol}://${host}/api/keystatic/github/oauth/callback`;

  // 3. 诊断逻辑
  const checks = {
    // 检查1: ID 是否一致
    ids_match: serverId === publicId,
    
    // 检查2: 变量是否都有值
    has_server_id: !!serverId,
    has_public_id: !!publicId,
    has_client_secret: !!clientSecret,
    has_session_secret: !!sessionSecret,
    
    // 检查3: 格式检查 (GitHub Client ID 通常是 20 位)
    id_length_valid: serverId.length === 20,
    
    // 检查4: 密钥是否有隐形空格 (常见死因)
    secret_clean: clientSecret.trim() === clientSecret,
    id_clean: serverId.trim() === serverId,
  };

  // 4. 生成一个“原生”的 GitHub 登录链接
  // 这用于测试：如果不通过 Keystatic，直接去 GitHub 能不能行？
  const manualTestLink = `https://github.com/login/oauth/authorize?client_id=${serverId}&redirect_uri=${encodeURIComponent(callbackUrl)}&scope=repo,user`;

  return NextResponse.json({
    status: 'Diagnostic Report',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks: {
      ...checks,
      status: Object.values(checks).every(Boolean) ? '✅ PASS' : '❌ FAIL',
    },
    details: {
      server_id_preview: serverId ? `${serverId.substring(0, 5)}...` : 'MISSING',
      public_id_preview: publicId ? `${publicId.substring(0, 5)}...` : 'MISSING',
      // 只显示 Secret 的长度，安全起见
      secret_length: clientSecret.length,
      current_host: host,
      expected_callback: callbackUrl,
    },
    // 👇这是最重要的工具
    manual_login_test: manualTestLink
  }, { status: 200 });
}