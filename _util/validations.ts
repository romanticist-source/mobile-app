import { z } from 'zod';

/**
 * Common Zod validation schemas for reuse across the application
 */

// Email validation
export const emailSchema = z
  .string()
  .email({ message: 'Invalid email address format' })
  .min(1, { message: 'Email is required' });

// Optional email validation
export const optionalEmailSchema = z
  .string()
  .email({ message: 'Invalid email address format' })
  .optional()
  .or(z.literal(''));

// Phone number validation (Japanese format)
// Supports formats: 090-1234-5678, 03-1234-5678, 0120-123-456, etc.
export const phoneNumberSchema = z
  .string()
  .min(1, { message: 'Phone number is required' })
  .regex(
    /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/,
    { message: 'Invalid phone number format (e.g., 090-1234-5678 or 03-1234-5678)' }
  );

// Optional phone number validation
export const optionalPhoneNumberSchema = z
  .string()
  .regex(
    /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/,
    { message: 'Invalid phone number format (e.g., 090-1234-5678 or 03-1234-5678)' }
  )
  .optional()
  .or(z.literal(''));

// Name validation
export const nameSchema = z
  .string()
  .min(1, { message: 'Name is required' })
  .max(100, { message: 'Name must be 100 characters or less' });

// Optional name validation
export const optionalNameSchema = z
  .string()
  .min(1, { message: 'Name must be at least 1 character' })
  .max(100, { message: 'Name must be 100 characters or less' })
  .optional();

// ID validation (UUID or string)
export const idSchema = z.string().min(1, { message: 'ID is required' });

// User ID validation
export const userIdSchema = z.string().min(1, { message: 'User ID is required' });

// Relationship validation (e.g., spouse, parent, child, friend, etc.)
export const relationshipSchema = z
  .string()
  .min(1, { message: 'Relationship is required' })
  .max(50, { message: 'Relationship must be 50 characters or less' });

// Optional relationship validation
export const optionalRelationshipSchema = z
  .string()
  .min(1, { message: 'Relationship must be at least 1 character' })
  .max(50, { message: 'Relationship must be 50 characters or less' })
  .optional();

// Address validation
export const addressSchema = z
  .string()
  .min(1, { message: 'Address is required' })
  .max(200, { message: 'Address must be 200 characters or less' });

// Optional address validation
export const optionalAddressSchema = z
  .string()
  .min(1, { message: 'Address must be at least 1 character' })
  .max(200, { message: 'Address must be 200 characters or less' })
  .optional();

// Boolean validation
export const booleanSchema = z.boolean();

// Optional boolean validation
export const optionalBooleanSchema = z.boolean().optional();

// Date/timestamp validation
export const dateSchema = z.date();

// Optional date/timestamp validation
export const optionalDateSchema = z.date().optional();

// ISO date string validation
export const isoDateStringSchema = z.string().datetime({ message: 'Invalid ISO date format' });

// Optional ISO date string validation
export const optionalIsoDateStringSchema = z
  .string()
  .datetime({ message: 'Invalid ISO date format' })
  .optional();

// Title validation
export const titleSchema = z
  .string()
  .min(1, { message: 'Title is required' })
  .max(200, { message: 'Title must be 200 characters or less' });

// Optional title validation
export const optionalTitleSchema = z
  .string()
  .min(1, { message: 'Title must be at least 1 character' })
  .max(200, { message: 'Title must be 200 characters or less' })
  .optional();

// Nullable title validation
export const nullableTitleSchema = z
  .string()
  .min(1, { message: 'Title must be at least 1 character' })
  .max(200, { message: 'Title must be 200 characters or less' })
  .nullable();

// Description validation
export const descriptionSchema = z
  .string()
  .min(1, { message: 'Description is required' })
  .max(1000, { message: 'Description must be 1000 characters or less' });

// Optional description validation
export const optionalDescriptionSchema = z
  .string()
  .min(1, { message: 'Description must be at least 1 character' })
  .max(1000, { message: 'Description must be 1000 characters or less' })
  .optional();

// Nullable description validation
export const nullableDescriptionSchema = z
  .string()
  .min(1, { message: 'Description must be at least 1 character' })
  .max(1000, { message: 'Description must be 1000 characters or less' })
  .nullable();

// Number validation
export const numberSchema = z.number();

// Optional number validation
export const optionalNumberSchema = z.number().optional();

// Positive number validation
export const positiveNumberSchema = z
  .number()
  .positive({ message: 'Must be a positive number' });

// Optional positive number validation
export const optionalPositiveNumberSchema = z
  .number()
  .positive({ message: 'Must be a positive number' })
  .optional();

// Age validation (0-150)
export const ageSchema = z
  .number()
  .int({ message: 'Age must be an integer' })
  .min(0, { message: 'Age must be at least 0' })
  .max(150, { message: 'Age must be 150 or less' });

// Optional age validation
export const optionalAgeSchema = z
  .number()
  .int({ message: 'Age must be an integer' })
  .min(0, { message: 'Age must be at least 0' })
  .max(150, { message: 'Age must be 150 or less' })
  .optional();

// Password validation (minimum 8 characters)
export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(100, { message: 'Password must be 100 characters or less' });

// Optional password validation
export const optionalPasswordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters' })
  .max(100, { message: 'Password must be 100 characters or less' })
  .optional();

// Nickname validation
export const nicknameSchema = z
  .string()
  .min(1, { message: 'Nickname is required' })
  .max(50, { message: 'Nickname must be 50 characters or less' });

// Optional nickname validation
export const optionalNicknameSchema = z
  .string()
  .min(1, { message: 'Nickname must be at least 1 character' })
  .max(50, { message: 'Nickname must be 50 characters or less' })
  .optional();

// Comment validation
export const commentSchema = z
  .string()
  .min(1, { message: 'Comment is required' })
  .max(500, { message: 'Comment must be 500 characters or less' });

// Optional comment validation
export const optionalCommentSchema = z
  .string()
  .min(1, { message: 'Comment must be at least 1 character' })
  .max(500, { message: 'Comment must be 500 characters or less' })
  .optional();

// Nullable comment validation
export const nullableCommentSchema = z
  .string()
  .min(1, { message: 'Comment must be at least 1 character' })
  .max(500, { message: 'Comment must be 500 characters or less' })
  .nullable();

// Nullable string validation
export const nullableStringSchema = z.string().nullable();

// Optional nullable string validation
export const optionalNullableStringSchema = z.string().nullable().optional();
