"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface User {
  userName: string;
  userRole: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchUserCredential = async () => {
      try {
        // Add a delay to prevent conflicts with Next.js routing
        await new Promise((resolve) => setTimeout(resolve, 200));

        const response = await fetch("http://localhost:5240/api/Account/Me", {
          credentials: "include",
        });

        if (!response.ok) {
          console.error("Failed to fetch user", response.statusText);
          setUser(null);
          setIsAuthenticated(false);
          setIsInitialized(true);
          return;
        }

        const contentType = response.headers.get("Content-Type") || "";
        let result: any;

        if (contentType.includes("application/json")) {
          result = await response.json();
        } else {
          result = await response.text();
        }

        console.log("User data received:", result); // Debug log

        // Check if the response has the expected structure
        if (result && result.success && result.data && result.data.userName) {
          console.log("Setting user data:", {
            userName: result.data.userName,
            userRole: result.data.role || "user",
          });
          setUser({
            userName: result.data.userName,
            userRole: result.data.role || "user",
          });
          setIsAuthenticated(true);
        } else {
          console.error("Invalid user data structure:", result);
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsInitialized(true);
      }
    };

    // Only fetch if we're in the browser and not during SSR
    if (typeof window !== "undefined" && !isInitialized) {
      fetchUserCredential();
    }
  }, [isInitialized]);

  const logout = async () => {
    try {
      await fetch("http://localhost:5240/api/Auth/Logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, logout }}>
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
