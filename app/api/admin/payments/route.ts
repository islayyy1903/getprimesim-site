import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';
import { getAllPaymentLogs } from '@/app/lib/adminDb';

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

    const paymentLogs = await getAllPaymentLogs();
    return NextResponse.json({ paymentLogs });
  } catch (error) {
    console.error('Error fetching payment logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
