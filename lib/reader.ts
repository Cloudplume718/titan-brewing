import { createReader } from '@keystatic/core/reader';
import config from '@/keystatic.config';

// 🟢 创建一个读取器，它会自动根据配置文件去硬盘里找数据
export const reader = createReader(process.cwd(), config);