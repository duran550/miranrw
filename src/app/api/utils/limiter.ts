import { NextApiRequest } from 'next';
import { headers } from 'next/headers';
const rateLimitMap = new Map();

export const rateLimitMiddleware = (req: NextApiRequest): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const ip = headers().get('x-forwarded-for') || headers().get('x-real-ip');
    const limit = 15; // Limiting requests to 15 per minute per IP
    const windowMs = 60 * 1000; // 1 minute
    if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
    }

    const ipData = rateLimitMap.get(ip);

    if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
    }

    if (ipData.count >= limit) {
      resolve(false);
    }

    ipData.count += 1;

    resolve(true);
  });
};
