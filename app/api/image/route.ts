// app/api/image/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { feishuClient } from '../../../lib/feishu';

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token');
  if (!token) return new NextResponse('Missing token', { status: 400 });

  try {
    // 🟢 修复点1：参数必须包裹在 path 中
    const res = await feishuClient.drive.media.download({
      path: {
        file_token: token,
      },
    });

    // 🟢 修复点2：类型兼容性处理
    // 飞书 SDK 返回的是一个封装对象，我们需要获取底层的 Buffer
    // 这里使用 writeFile 类似的方式读取流到 Buffer，确保 Next.js 能发送
    const stream = res.getReadableStream();
    const chunks: Uint8Array[] = [];
    
    for await (const chunk of stream) {
      chunks.push(chunk as Uint8Array); // 显式类型断言
    }
    
    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'image/jpeg', // 默认作为 jpeg，现代浏览器会自动识别
        'Cache-Control': 'public, max-age=31536000, immutable', // 强缓存一年
      },
    });

  } catch (e) {
    console.error('图片下载失败:', e);
    return new NextResponse('Error fetching image', { status: 500 });
  }
}