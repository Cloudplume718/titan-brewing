// app/api/diagnose/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // 👇 在这里填入你确定的那套 ID 和 Secret
  const clientId = 'Ov23li3ONSUPSyi9O8OB';
  const clientSecret = '你的Secret填在这里'; 

  // 1. 尝试直接通过 API 获取仓库信息 (模拟 Keystatic 的检查)
  // 注意：我们没有 Access Token，所以只能检查仓库是否公开可见
  const repoRes = await fetch('https://api.github.com/repos/Cloudplume718/titan-brewing');
  const repoData = await repoRes.json();

  return NextResponse.json({
    test_target: 'Cloudplume718/titan-brewing',
    
    // 仓库状态检查
    repo_check: {
      status: repoRes.status, // 如果是 200 就是正常的
      is_private: repoData.private,
      permissions: repoData.permissions, // 👀 看看这里有没有 push 权限
      default_branch: repoData.default_branch, // 👀 看看是不是 main
    },
    
    // 配置一致性检查
    env_var_check: {
      // 检查 Vercel 环境变量里的 ID 是否和硬编码的一致
      vercel_public_id: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID,
      is_match: process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_CLIENT_ID === clientId
    }
  });
}