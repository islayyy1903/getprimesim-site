/**
 * Profile ID Validator
 * Fixes the issue where email addresses are incorrectly parsed as UUIDs
 */

/**
 * Validates if a string is a valid UUID format
 * UUIDs are typically 36 characters (with hyphens) or 32 characters (without)
 * Valid formats: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (36 chars) or xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (32 chars)
 */
export function isValidUUID(str: string): boolean {
  if (!str || typeof str !== 'string') {
    return false;
  }

  // UUID with hyphens: 8-4-4-4-12 pattern (36 chars)
  const uuidWithHyphens = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  
  // UUID without hyphens: 32 hex characters
  const uuidWithoutHyphens = /^[0-9a-f]{32}$/i;

  return uuidWithHyphens.test(str) || uuidWithoutHyphens.test(str);
}

/**
 * Validates if a string is an email address
 */
export function isEmail(str: string): boolean {
  if (!str || typeof str !== 'string') {
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}

/**
 * Parses and validates a profile ID
 * Throws descriptive error if profile ID is invalid
 */
export function parseProfileId(profileId: string | undefined | null): string {
  if (!profileId || typeof profileId !== 'string') {
    throw new Error('Profile ID is required and must be a string');
  }

  // Check if it's an email address (common mistake)
  if (isEmail(profileId)) {
    throw new Error(
      `Invalid profile ID: Email address "${profileId}" cannot be used as a profile ID. ` +
      `Profile ID must be a valid UUID. Please provide the correct profile ID.`
    );
  }

  // Validate UUID format
  if (!isValidUUID(profileId)) {
    throw new Error(
      `Invalid UUID length: ${profileId.length}. ` +
      `Profile ID "${profileId}" is not a valid UUID format. ` +
      `UUIDs must be 36 characters (with hyphens) or 32 characters (without hyphens).`
    );
  }

  return profileId;
}

/**
 * Safely parses profile ID with fallback error handling
 * Returns null if invalid instead of throwing
 */
export function safeParseProfileId(profileId: string | undefined | null): string | null {
  try {
    return parseProfileId(profileId);
  } catch (error) {
    console.error('Profile ID parsing error:', error);
    return null;
  }
}
