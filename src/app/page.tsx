"use client";

import { ProtectedLayout } from "./components/ProtectedLayout";
import { useAuth } from "./lib/auth";
import Link from "next/link";

export default function Dashboard() {
  return (
    <ProtectedLayout>
      <DashboardContent />
    </ProtectedLayout>
  );
}

function DashboardContent() {
  const { user, isAdmin } = useAuth();

  const projects = [
    { id: 1, name: "MRI Remittance System", progress: 25, status: "In Progress", deadline: "2026-03-15", color: "blue" },
    { id: 2, name: "PocketPOS Landing Page", progress: 100, status: "Deployed", deadline: "2026-02-27", color: "green" },
    { id: 3, name: "PocketPOS Mobile App", progress: 0, status: "Planning", deadline: "2026-03-30", color: "amber" },
    { id: 4, name: "Bina Digital Website", progress: 0, status: "Backlog", deadline: "2026-04-15", color: "gray" },
  ];

  const agents = [
    { id: "samantha", name: "Samantha", emoji: "👩‍💻", role: "Lead Developer", task: "Building dashboard", progress: 60, status: "busy", color: "blue" },
    { id: "dylan", name: "Dylan", emoji: "📝", role: "Documentation", task: "Writing UAT docs", progress: 30, status: "busy", color: "purple" },
    { id: "tasha", name: "Tasha", emoji: "🧪", role: "QA Specialist", task: "Test planning", progress: 0, status: "available", color: "green" },
    { id: "mason", name: "Mason", emoji: "🚀", role: "DevOps", task: "Setup staging", progress: 0, status: "available", color: "orange" },
    { id: "priya", name: "Priya", emoji: "💼", role: "Business Strategy", task: "Revenue analysis", progress: 80, status: "busy", color: "pink" },
    { id: "ellie", name: "Ellie", emoji: "🎨", role: "UI/UX Design", task: "Dashboard UI", progress: 40, status: "busy", color: "teal" },
  ];

  const stats = [
    { label: "Total Projects", value: "4", change: "+2 this month", color: "blue" },
    { label: "Active Agents", value: "6", change: "100% utilized", color: "purple" },
    { label: "Tasks Today", value: "12", change: "8 in progress", color: "amber" },
    { label: "Upcoming Deadlines", value: "3", change: "Next: Feb 28", color: "red" },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      "Deployed": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      "In Progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Planning": "bg-amber-500/20 text-amber-400 border-amber-500/30",
      "Backlog": "bg-gray-500/20 text-gray-400 border-gray-500/30",
      "busy": "bg-red-500/20 text-red-400",
      "available": "bg-emerald-500/20 text-emerald-400",
    };
    return colors[status] || "bg-gray-500/20 text-gray-400";
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Welcome Banner */}
      <div className="mb-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Welcome back, {user?.name}! {user?.avatar}
            </h2>
            <p className="text-slate-400">
              {isAdmin 
                ? "You have full admin access to manage all projects and agents."
                : "You have view-only access to monitor project progress."}
            </p>
          </div>
          {isAdmin && (
            <Link
              href="/tasks"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors"
            >
              + New Task
            </Link>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link 
            key={stat.label} 
            href={stat.label === "Tasks Today" ? "/kanban" : stat.label === "Upcoming Deadlines" ? "/timeline" : "#"}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700 transition-colors block"
          >
            <p className="text-sm text-slate-400 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.change}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects Panel */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              📁 Active Projects
            </h2>
            <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-400">{projects.length} Projects</span>
          </div>

          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-slate-200">{project.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">Due: {project.deadline}</p>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-400 w-12 text-right">{project.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agents Panel */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              👥 Agent Activity
            </h2>
            <div className="flex gap-2">
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Available
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> Busy
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-slate-600 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-2xl">
                      {agent.emoji}
                    </div>
                    <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${agent.status === 'busy' ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-slate-200">{agent.name}</p>
                        <p className="text-xs text-slate-500">{agent.role}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(agent.status)}`}>
                        {agent.status}
                      </span>
                    </div>

                    <p className="text-sm text-slate-400 mt-2 truncate">{agent.task}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-slate-700 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                          style={{ width: `${agent.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-500 w-10 text-right">{agent.progress}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
