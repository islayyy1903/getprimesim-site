import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiting configuration for checkout endpoint
 * Limits: 5 checkout attempts per 10 minutes per IP
 */
const CHECKOUT_RATE_LIMIT = {
  requests: 5,
  window: "10 m", // 10 minutes
};

/**
 * In-memory rate limiting fallback for development
 * Used when Upstash Redis is not configured
 */
interface MemoryRateLimit {
  count: number;
  resetTime: number;
}

const memoryStore = new Map<string, MemoryRateLimit>();

/**
 * Get client IP from request headers
 */
export function getClientIP(request: Request): string {
  // Try various headers that might contain the real IP
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP.trim();
  }

  const cfConnectingIP = request.headers.get("cf-connecting-ip"); // Cloudflare
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }

  // Fallback to a default value (should not happen in production)
  return "unknown";
}

/**
 * In-memory rate limiting (development fallback)
 */
async function checkMemoryRateLimit(identifier: string): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}> {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes in milliseconds
  const limit = CHECKOUT_RATE_LIMIT.requests;

  const record = memoryStore.get(identifier);

  if (!record || now > record.resetTime) {
    // Create new record or reset expired record
    memoryStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });

    // Clean up old entries periodically (simple cleanup)
    if (memoryStore.size > 1000) {
      for (const [key, value] of memoryStore.entries()) {
        if (now > value.resetTime) {
          memoryStore.delete(key);
        }
      }
    }

    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: now + windowMs,
    };
  }

  if (record.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: record.resetTime,
    };
  }

  // Increment count
  record.count++;
  memoryStore.set(identifier, record);

  return {
    success: true,
    limit,
    remaining: limit - record.count,
    reset: record.resetTime,
  };
}

/**
 * Initialize Upstash Ratelimit
 * Returns null if Upstash is not configured (development mode)
 */
function initUpstashRatelimit(): Ratelimit | null {
  const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    console.warn(
      "⚠️ Upstash Redis not configured. Using in-memory rate limiting (development mode)."
    );
    return null;
  }

  try {
    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

    const ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(
        CHECKOUT_RATE_LIMIT.requests,
        CHECKOUT_RATE_LIMIT.window
      ),
      analytics: true,
    });

    console.log("✅ Upstash Ratelimit initialized");
    return ratelimit;
  } catch (error) {
    console.error("❌ Failed to initialize Upstash Ratelimit:", error);
    return null;
  }
}

// Initialize ratelimit instance (singleton)
let ratelimitInstance: Ratelimit | null = null;

/**
 * Check rate limit for checkout endpoint
 * @param identifier - Unique identifier (usually IP address)
 * @returns Rate limit result with success status and remaining requests
 */
export async function checkRateLimit(identifier: string): Promise<{
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  message?: string;
}> {
  // Initialize Upstash if not already done
  if (ratelimitInstance === null) {
    ratelimitInstance = initUpstashRatelimit();
  }

  // Use Upstash if available, otherwise fall back to in-memory
  if (ratelimitInstance) {
    try {
      const result = await ratelimitInstance.limit(identifier);
      return {
        success: result.success,
        limit: CHECKOUT_RATE_LIMIT.requests,
        remaining: result.remaining,
        reset: result.reset,
        message: result.success
          ? undefined
          : `Rate limit exceeded. Please try again in ${Math.ceil((result.reset - Date.now()) / 1000)} seconds.`,
      };
    } catch (error) {
      console.error("❌ Rate limit check failed, falling back to memory:", error);
      // Fall back to in-memory rate limiting
      return await checkMemoryRateLimit(identifier);
    }
  }

  // Fall back to in-memory rate limiting
  return await checkMemoryRateLimit(identifier);
}
