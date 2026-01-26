/**
 * Admin Database - Simple JSON-based storage
 * 
 * Stores users, orders, and payment logs in a JSON file
 */

import { promises as fs } from 'fs';
import path from 'path';

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

// In-memory database fallback for Vercel (read-only filesystem)
// Note: In Vercel serverless, this is reset on each cold start
// For production, use Vercel KV, Postgres, or external database
let memoryDatabase: AdminDatabase | null = null;

// Global object to persist across function calls in same instance
declare global {
  // eslint-disable-next-line no-var
  var __adminDbMemory: AdminDatabase | undefined;
}

// Use globalThis to persist across hot reloads in development
// In production, this will reset on each cold start
if (typeof globalThis.__adminDbMemory === 'undefined') {
  globalThis.__adminDbMemory = null;
}

// Initialize database if it doesn't exist
async function initDatabase(): Promise<AdminDatabase> {
  // Try to use file system first
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data) as AdminDatabase;
  } catch (error) {
    // If file doesn't exist or can't be read, try to create it
    try {
      const initialDb: AdminDatabase = {
        users: [],
        orders: [],
        paymentLogs: [],
        lastUpdated: new Date().toISOString(),
      };
      await saveDatabase(initialDb);
      return initialDb;
    } catch (writeError) {
      // If write fails (e.g., Vercel read-only filesystem), use in-memory
      console.warn('⚠️ Cannot write to filesystem, using in-memory database:', writeError);
      if (!globalThis.__adminDbMemory) {
        globalThis.__adminDbMemory = {
          users: [],
          orders: [],
          paymentLogs: [],
          lastUpdated: new Date().toISOString(),
        };
      }
      return globalThis.__adminDbMemory;
    }
  }
}

async function saveDatabase(db: AdminDatabase): Promise<void> {
  db.lastUpdated = new Date().toISOString();
  try {
    await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
  } catch (error) {
    // If write fails, save to memory instead (Vercel read-only filesystem)
    console.warn('⚠️ Cannot write to filesystem, saving to memory:', error);
    globalThis.__adminDbMemory = db;
    memoryDatabase = db;
    // Don't throw - just use memory database
  }
}

// User operations
export async function saveUser(email: string, name: string): Promise<void> {
  try {
    const db = await initDatabase();
    
    const existingUser = db.users.find(u => u.email === email);
    if (existingUser) {
      // Update existing user
      existingUser.name = name;
      existingUser.lastLoginAt = new Date().toISOString();
    } else {
      // Create new user
      db.users.push({
        email,
        name,
        registeredAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
      });
    }
    
    await saveDatabase(db);
  } catch (error) {
    console.error('Error saving user:', error);
    // Continue anyway - data is saved to memory
  }
}

export async function getAllUsers(): Promise<AdminUser[]> {
  try {
    const db = await initDatabase();
    return db.users || [];
  } catch (error) {
    console.error('Error getting all users:', error);
    return [];
  }
}

export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  const db = await initDatabase();
  return db.users.find(u => u.email === email) || null;
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
  const db = await initDatabase();
  return db.orders
    .filter(o => o.customerEmail === email)
    .sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export async function getOrderById(id: string): Promise<Order | null> {
  const db = await initDatabase();
  return db.orders.find(o => o.id === id) || null;
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
  const db = await initDatabase();
  return db.paymentLogs
    .filter(l => l.customerEmail === email)
    .sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}
