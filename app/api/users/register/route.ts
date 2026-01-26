import { NextRequest, NextResponse } from 'next/server';
import { saveUser } from '@/app/lib/adminDb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    console.log('📝 Saving user to database:', { email, name });
    await saveUser(email, name);
    console.log('✅ User saved successfully');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
