// 🟢 关键修改：注意这里是 route-handler，不是 api
import { makeRouteHandler } from '@keystatic/next/route-handler';
import config from '@/keystatic.config';

export const { POST, GET } = makeRouteHandler({ config });