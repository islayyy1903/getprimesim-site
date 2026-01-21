/**
 * Order Service with fixed profile ID validation
 * Prevents email addresses from being used as profile IDs
 */

import { parseProfileId, isValidUUID, isEmail } from '../utils/profileIdValidator';

// Base API URL - supports v2.4 and v2.5
const ESIM_GO_BASE_URL = process.env.ESIM_GO_BASE_URL || 'https://api.esim-go.com/v2.5';
const ESIM_GO_API_VERSION = process.env.ESIM_GO_API_VERSION || '2.5'; // Can be '2.4' or '2.5'

interface OrderRequest {
  type: 'transaction';
  profileId?: string;
  email?: string;
  packageId?: string;
  // ... other order fields
}

interface OrderResponse {
  orderId: string;
  status: string;
  message?: string;
}

/**
 * Creates an eSIM order with proper profile ID validation
 */
export async function createOrder(orderData: OrderRequest): Promise<OrderResponse> {
  try {
    // Validate profile ID if provided
    let validatedProfileId: string | undefined;
    
    if (orderData.profileId) {
      // Validate that profile ID is a valid UUID, not an email
      validatedProfileId = parseProfileId(orderData.profileId);
    }

    // Ensure email is not used as profile ID
    if (orderData.email && isValidUUID(orderData.email)) {
      throw new Error(
        'Email address cannot be used as profile ID. ' +
        'Please provide a valid UUID for profileId field and use email field for email address.'
      );
    }

    // Prepare the order payload
    const orderPayload = {
      type: orderData.type || 'transaction',
      ...(validatedProfileId && { profileId: validatedProfileId }),
      ...(orderData.email && { email: orderData.email }),
      ...(orderData.packageId && { packageId: orderData.packageId }),
    };

    // Make API request to esim-go.com
    // Base URL: https://api.esim-go.com/v2.5 (or v2.4)
    const apiUrl = ESIM_GO_BASE_URL.endsWith('/') 
      ? `${ESIM_GO_BASE_URL}orders` 
      : `${ESIM_GO_BASE_URL}/orders`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.ESIM_GO_API_KEY || '', // Make sure to set this in env
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `Order creation failed: ${response.status} ${response.statusText}. ` +
        `${errorData.message || JSON.stringify(errorData)}`
      );
    }

    const result = await response.json();
    
    return {
      orderId: result.id || result.orderId || '',
      status: result.status || 'created',
      message: result.message,
    };

  } catch (error: any) {
    // Handle profile ID parsing errors specifically
    if (error.message?.includes('Invalid profile ID') || error.message?.includes('Invalid UUID')) {
      // Log the error for debugging
      console.error('Profile ID validation error:', error.message);
      
      // Return a user-friendly error response
      throw new Error(
        `Order creation failed: ${error.message}. ` +
        `No payment was taken. Please check your order details and try again.`
      );
    }
    
    // Re-throw other errors
    throw error;
  }
}

/**
 * Gets QR code for an ICCID with proper error handling
 */
export async function getQRCode(iccid: string): Promise<string> {
  if (!iccid || typeof iccid !== 'string') {
    throw new Error('ICCID is required');
  }

  // Base URL: https://api.esim-go.com/v2.5 (or v2.4)
  const apiUrl = ESIM_GO_BASE_URL.endsWith('/')
    ? `${ESIM_GO_BASE_URL}esims-assignments/${iccid}`
    : `${ESIM_GO_BASE_URL}/esims-assignments/${iccid}`;
  
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'X-API-Key': process.env.ESIM_GO_API_KEY || '',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to retrieve QR code: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.qrCode || data.qr_code || '';
}
