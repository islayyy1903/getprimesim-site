/**
 * Admin Authentication
 * 
 * Simple session-based authentication for admin panel
 * Only allows access to configured admin email
 */

import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@getprimesim.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Change this in production!

const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface AdminSession {
  email: string;
  loggedInAt: string;
  expiresAt: string;
}

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<boolean> {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export async function createAdminSession(email: string): Promise<string> {
  const session: AdminSession = {
    email,
    loggedInAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + SESSION_DURATION).toISOString(),
  };
  
  // In a real app, you'd store this in a database or Redis
  // For simplicity, we'll use a signed cookie
  return JSON.stringify(session);
}

export async function getAdminSession(
  request: NextRequest
): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
  
  if (!sessionCookie?.value) {
    return null;
  }
  
  try {
    const session = JSON.parse(sessionCookie.value) as AdminSession;
    
    // Check if session is expired
    if (new Date(session.expiresAt) < new Date()) {
      return null;
    }
    
    // Verify admin email
    if (session.email !== ADMIN_EMAIL) {
      return null;
    }
    
    return session;
  } catch {
    return null;
  }
}

export async function isAdminAuthenticated(
  request: NextRequest
): Promise<boolean> {
  const session = await getAdminSession(request);
  return session !== null;
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
