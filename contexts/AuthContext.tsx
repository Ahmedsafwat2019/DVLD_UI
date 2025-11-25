"use client";

import { api } from "@/lib/api";
import logger from "@/lib/logger";
import { AuthContextType, User, UserResponse } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserCredential = async () => {
    try {
      setIsLoading(true);
      const response = await api.account.me();

      console.log("User is:", response);

      if (!response.ok) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      const result = await response.json();

      if (!result.success) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      if (!result.data) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      const userData = result.data as UserResponse;

      if (!userData.userName || !userData.role) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }

      setUser({
        userName: userData.userName,
        userRole: userData.role,
        personID: userData.personID,
      });
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchUserCredential();
    }
  }, []);

  const logout = async () => {
    try {
      const response = await api.auth.logout();
      const result = await response.json();

      console.log(response);
      console.log(result);

      //   if (!result.success) {
      //     logger.error("Logout request failed but clearing local state anyway");
      //   } else {
      //     logger.info("User logged out successfully");
      //   }
    } catch (err) {
      logger.error({ err }, "Logout failed");
    }
    // finally {
    //   setUser(null);
    //   setIsAuthenticated(false);
    // }
  };

  const refreshAuth = async () => {
    logger.info("Refreshing authentication state");
    await fetchUserCredential();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
