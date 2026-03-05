"use client";

import { useAuth } from "../lib/auth";
import Link from "next/link";

export default function Unauthorized() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Denied</h1>
        <p className="text-slate-400 mb-6">
          Sorry {user?.name}, you don&apos;t have permission to access this page.
          This area requires admin privileges.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors"
          >
            Go Home
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-lg transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
