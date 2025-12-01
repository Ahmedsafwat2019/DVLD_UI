/**
 * Central Type Exports
 *
 * This file serves as the main entry point for all TypeScript types.
 * Import types from here rather than individual files for better maintainability.
 *
 * Example:
 * import type { User, ActionResponse, City } from '@/types';
 */

// Auth & User Types
export type {
  User,
  AuthContextType,
  UserResponse,
} from "./auth";

// Location Types
export type {
  Country,
  City,
} from "./location";

// Person Types
export type {
  Person,
} from "./person";

// License & Application Types
export type {
  LicenseClass,
  LocalDrivingLicenseApplication,
  Application,
  ApplicationType,
  ApplicationWithDetails,
  PersonDetails,
} from "./license";

// Test & Appointment Types
export type {
  TestAppointment,
  TestAppointmentView,
  TestResult,
} from "./test";

// CMS & Marketing Types
export type {
  Author,
  Blog,
  Brand,
  Feature,
  Testimonial,
  Menu,
  MenuItem,
} from "./cms";

// Common & Shared Types
export type {
  ApiResponse,
  ActionResponse,
  PaginationParams,
  PaginatedResponse,
  TableColumn,
  Gender,
  BaseEntity,
} from "./common";

export {
  EntityState,
} from "./common";
