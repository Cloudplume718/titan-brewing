import { NextRequest, NextResponse } from 'next/server';
import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '../../../../keystatic.config';

export const dynamic = 'force-dynamic';

// 🛑 只有在回调时才触发诊断
export async function GET(req: NextRequest, context: any) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  // 如果是回调请求，我们要拦截下来做深度体检
  if (url.pathname.includes('oauth/callback') && code) {
    console.log('\n🏥 === 开始 Keystatic 深度体检 ===');
    
    const clientId = process.env.KEYSTATIC_GITHUB_CLIENT_ID;
    const clientSecret = process.env.KEYSTATIC_GITHUB_CLIENT_SECRET;

    try {
      // 1️⃣ 第一关：换 Token (这一步我们知道是通的)
      console.log('1️⃣ 正在换取 Token...');
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
      });
      const tokenData = await tokenRes.json();
      
      if (tokenData.error) throw new Error(`Token 换取失败: ${tokenData.error_description}`);
      const token = tokenData.access_token;
      console.log('✅ Token 获取成功！');

      // 2️⃣ 第二关：查户口 (获取用户信息)
      console.log('2️⃣ 正在获取用户信息...');
      const userRes = await fetch('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = await userRes.json();
      
      if (!userRes.ok) throw new Error(`获取用户失败: ${userRes.status} ${JSON.stringify(userData)}`);
      console.log(`✅ 用户确认: ${userData.login} (ID: ${userData.id})`);

      // 3️⃣ 第三关：查房产证 (获取仓库权限)
      // 注意：这里必须和 keystatic.config.ts 里的 repo 填写完全一致
      const repoName = 'Cloudplume718/titan-brewing'; 
      console.log(`3️⃣ 正在检查仓库权限: ${repoName}...`);
      
      const repoRes = await fetch(`https://api.github.com/repos/${repoName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const repoData = await repoRes.json();

      if (repoRes.status === 404) {
        throw new Error(`❌ 找不到仓库 ${repoName}！请检查：\n1. 仓库是否私有？(私有仓库需要 OAuth App 申请 repo 权限)\n2. 拼写是否正确？\n3. Token 是否有 repo 权限？`);
      }
      
      if (!repoRes.ok) throw new Error(`仓库检查失败: ${repoRes.status}`);

      // 检查是否有写权限
      const permissions = repoData.permissions;
      console.log('📦 仓库权限详情:', JSON.stringify(permissions));
      
      if (!permissions || (!permissions.push && !permissions.admin)) {
        throw new Error('❌ 权限不足！你没有该仓库的写入(push)权限。');
      }

      console.log('✅ 仓库权限验证通过！');
      console.log('🏥 === 体检全部通过，Keystatic 本该正常工作 ===\n');

    } catch (e: any) {
      console.error('💥 深度体检发现致命问题:', e.message);
      return NextResponse.json({ 
        status: 'Error', 
        message: e.message 
      }, { status: 500 });
    }
  }

  // 这里的代码虽然会报错(因为code被消耗了)，但我们要的是上面的日志
  const handler = makeRouteHandler({
    config,
    clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
    clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
    secret: process.env.KEYSTATIC_SECRET,
  });
  return (handler.GET as any)(req, context);
}

export const POST = makeRouteHandler({
  config,
  clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
  clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
  secret: process.env.KEYSTATIC_SECRET,
}).POST;