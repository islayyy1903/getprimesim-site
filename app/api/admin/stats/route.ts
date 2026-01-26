import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';
import { getAllUsers, getAllOrders, getAllPaymentLogs } from '@/app/lib/adminDb';

export async function GET(request: NextRequest) {
  try {
    // Check admin authentication
    const authenticated = await isAdminAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const [users, orders, paymentLogs] = await Promise.all([
      getAllUsers(),
      getAllOrders(),
      getAllPaymentLogs(),
    ]);

    // Calculate statistics
    const totalUsers = users.length;
    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter(o => o.status === 'paid' && !o.refunded)
      .reduce((sum, o) => sum + o.amount, 0);
    
    const paidOrders = orders.filter(o => o.status === 'paid' && !o.refunded).length;
    const refundedOrders = orders.filter(o => o.refunded).length;
    const failedOrders = orders.filter(o => o.status === 'failed').length;

    const stats = {
      totalUsers,
      totalOrders,
      paidOrders,
      refundedOrders,
      failedOrders,
      totalRevenue, // in cents
      totalRevenueFormatted: `$${(totalRevenue / 100).toFixed(2)}`,
      totalPaymentLogs: paymentLogs.length,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
