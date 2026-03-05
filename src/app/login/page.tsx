"use client";

import { useState } from "react";
import { useAuth } from "../lib/auth";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error || "Login failed");
    }
    // Navigation handled by AuthProvider

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl mb-4">
            🎯
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Bina Digital</h1>
          <p className="text-slate-400">Command Center</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Welcome Back</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="syed@binadigital.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-3 font-medium text-white transition-all"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800">
            <p className="text-xs text-slate-500 text-center mb-3">Demo Credentials</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-slate-800/50 rounded-lg px-3 py-2">
                <span className="text-slate-400">👤 Admin: syed@binadigital.com</span>
                <button
                  type="button"
                  onClick={() => { setEmail("syed@binadigital.com"); setPassword("bina2026!"); }}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Fill
                </button>
              </div>
              <div className="flex items-center justify-between bg-slate-800/50 rounded-lg px-3 py-2">
                <span className="text-slate-400">👀 Viewer: viewer@binadigital.com</span>
                <button
                  type="button"
                  onClick={() => { setEmail("viewer@binadigital.com"); setPassword("viewonly2026"); }}
                  className="text-blue-400 hover:text-blue-300"
                >
                  Fill
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Secured by Bina Digital Auth System
        </p>
      </div>
    </div>
  );
}
