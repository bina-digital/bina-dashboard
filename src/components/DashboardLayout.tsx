"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/kanban", label: "Kanban", icon: "🗂️" },
  { href: "/timeline", label: "Timeline", icon: "📅" },
  { href: "/transactions", label: "Transactions", icon: "💰" },
  { href: "/customers", label: "Customers", icon: "👥" },
  { href: "/loyalty", label: "Loyalty Program", icon: "🎁" },
  { href: "/broadcast", label: "Broadcast", icon: "📢" },
  { href: "/analytics", label: "Analytics", icon: "📈" },
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } bg-slate-900 border-r border-slate-800 transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xl">
              🦁
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-lg">Bina</h1>
                <p className="text-xs text-slate-400">Command Center</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-4 border-t border-slate-800 text-slate-400 hover:text-slate-200"
        >
          {sidebarOpen ? "◀" : "▶"}
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              System Online
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">Syed</p>
              <p className="text-xs text-slate-400">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600"></div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
