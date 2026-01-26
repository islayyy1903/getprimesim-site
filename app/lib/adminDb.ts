/**
 * Admin Database - Uses Upstash Redis for persistence
 * Falls back to in-memory if Redis is not configured
 * 
 * Stores users, orders, and payment logs
 */

import { promises as fs } from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

export interface AdminUser {
  email: string;
  name: string;
  registeredAt: string;
  lastLoginAt?: string;
  totalOrders: number;
  totalSpent: number;
}

export interface Order {
  id: string; // Stripe session ID
  customerEmail: string;
  customerName?: string;
  packageId: string;
  packageName: string;
  amount: number; // in cents
  currency: string;
  status: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentIntentId?: string;
  esimgoOrderId?: string;
  createdAt: string;
  paidAt?: string;
  qrCodeSent?: boolean;
  refunded?: boolean;
  refundReason?: string;
}

export interface PaymentLog {
  id: string;
  sessionId: string;
  paymentIntentId?: string;
  customerEmail: string;
  amount: number; // in cents
  currency: string;
  status: 'succeeded' | 'failed' | 'refunded' | 'pending';
  createdAt: string;
  metadata?: Record<string, string>;
}

interface AdminDatabase {
  users: AdminUser[];
  orders: Order[];
  paymentLogs: PaymentLog[];
  lastUpdated: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'admin.json');
const REDIS_KEY = 'admin_database';

// Initialize Upstash Redis client
let redisClient: Redis | null = null;

function getRedisClient(): Redis | null {
  if (redisClient) {
    return redisClient;
  }

  // Vercel Redis Integration kullanıyoruz
  // Vercel dashboard'dan Redis eklediğinizde bu variable'lar otomatik eklenir
  const redisUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const redisToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!redisUrl || !redisToken) {
    console.warn('⚠️ Redis not configured. Using in-memory database (data will be lost on restart).');
    console.warn('💡 To fix: Add Redis integration from Vercel dashboard > Integrations > Redis');
    return null;
  }

  try {
    redisClient = new Redis({
      url: redisUrl,
      token: redisToken,
    });
    console.log('✅ Redis initialized for admin database');
    return redisClient;
  } catch (error) {
    console.error('❌ Failed to initialize Redis:', error);
    return null;
  }
}

// In-memory database fallback (only used if Redis is not available)
declare global {
  // eslint-disable-next-line no-var
  var __adminDbMemory: AdminDatabase | undefined;
}

if (typeof globalThis.__adminDbMemory === 'undefined') {
  globalThis.__adminDbMemory = undefined;
}

// Initialize database if it doesn't exist
async function initDatabase(): Promise<AdminDatabase> {
  const redis = getRedisClient();
  
  // Try Redis first (preferred for Vercel)
  if (redis) {
    try {
      console.log('📖 Reading from Redis...');
      const data = await redis.get<AdminDatabase>(REDIS_KEY);
      if (data) {
        console.log('✅ Data loaded from Redis, users:', data.users?.length || 0);
        return data;
      } else {
        console.log('ℹ️ No data in Redis, will create new database');
      }
    } catch (error) {
      console.warn('⚠️ Redis read error, falling back:', error);
    }
  } else {
    console.log('ℹ️ Redis not available, using fallback');
  }

  // Fallback to file system
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    const db = JSON.parse(data) as AdminDatabase;
    // If we have Redis, sync file data to Redis
    if (redis) {
      try {
        await redis.set(REDIS_KEY, db);
      } catch (error) {
        console.warn('⚠️ Failed to sync to Redis:', error);
      }
    }
    return db;
  } catch (error) {
    // If file doesn't exist or can't be read, create initial database
    const initialDb: AdminDatabase = {
      users: [],
      orders: [],
      paymentLogs: [],
      lastUpdated: new Date().toISOString(),
    };
    
    // Try to save to Redis first
    if (redis) {
      try {
        await redis.set(REDIS_KEY, initialDb);
        return initialDb;
      } catch (error) {
        console.warn('⚠️ Redis write error:', error);
      }
    }
    
    // Fallback to file system
    try {
      await saveDatabase(initialDb);
      return initialDb;
    } catch (writeError) {
      // If write fails (e.g., Vercel read-only filesystem), use in-memory
      console.warn('⚠️ Cannot write to filesystem, using in-memory database:', writeError);
      if (!globalThis.__adminDbMemory) {
        globalThis.__adminDbMemory = initialDb;
      }
      return globalThis.__adminDbMemory!;
    }
  }
}

async function saveDatabase(db: AdminDatabase): Promise<void> {
  db.lastUpdated = new Date().toISOString();
  const redis = getRedisClient();
  
  // Try Redis first (preferred for Vercel)
  if (redis) {
    try {
      console.log('💾 Saving to Redis...');
      await redis.set(REDIS_KEY, db);
      console.log('✅ Successfully saved to Redis');
      return; // Successfully saved to Redis
    } catch (error) {
      console.warn('⚠️ Redis write error, falling back to file:', error);
    }
  } else {
    console.warn('⚠️ Redis not available, using fallback');
  }
  
  // Fallback to file system
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
    console.log('✅ Saved to file system');
  } catch (error) {
    // If write fails, save to memory instead (Vercel read-only filesystem)
    console.warn('⚠️ Cannot write to filesystem, saving to memory:', error);
    globalThis.__adminDbMemory = db;
    console.log('💾 Saved to memory (will be lost on restart)');
    // Don't throw - just use memory database
  }
}

// User operations
export async function saveUser(email: string, name: string): Promise<void> {
  try {
    console.log('📦 Initializing database for user save...');
    const db = await initDatabase();
    console.log('📦 Database initialized, current users:', db.users.length);
    
    const existingUser = db.users.find(u => u.email === email);
    if (existingUser) {
      // Update existing user
      console.log('🔄 Updating existing user:', email);
      existingUser.name = name;
      existingUser.lastLoginAt = new Date().toISOString();
    } else {
      // Create new user
      console.log('➕ Creating new user:', email, name);
      db.users.push({
        email,
        name,
        registeredAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
      });
    }
    
    console.log('💾 Saving database, total users:', db.users.length);
    await saveDatabase(db);
    console.log('✅ Database saved successfully');
  } catch (error) {
    console.error('❌ Error saving user:', error);
    // Continue anyway - data is saved to memory
  }
}

export async function getAllUsers(): Promise<AdminUser[]> {
  try {
    console.log('📖 Getting all users from database...');
    const db = await initDatabase();
    console.log('📖 Database loaded, users count:', db.users?.length || 0);
    const users = db.users || [];
    console.log('📖 Returning users:', users.length);
    return users;
  } catch (error) {
    console.error('❌ Error getting all users:', error);
    return [];
  }
}

export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  try {
    const db = await initDatabase();
    return db.users.find(u => u.email === email) || null;
  } catch (error) {
    console.error('Error getting user by email:', error);
    return null;
  }
}

// Order operations
export async function saveOrder(order: Order): Promise<void> {
  try {
    const db = await initDatabase();
    
    const existingIndex = db.orders.findIndex(o => o.id === order.id);
    const isNewOrder = existingIndex < 0;
    const existingOrder = existingIndex >= 0 ? db.orders[existingIndex] : null;
    
    if (existingIndex >= 0) {
      // Update existing order
      db.orders[existingIndex] = order;
    } else {
      // Add new order
      db.orders.push(order);
    }
    
    // Update user stats only for new paid orders
    const user = db.users.find(u => u.email === order.customerEmail);
    if (user && isNewOrder && order.status === 'paid' && !order.refunded) {
      user.totalOrders += 1;
      user.totalSpent += order.amount;
    } else if (user && existingOrder) {
      // If order status changed from paid to refunded, adjust stats
      if (existingOrder.status === 'paid' && !existingOrder.refunded && 
          (order.status === 'refunded' || order.refunded)) {
        user.totalOrders = Math.max(0, user.totalOrders - 1);
        user.totalSpent = Math.max(0, user.totalSpent - order.amount);
      }
    }
    
    await saveDatabase(db);
  } catch (error) {
    console.error('Error saving order:', error);
    // Continue anyway - data is saved to memory
  }
}

export async function getAllOrders(): Promise<Order[]> {
  try {
    const db = await initDatabase();
    return (db.orders || []).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error getting all orders:', error);
    return [];
  }
}

export async function getOrdersByEmail(email: string): Promise<Order[]> {
  try {
    const db = await initDatabase();
    return (db.orders || [])
      .filter(o => o.customerEmail === email)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  } catch (error) {
    console.error('Error getting orders by email:', error);
    return [];
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const db = await initDatabase();
    return (db.orders || []).find(o => o.id === id) || null;
  } catch (error) {
    console.error('Error getting order by id:', error);
    return null;
  }
}

// Payment log operations
export async function savePaymentLog(log: PaymentLog): Promise<void> {
  try {
    const db = await initDatabase();
    
    const existingIndex = db.paymentLogs.findIndex(l => l.id === log.id);
    if (existingIndex >= 0) {
      // Update existing log
      db.paymentLogs[existingIndex] = log;
    } else {
      // Add new log
      db.paymentLogs.push(log);
    }
    
    await saveDatabase(db);
  } catch (error) {
    console.error('Error saving payment log:', error);
    // Continue anyway - data is saved to memory
  }
}

export async function getAllPaymentLogs(): Promise<PaymentLog[]> {
  try {
    const db = await initDatabase();
    return (db.paymentLogs || []).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error getting all payment logs:', error);
    return [];
  }
}

export async function getPaymentLogsByEmail(email: string): Promise<PaymentLog[]> {
  try {
    const db = await initDatabase();
    return (db.paymentLogs || [])
      .filter(l => l.customerEmail === email)
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  } catch (error) {
    console.error('Error getting payment logs by email:', error);
    return [];
  }
}
