import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';
import { Redis } from '@upstash/redis';

export async function GET(request: NextRequest) {
  try {
    const authenticated = await isAdminAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    const status = {
      redisUrl: redisUrl ? `${redisUrl.substring(0, 20)}...` : 'NOT SET',
      redisToken: redisToken ? `${redisToken.substring(0, 10)}...` : 'NOT SET',
      redisConfigured: !!(redisUrl && redisToken),
    };

    if (!redisUrl || !redisToken) {
      return NextResponse.json({
        status: 'Redis not configured',
        details: status,
        message: 'Please add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN to Vercel environment variables',
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
