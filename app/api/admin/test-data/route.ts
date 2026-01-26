import { NextRequest, NextResponse } from 'next/server';
import { isAdminAuthenticated } from '@/app/lib/adminAuth';
import { saveUser, getAllUsers } from '@/app/lib/adminDb';

export async function POST(request: NextRequest) {
  try {
    // Check admin authentication
    const authenticated = await isAdminAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { action } = body;

    if (action === 'add-test-user') {
      await saveUser('test@example.com', 'Test User');
      return NextResponse.json({ success: true, message: 'Test user added' });
    }

    if (action === 'get-users') {
      const users = await getAllUsers();
      return NextResponse.json({ users, count: users.length });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Test data error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
