"use client";

import { useState } from "react";
import { ProtectedLayout } from "../components/ProtectedLayout";

interface Task {
  id: string;
  title: string;
  assignee: string;
  assigneeEmoji: string;
  deadline: string;
  priority: "high" | "medium" | "low";
  progress: number;
  project: string;
  description?: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const agentOptions = [
  { id: "samantha", name: "Samantha", emoji: "👩‍💻" },
  { id: "dylan", name: "Dylan", emoji: "📝" },
  { id: "tasha", name: "Tasha", emoji: "🧪" },
  { id: "mason", name: "Mason", emoji: "🚀" },
  { id: "priya", name: "Priya", emoji: "💼" },
  { id: "ellie", name: "Ellie", emoji: "🎨" },
];

const projectOptions = ["MRI Remittance", "PocketPOS", "Bina Digital", "ReadyLah"];

const priorityColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function TasksPage() {
  return (
    <ProtectedLayout requiredRole="admin">
      <TaskManager />
    </ProtectedLayout>
  );
}

function TaskManager() {
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "backlog",
      title: "📋 Backlog",
      tasks: [
        { id: "t1", title: "Set up WhatsApp Business API", assignee: "Mason", assigneeEmoji: "🚀", deadline: "2026-03-02", priority: "high", progress: 0, project: "MRI Remittance", description: "Configure 360dialog or Meta Business API" },
        { id: "t2", title: "Design admin dashboard mockups", assignee: "Ellie", assigneeEmoji: "🎨", deadline: "2026-03-03", priority: "medium", progress: 0, project: "MRI Remittance", description: "Figma designs for admin panel" },
      ],
    },
    {
      id: "in-progress",
      title: "🔨 In Progress",
      tasks: [
        { id: "t3", title: "Build Command Center dashboard", assignee: "Samantha", assigneeEmoji: "👩‍💻", deadline: "2026-02-28", priority: "high", progress: 60, project: "Bina Digital", description: "Next.js app with Kanban and Timeline" },
        { id: "t4", title: "Write UAT documentation", assignee: "Dylan", assigneeEmoji: "📝", deadline: "2026-03-01", priority: "medium", progress: 30, project: "MRI Remittance", description: "User acceptance testing docs" },
      ],
    },
    {
      id: "review",
      title: "👀 Review",
      tasks: [
        { id: "t5", title: "Revenue analysis report", assignee: "Priya", assigneeEmoji: "💼", deadline: "2026-02-27", priority: "high", progress: 80, project: "MRI Remittance", description: "RM4 per transaction analysis" },
      ],
    },
    {
      id: "done",
      title: "✅ Done",
      tasks: [
        { id: "t6", title: "Deploy PocketPOS landing", assignee: "Mason", assigneeEmoji: "🚀", deadline: "2026-02-26", priority: "high", progress: 100, project: "PocketPOS", description: "Live at pocketpos-landing.vercel.app" },
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<Partial<Task>>({
    title: "",
    assignee: "Samantha",
    assigneeEmoji: "👩‍💻",
    deadline: new Date().toISOString().split("T")[0],
    priority: "medium",
    progress: 0,
    project: "Bina Digital",
    description: "",
  });

  const openCreateModal = () => {
    setEditingTask(null);
    setFormData({
      title: "",
      assignee: "Samantha",
      assigneeEmoji: "👩‍💻",
      deadline: new Date().toISOString().split("T")[0],
      priority: "medium",
      progress: 0,
      project: "Bina Digital",
      description: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setFormData({ ...task });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const selectedAgent = agentOptions.find(a => a.name === formData.assignee);
    const taskData: Task = {
      id: editingTask?.id || `t${Date.now()}`,
      title: formData.title || "",
      assignee: formData.assignee || "Samantha",
      assigneeEmoji: selectedAgent?.emoji || "👤",
      deadline: formData.deadline || new Date().toISOString().split("T")[0],
      priority: (formData.priority as "high" | "medium" | "low") || "medium",
      progress: formData.progress || 0,
      project: formData.project || "Bina Digital",
      description: formData.description || "",
    };

    if (editingTask) {
      setColumns(prev => prev.map(col => ({
        ...col,
        tasks: col.tasks.map(t => t.id === editingTask.id ? taskData : t),
      })));
    } else {
      setColumns(prev => prev.map(col =>
        col.id === "backlog" ? { ...col, tasks: [...col.tasks, taskData] } : col
      ));
    }

    setIsModalOpen(false);
  };

  const deleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setColumns(prev => prev.map(col => ({
        ...col,
        tasks: col.tasks.filter(t => t.id !== taskId),
      })));
    }
  };

  const moveTask = (taskId: string, fromColumn: string, toColumn: string) => {
    if (fromColumn === toColumn) return;

    setColumns(prev => {
      const task = prev.find(c => c.id === fromColumn)?.tasks.find(t => t.id === taskId);
      if (!task) return prev;

      const updatedTask = { ...task };
      if (toColumn === "done") updatedTask.progress = 100;

      return prev.map(col => {
        if (col.id === fromColumn) {
          return { ...col, tasks: col.tasks.filter(t => t.id !== taskId) };
        }
        if (col.id === toColumn) {
          return { ...col, tasks: [...col.tasks, updatedTask] };
        }
        return col;
      });
    });
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Task Manager</h1>
          <p className="text-slate-400">Create, edit, and organize tasks</p>
        </div>
        <button 
          onClick={openCreateModal}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <span>+</span> New Task
        </button>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Task</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Assignee</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Project</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Priority</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Progress</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Deadline</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {columns.flatMap(col => col.tasks.map(task => (
                <tr key={task.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-200">{task.title}</p>
                      {task.description && (
                        <p className="text-xs text-slate-500 mt-1">{task.description}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span>{task.assigneeEmoji}</span>
                      <span className="text-slate-300">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-700/50 text-slate-400 px-2 py-1 rounded">
                      {task.project}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded border ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={columns.find(c => c.tasks.some(t => t.id === task.id))?.id}
                      onChange={(e) => {
                        const fromCol = columns.find(c => c.tasks.some(t => t.id === task.id))?.id;
                        if (fromCol) moveTask(task.id, fromCol, e.target.value);
                      }}
                      className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-sm text-slate-300"
                    >
                      <option value="backlog">📋 Backlog</option>
                      <option value="in-progress">🔨 In Progress</option>
                      <option value="review">👀 Review</option>
                      <option value="done">✅ Done</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500">{task.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-400">{task.deadline}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(task)}
                        className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-8">
        {columns.map(col => (
          <div key={col.id} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{col.tasks.length}</p>
            <p className="text-sm text-slate-400">{col.title}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-6">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Assignee</label>
                  <select
                    value={formData.assignee}
                    onChange={(e) => {
                      const agent = agentOptions.find(a => a.name === e.target.value);
                      setFormData({ 
                        ...formData, 
                        assignee: e.target.value,
                        assigneeEmoji: agent?.emoji || "👤"
                      });
                    }}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
                  >
                    {agentOptions.map(agent => (
                      <option key={agent.id} value={agent.name}>
                        {agent.emoji} {agent.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Project</label>
                  <select
                    value={formData.project}
                    onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
                  >
                    {projectOptions.map(project => (
                      <option key={project} value={project}>{project}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as "high" | "medium" | "low" })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
                  >
                    <option value="high">🔴 High</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="low">🔵 Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-slate-400 mb-1">Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Progress: {formData.progress}%</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.progress}
                  onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 h-20 resize-none"
                  placeholder="Add task description..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors"
                >
                  {editingTask ? "Save Changes" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
