"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) return;
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <h1 className="text-xl font-semibold">Bina Dashboard Login</h1>
        <p className="text-sm text-slate-400">Command Center access</p>
        <input className="w-full rounded bg-slate-800 p-2" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input type="password" className="w-full rounded bg-slate-800 p-2" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button className="w-full rounded bg-emerald-500 p-2 font-medium text-slate-950">Login</button>
      </form>
    </main>
  );
}
