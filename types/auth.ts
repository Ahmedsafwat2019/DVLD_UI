/**
 * Authentication & User Types
 */

export interface User {
  userName: string;
  userRole: string;
  personID?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

export interface UserResponse {
  userName: string;
  role: string;
  personID?: string;
}
