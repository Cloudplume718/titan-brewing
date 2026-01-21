'use client';
import { makePage } from '@keystatic/next/ui/app';
import config from '@/keystatic.config'; // 🟢 使用 @ 从根目录引入，解决找不到模块的问题

export default makePage(config);