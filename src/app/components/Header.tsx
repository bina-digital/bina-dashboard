"use client";

import { useAuth } from "../lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const { user, logout, isAdmin } = useAuth();
  const pathname = usePathname();

  // Don't show header on login page
  if (pathname === "/login") return null;

  const navItems = [
    { href: "/", label: "Dashboard", icon: "📊" },
    { href: "/kanban", label: "Kanban", icon: "📋" },
    { href: "/timeline", label: "Timeline", icon: "📅" },
    { href: "/tasks", label: "Tasks", icon: "✅", adminOnly: false },
    { href: "/analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo & Nav */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
                🎯
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Bina Digital
                </h1>
                <p className="text-xs text-slate-400">Command Center</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                if (item.adminOnly && !isAdmin) return null;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      pathname === item.href
                        ? "bg-slate-800 text-slate-200"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                    }`}
                  >
                    <span className="mr-1">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Role Badge */}
            <div className="hidden sm:flex items-center gap-2">
              <span
                className={`text-xs px-2 py-1 rounded-full border ${
                  isAdmin
                    ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
                    : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                }`}
              >
                {isAdmin ? "👑 Admin" : "👁️ Viewer"}
              </span>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-slate-200">{user?.name}</p>
                <p className="text-xs text-slate-500">{user?.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xl">
                {user?.avatar}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Sign Out"
            >
              🚪
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <nav className="md:hidden flex gap-1 mt-4 overflow-x-auto pb-2">
          {navItems.map((item) => {
            if (item.adminOnly && !isAdmin) return null;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                  pathname === item.href
                    ? "bg-slate-800 text-slate-200"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
