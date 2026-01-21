# PrimeSim Site - Profile ID Validation Fix

## Problem
The system was encountering an error where email addresses (like `islamyavuz09@gmail.com`) were being incorrectly parsed as profile IDs/UUIDs, causing the error:
```
failed to parse profile id: islamyavuz09@gmail.com: invalid UUID length: 22
```

## Solution
Added proper validation to ensure:
1. Profile IDs are valid UUIDs before parsing
2. Email addresses are detected and rejected as profile IDs
3. Clear error messages guide users to the correct format

## Files Added

### `src/utils/profileIdValidator.ts`
Contains utility functions for:
- UUID validation (36 chars with hyphens or 32 chars without)
- Email detection
- Profile ID parsing with detailed error messages
- Safe parsing that returns null instead of throwing

### `src/services/orderService.ts`
Updated order creation service with:
- Profile ID validation before API calls
- Proper separation of email and profileId fields
- Better error handling for validation failures
- Prevents payments when validation fails

### `src/utils/profileIdValidator.test.ts`
Comprehensive tests covering all edge cases including the specific error scenario.

## Usage

```typescript
import { parseProfileId } from './utils/profileIdValidator';
import { createOrder } from './services/orderService';

// This will now throw a clear error instead of failing silently
try {
  const profileId = parseProfileId('islamyavuz09@gmail.com');
} catch (error) {
  // Error: "Email address "islamyavuz09@gmail.com" cannot be used as a profile ID..."
}

// Create order with proper validation
const order = await createOrder({
  type: 'transaction',
  profileId: '123e4567-e89b-12d3-a456-426614174000', // Valid UUID
  email: 'islamyavuz09@gmail.com', // Separate email field
  packageId: 'usa-1gb-7days'
});
```

## Environment Variables
Make sure to set:
```
ESIM_GO_API_KEY=your_api_key_here
ESIM_GO_BASE_URL=https://api.esim-go.com/v2.5  # Optional: defaults to v2.5, can use v2.4
ESIM_GO_API_VERSION=2.5  # Optional: 2.4 or 2.5
```

**Base URL:** The service uses `https://api.esim-go.com/v2.5` by default (or v2.4 if configured). 
You can override it with the `ESIM_GO_BASE_URL` environment variable.

## Testing
Run tests with:
```bash
npm test
# or
yarn test
```
