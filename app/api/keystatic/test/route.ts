import { NextResponse } from 'next/server';

// ⚡️ 强制动态：这是为了测试 Vercel 到底有没有执行动态逻辑
export const dynamic = 'force-dynamic';

export async function GET() {
  const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  const sessionSecret = process.env.KEYSTATIC_SECRET;

  return NextResponse.json({
    status: '🕵️ Keystatic 诊断报告',
    
    // 1. 缓存检测：刷新页面，这个时间必须每次都变！
    // 如果时间不变，说明 Vercel 还是把你当静态页面缓存了
    server_time: new Date().toISOString(),
    
    // 2. 环境变量检查 (只显示前几位，安全)
    env_check: {
      has_client_id: !!clientId,
      client_id_preview: clientId ? clientId.slice(0, 5) + '...' : '❌ 丢失',
      
      has_client_secret: !!clientSecret,
      client_secret_length: clientSecret ? clientSecret.length : 0, // 正常应该是 40
      
      has_session_secret: !!sessionSecret,
      session_secret_valid: sessionSecret && sessionSecret.length >= 32, // 必须够长
    },
    
    // 3. 配置一致性检查
    config_check: {
      // 检查这里的 ID 是否和你 GitHub 后台的一致
      is_id_correct: clientId === 'Ov23li3ONSUPSyi9O8OB', 
    }
  });
}