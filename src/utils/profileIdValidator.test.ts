/**
 * Tests for Profile ID Validator
 */

import { isValidUUID, isEmail, parseProfileId, safeParseProfileId } from './profileIdValidator';

describe('Profile ID Validator', () => {
  describe('isValidUUID', () => {
    it('should validate UUID with hyphens', () => {
      expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
    });

    it('should validate UUID without hyphens', () => {
      expect(isValidUUID('123e4567e89b12d3a456426614174000')).toBe(true);
    });

    it('should reject email addresses', () => {
      expect(isValidUUID('islamyavuz09@gmail.com')).toBe(false);
    });

    it('should reject strings with wrong length', () => {
      expect(isValidUUID('short')).toBe(false);
      expect(isValidUUID('a'.repeat(22))).toBe(false); // The problematic length from error
      expect(isValidUUID('a'.repeat(35))).toBe(false);
    });

    it('should reject non-string values', () => {
      expect(isValidUUID(null as any)).toBe(false);
      expect(isValidUUID(undefined as any)).toBe(false);
      expect(isValidUUID(123 as any)).toBe(false);
    });
  });

  describe('isEmail', () => {
    it('should validate email addresses', () => {
      expect(isEmail('islamyavuz09@gmail.com')).toBe(true);
      expect(isEmail('test@example.com')).toBe(true);
    });

    it('should reject non-email strings', () => {
      expect(isEmail('123e4567-e89b-12d3-a456-426614174000')).toBe(false);
      expect(isEmail('not-an-email')).toBe(false);
    });
  });

  describe('parseProfileId', () => {
    it('should parse valid UUID with hyphens', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      expect(parseProfileId(uuid)).toBe(uuid);
    });

    it('should parse valid UUID without hyphens', () => {
      const uuid = '123e4567e89b12d3a456426614174000';
      expect(parseProfileId(uuid)).toBe(uuid);
    });

    it('should throw error for email addresses', () => {
      expect(() => parseProfileId('islamyavuz09@gmail.com')).toThrow(
        'Email address "islamyavuz09@gmail.com" cannot be used as a profile ID'
      );
    });

    it('should throw error for invalid UUID length', () => {
      const invalidId = 'a'.repeat(22); // The problematic length
      expect(() => parseProfileId(invalidId)).toThrow('Invalid UUID length: 22');
    });

    it('should throw error for null/undefined', () => {
      expect(() => parseProfileId(null as any)).toThrow('Profile ID is required');
      expect(() => parseProfileId(undefined as any)).toThrow('Profile ID is required');
    });
  });

  describe('safeParseProfileId', () => {
    it('should return null for invalid profile IDs', () => {
      expect(safeParseProfileId('islamyavuz09@gmail.com')).toBeNull();
      expect(safeParseProfileId('invalid')).toBeNull();
    });

    it('should return UUID for valid profile IDs', () => {
      const uuid = '123e4567-e89b-12d3-a456-426614174000';
      expect(safeParseProfileId(uuid)).toBe(uuid);
    });
  });
});
