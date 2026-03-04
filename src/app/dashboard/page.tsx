import { agents, projects } from "@/lib/data";

export default function DashboardPage() {
  const statusPill: Record<string, string> = {
    active: "bg-emerald-500/20 text-emerald-300",
    busy: "bg-amber-500/20 text-amber-300",
    idle: "bg-slate-500/20 text-slate-300",
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-2xl font-bold">Bina Command Center</h1>
          <p className="text-slate-400">Agents and projects are now wired into this dashboard view.</p>
        </header>

        <section>
          <h2 className="text-lg font-semibold mb-3">Permanent Agents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((a) => (
              <article key={a.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">{a.emoji} {a.name}</div>
                  <span className={`text-xs px-2 py-1 rounded ${statusPill[a.status]}`}>{a.status}</span>
                </div>
                <p className="text-sm text-slate-300 mt-2">{a.role}</p>
                <p className="text-xs text-slate-400 mt-1">{a.focus}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-3">Projects</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((p) => {
              const owner = agents.find((a) => a.id === p.ownerAgentId);
              return (
                <article key={p.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{p.name}</h3>
                    <span className="text-xs text-slate-300">{p.status}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">Owner: {owner?.name ?? p.ownerAgentId}</p>
                  <div className="mt-3">
                    <div className="h-2 bg-slate-800 rounded overflow-hidden">
                      <div className="h-full bg-cyan-400" style={{ width: `${p.progress}%` }} />
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Progress {p.progress}% • Priority {p.priority}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
