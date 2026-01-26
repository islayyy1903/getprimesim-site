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

// Initialize database if it doesn't exist
async function initDatabase(): Promise<AdminDatabase> {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data) as AdminDatabase;
  } catch (error) {
    // Database doesn't exist, create it
    const initialDb: AdminDatabase = {
      users: [],
      orders: [],
      paymentLogs: [],
      lastUpdated: new Date().toISOString(),
    };
    await saveDatabase(initialDb);
    return initialDb;
  }
}

async function saveDatabase(db: AdminDatabase): Promise<void> {
  db.lastUpdated = new Date().toISOString();
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
}

// User operations
export async function saveUser(email: string, name: string): Promise<void> {
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
}

export async function getAllUsers(): Promise<AdminUser[]> {
  const db = await initDatabase();
  return db.users;
}

export async function getUserByEmail(email: string): Promise<AdminUser | null> {
  const db = await initDatabase();
  return db.users.find(u => u.email === email) || null;
}

// Order operations
export async function saveOrder(order: Order): Promise<void> {
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
}

export async function getAllOrders(): Promise<Order[]> {
  const db = await initDatabase();
  return db.orders.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
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
}

export async function getAllPaymentLogs(): Promise<PaymentLog[]> {
  const db = await initDatabase();
  return db.paymentLogs.sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getPaymentLogsByEmail(email: string): Promise<PaymentLog[]> {
  const db = await initDatabase();
  return db.paymentLogs
    .filter(l => l.customerEmail === email)
    .sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}
