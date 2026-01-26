"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminUser {
  email: string;
  name: string;
  registeredAt: string;
  lastLoginAt?: string;
  totalOrders: number;
  totalSpent: number;
}

interface Order {
  id: string;
  customerEmail: string;
  customerName?: string;
  packageId: string;
  packageName: string;
  amount: number;
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

interface PaymentLog {
  id: string;
  sessionId: string;
  paymentIntentId?: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'refunded' | 'pending';
  createdAt: string;
  metadata?: Record<string, string>;
}

interface Stats {
  totalUsers: number;
  totalOrders: number;
  paidOrders: number;
  refundedOrders: number;
  failedOrders: number;
  totalRevenue: number;
  totalRevenueFormatted: string;
  totalPaymentLogs: number;
  redisConfigured?: boolean;
}

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'orders' | 'payments'>('stats');
  
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [paymentLogs, setPaymentLogs] = useState<PaymentLog[]>([]);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // Check if we have a session cookie
      const response = await fetch('/api/admin/stats', {
        credentials: 'include',
        cache: 'no-store',
      });
      if (response.ok) {
        setAuthenticated(true);
        loadData();
      } else {
        console.error('Auth check failed:', response.status, await response.text().catch(() => ''));
        setAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setAuthenticated(true);
        loadData();
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { 
      method: 'POST',
      credentials: 'include',
    });
    setAuthenticated(false);
    setStats(null);
    setUsers([]);
    setOrders([]);
    setPaymentLogs([]);
  };

  const loadData = async () => {
    try {
      const [statsRes, usersRes, ordersRes, paymentsRes] = await Promise.all([
        fetch('/api/admin/stats', { credentials: 'include' }),
        fetch('/api/admin/users', { credentials: 'include' }),
        fetch('/api/admin/orders', { credentials: 'include' }),
        fetch('/api/admin/payments', { credentials: 'include' }),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData.stats);
      } else {
        console.error('Stats API error:', statsRes.status, await statsRes.text());
        if (statsRes.status === 401) {
          setAuthenticated(false);
          return;
        }
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.users || []);
      } else {
        console.error('Users API error:', usersRes.status, await usersRes.text());
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders || []);
      } else {
        console.error('Orders API error:', ordersRes.status, await ordersRes.text());
      }

      if (paymentsRes.ok) {
        const paymentsData = await paymentsRes.json();
        setPaymentLogs(paymentsData.paymentLogs || []);
      } else {
        console.error('Payments API error:', paymentsRes.status, await paymentsRes.text());
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount / 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            Admin Login
          </h1>
          {loginError && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
              {loginError}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                placeholder="admin@getprimesim.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                placeholder="Enter password"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-cyan-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-cyan-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white shadow dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Admin Panel
            </h1>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            {(['stats', 'users', 'orders', 'payments'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`${
                  activeTab === tab
                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                } whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium capitalize`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Redis Warning */}
        {stats && stats.redisConfigured === false && (
          <div className="mb-6 rounded-lg border border-yellow-300 bg-yellow-50 p-4 dark:border-yellow-700 dark:bg-yellow-900/20">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  ⚠️ Redis Not Configured
                </h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <p>
                    Redis is not configured. Data is being stored in memory and will be lost on server restart.
                  </p>
                  <p className="mt-2">
                    <strong>✅ En Kolay Yöntem:</strong> Vercel dashboard'dan Redis integration ekleyin:
                  </p>
                  <ol className="mt-2 ml-4 list-decimal space-y-1">
                    <li>Vercel Dashboard → Projeniz → Settings</li>
                    <li>Integrations → "Redis" ara ve ekle</li>
                    <li>Environment variables otomatik eklenir</li>
                    <li>Redeploy yapın</li>
                  </ol>
                  <p className="mt-2">
                    Detaylı rehber: <code className="bg-yellow-100 dark:bg-yellow-900 px-1 rounded">VERCEL_REDIS_INTEGRATION.md</code>
                  </p>
                  <a
                    href="/api/admin/test-redis"
                    target="_blank"
                    className="mt-2 inline-block text-yellow-800 underline dark:text-yellow-200"
                  >
                    Test Redis Connection
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && stats && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Users
              </div>
              <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalUsers}
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Orders
              </div>
              <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalOrders}
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Revenue
              </div>
              <div className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.totalRevenueFormatted}
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Paid Orders
              </div>
              <div className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                {stats.paidOrders}
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Refunded Orders
              </div>
              <div className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.refundedOrders}
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Failed Orders
              </div>
              <div className="mt-2 text-3xl font-bold text-red-600 dark:text-red-400">
                {stats.failedOrders}
              </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Payment Logs
              </div>
              <div className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                {stats.totalPaymentLogs}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Total Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Registered
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {users.map((user) => (
                    <tr key={user.email}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {user.email}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {user.name}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {user.totalOrders}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatCurrency(user.totalSpent)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(user.registeredAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Package
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">
                        {order.id.substring(0, 20)}...
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        <div>{order.customerEmail}</div>
                        {order.customerName && (
                          <div className="text-xs text-gray-400">{order.customerName}</div>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {order.packageName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatCurrency(order.amount, order.currency)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            order.status === 'paid' && !order.refunded
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : order.status === 'refunded' || order.refunded
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              : order.status === 'failed'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}
                        >
                          {order.refunded ? 'Refunded' : order.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="overflow-hidden rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Payment ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                  {paymentLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">
                        {log.id.substring(0, 20)}...
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {log.customerEmail}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatCurrency(log.amount, log.currency)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            log.status === 'succeeded'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : log.status === 'refunded'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              : log.status === 'failed'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(log.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
