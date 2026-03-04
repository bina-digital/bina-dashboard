"use client";

import { useMemo, useState } from "react";
import { agents, projects, tasks as seedTasks, Task } from "@/lib/data";

type Col = Task["status"];
const cols: { key: Col; label: string }[] = [
  { key: "backlog", label: "Backlog" },
  { key: "in-progress", label: "In Progress" },
  { key: "review", label: "Review" },
  { key: "done", label: "Done" },
];

export default function KanbanPage() {
  const [items, setItems] = useState<Task[]>(seedTasks);
  const [projectFilter, setProjectFilter] = useState("all");
  const [agentFilter, setAgentFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState(agents[0]?.id ?? "");
  const [projectId, setProjectId] = useState(projects[0]?.id ?? "");
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return items.filter((t) =>
      (projectFilter === "all" || t.projectId === projectFilter) &&
      (agentFilter === "all" || t.assigneeAgentId === agentFilter)
    );
  }, [items, projectFilter, agentFilter]);

  function addTask() {
    if (!title.trim()) return;
    const newTask: Task = {
      id: `t-${Date.now()}`,
      title: title.trim(),
      assigneeAgentId: assignee,
      projectId,
      status: "backlog",
      priority: "medium",
      deadline: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    };
    setItems((prev) => [newTask, ...prev]);
    setTitle("");
  }

  function onDrop(status: Col) {
    if (!draggingId) return;
    setItems((prev) => prev.map((t) => (t.id === draggingId ? { ...t, status } : t)));
    setDraggingId(null);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold">Kanban Board</h1>
            <p className="text-slate-400">Drag and drop tasks across workflow stages.</p>
          </div>
          <a href="/dashboard" className="text-sm px-3 py-2 rounded bg-slate-800 hover:bg-slate-700">← Back to Dashboard</a>
        </header>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-3">
          <h2 className="font-semibold">Add Task</h2>
          <div className="grid md:grid-cols-4 gap-3">
            <input className="rounded bg-slate-800 p-2" placeholder="Task title" value={title} onChange={(e)=>setTitle(e.target.value)} />
            <select className="rounded bg-slate-800 p-2" value={projectId} onChange={(e)=>setProjectId(e.target.value)}>
              {projects.map((p)=><option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            <select className="rounded bg-slate-800 p-2" value={assignee} onChange={(e)=>setAssignee(e.target.value)}>
              {agents.map((a)=><option key={a.id} value={a.id}>{a.name}</option>)}
            </select>
            <button onClick={addTask} className="rounded bg-emerald-500 text-slate-950 font-semibold">Add</button>
          </div>
        </section>

        <section className="flex gap-3 flex-wrap">
          <select className="rounded bg-slate-800 p-2" value={projectFilter} onChange={(e)=>setProjectFilter(e.target.value)}>
            <option value="all">All Projects</option>
            {projects.map((p)=><option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          <select className="rounded bg-slate-800 p-2" value={agentFilter} onChange={(e)=>setAgentFilter(e.target.value)}>
            <option value="all">All Agents</option>
            {agents.map((a)=><option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </section>

        <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {cols.map((c) => {
            const colTasks = filtered.filter((t) => t.status === c.key);
            return (
              <div
                key={c.key}
                className="rounded-xl border border-slate-800 bg-slate-900 p-3 min-h-[380px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => onDrop(c.key)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{c.label}</h3>
                  <span className="text-xs text-slate-400">{colTasks.length}</span>
                </div>
                <div className="space-y-2">
                  {colTasks.map((t) => {
                    const owner = agents.find((a) => a.id === t.assigneeAgentId);
                    return (
                      <article
                        key={t.id}
                        draggable
                        onDragStart={() => setDraggingId(t.id)}
                        className="rounded-lg border border-slate-700 bg-slate-800 p-3 cursor-grab"
                      >
                        <p className="font-medium text-sm">{t.title}</p>
                        <p className="text-xs text-slate-400 mt-1">Assignee: {owner?.name ?? t.assigneeAgentId}</p>
                        <p className="text-xs text-slate-400">Due: {t.deadline}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
