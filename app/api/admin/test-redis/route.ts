import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';
import { Redis } from '@upstash/redis';

export async function GET(request: NextRequest) {
  try {
    const authenticated = await isAdminAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Vercel Redis Integration kullanıyoruz (KV_REST_API_URL ve KV_REST_API_TOKEN)
    // Veya eski Upstash variable'ları da destekliyoruz
    const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

    const status = {
      redisUrl: redisUrl ? `${redisUrl.substring(0, 20)}...` : 'NOT SET',
      redisToken: redisToken ? `${redisToken.substring(0, 10)}...` : 'NOT SET',
      redisConfigured: !!(redisUrl && redisToken),
      usingVercelKV: !!process.env.KV_REST_API_URL,
      usingUpstash: !!process.env.UPSTASH_REDIS_REST_URL,
    };

    if (!redisUrl || !redisToken) {
      return NextResponse.json({
        status: 'Redis not configured',
        details: status,
        message: 'Please add Redis integration from Vercel dashboard: Settings > Integrations > Redis',
        instructions: [
          '1. Go to Vercel Dashboard > Your Project > Settings',
          '2. Click on "Integrations" in the left menu',
          '3. Search for "Redis" and click "Add"',
          '4. Follow the setup wizard',
          '5. Environment variables will be added automatically',
        ],
      });
    }

    // Test Redis connection
    try {
      const redis = new Redis({
        url: redisUrl,
        token: redisToken,
      });

      // Test write
      await redis.set('test_key', 'test_value');
      
      // Test read
      const value = await redis.get('test_key');
      
      // Clean up
      await redis.del('test_key');

      return NextResponse.json({
        status: 'Redis connected successfully',
        details: status,
        test: {
          write: 'success',
          read: value === 'test_value' ? 'success' : 'failed',
        },
      });
    } catch (error) {
      return NextResponse.json({
        status: 'Redis connection failed',
        details: status,
        error: error instanceof Error ? error.message : 'Unknown error',
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error testing Redis:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined },
      { status: 500 }
    );
  }
}
