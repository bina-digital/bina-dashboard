"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "viewer";
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkPermission: (requiredRole: "admin" | "viewer") => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "syed@binadigital.com": {
    password: "bina2026!",
    user: {
      id: "1",
      email: "syed@binadigital.com",
      name: "Syed",
      role: "admin",
      avatar: "👤",
    },
  },
  "viewer@binadigital.com": {
    password: "viewonly2026",
    user: {
      id: "2",
      email: "viewer@binadigital.com",
      name: "Team Viewer",
      role: "viewer",
      avatar: "👀",
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check for existing session on mount
  useEffect(() => {
    const authData = localStorage.getItem("bina_auth");
    if (authData) {
      try {
        const parsed = JSON.parse(authData);
        if (parsed.expiresAt > Date.now()) {
          setUser(parsed.user);
        } else {
          localStorage.removeItem("bina_auth");
        }
      } catch {
        localStorage.removeItem("bina_auth");
      }
    }
    setIsLoading(false);
  }, []);

  // Redirect based on auth state
  useEffect(() => {
    if (!isLoading) {
      if (!user && pathname !== "/login" && pathname !== "/unauthorized") {
        router.push("/login");
      } else if (user && pathname === "/login") {
        router.push("/");
      }
    }
  }, [isLoading, user, pathname, router]);

  const login = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const userData = MOCK_USERS[email.toLowerCase()];

    if (!userData || userData.password !== password) {
      return { success: false, error: "Invalid email or password" };
    }

    localStorage.setItem("bina_auth", JSON.stringify({
      user: userData.user,
      token: "mock-jwt-token",
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    }));

    setUser(userData.user);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("bina_auth");
    setUser(null);
    router.push("/login");
  };

  const checkPermission = (requiredRole: "admin" | "viewer") => {
    if (!user) return false;
    if (user.role === "admin") return true; // Admin can do everything
    return user.role === requiredRole;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        logout,
        checkPermission,
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

// HOC for protecting routes
export function withAuth(Component: React.ComponentType, requiredRole: "admin" | "viewer" = "viewer") {
  return function AuthenticatedComponent(props: any) {
    const { user, isLoading, checkPermission } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !checkPermission(requiredRole)) {
        router.push("/unauthorized");
      }
    }, [isLoading, user, router]);

    if (isLoading) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <div className="text-slate-400">Loading...</div>
        </div>
      );
    }

    if (!checkPermission(requiredRole)) {
      return null;
    }

    return <Component {...props} />;
  };
}
