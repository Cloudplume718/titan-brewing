import { NextResponse } from 'next/server';

export async function GET() {
  // 获取关键变量（我们只看头尾，不显示完整密码，安全第一）
  const id = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
  const secret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;
  const sessionSecret = process.env.KEYSTATIC_SECRET;

  return NextResponse.json({
    status: 'Check',
    env_vars: {
      has_client_id: !!id,
      client_id_preview: id ? `${id.substring(0, 3)}...` : 'MISSING',
      
      has_client_secret: !!secret,
      client_secret_preview: secret ? `${secret.substring(0, 3)}...${secret.substring(secret.length - 3)}` : 'MISSING',
      
      has_session_secret: !!sessionSecret,
    },
    node_env: process.env.NODE_ENV,
  });
}