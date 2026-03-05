"use client";

import { useEffect } from "react";
import { useAuth } from "../lib/auth";
import { useRouter } from "next/navigation";
import { Header } from "./Header";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "viewer";
}

export function ProtectedLayout({ children, requiredRole = "viewer" }: ProtectedLayoutProps) {
  const { user, isLoading, checkPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/login");
      } else if (!checkPermission(requiredRole)) {
        router.push("/unauthorized");
      }
    }
  }, [isLoading, user, requiredRole, router, checkPermission]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!checkPermission(requiredRole)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>{children}</main>
    </div>
  );
}
