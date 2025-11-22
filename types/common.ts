/**
 * Common & Shared Types
 */

import type { ReactNode } from "react";

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Action response for server actions with error handling
 */
export interface ActionResponse<T = null> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details?: Record<string, string[]>;
  };
  status?: number;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Table column configuration
 */
export interface TableColumn<T = any> {
  key: string;
  title: string;
  sortable?: boolean;
  render?: (value: any, record: T) => ReactNode;
}

/**
 * Common entity states
 */
export enum EntityState {
  Active = 1,
  Inactive = 0,
  Deleted = -1,
}

/**
 * Gender enum
 */
export type Gender = "male" | "female" | "unknown";

/**
 * Base entity interface with common fields
 */
export interface BaseEntity {
  id: string;
  currentState: number;
  createdDate?: string;
  createdBy?: string;
  updatedDate?: string | null;
  updatedBy?: string | null;
}
