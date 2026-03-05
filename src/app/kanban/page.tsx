"use client";

import { useState } from "react";
import { ProtectedLayout } from "../components/ProtectedLayout";
import { useAuth } from "../lib/auth";

interface Task {
  id: string;
  title: string;
  assignee: string;
  assigneeEmoji: string;
  deadline: string;
  priority: "high" | "medium" | "low";
  progress: number;
  project: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: "backlog",
    title: "📋 Backlog",
    tasks: [
      { id: "t1", title: "Set up WhatsApp Business API", assignee: "Mason", assigneeEmoji: "🚀", deadline: "Mar 2", priority: "high", progress: 0, project: "MRI Remittance" },
      { id: "t2", title: "Design admin dashboard mockups", assignee: "Ellie", assigneeEmoji: "🎨", deadline: "Mar 3", priority: "medium", progress: 0, project: "MRI Remittance" },
    ],
  },
  {
    id: "in-progress",
    title: "🔨 In Progress",
    tasks: [
      { id: "t3", title: "Build Command Center dashboard", assignee: "Samantha", assigneeEmoji: "👩‍💻", deadline: "Feb 28", priority: "high", progress: 60, project: "Bina Digital" },
      { id: "t4", title: "Write UAT documentation", assignee: "Dylan", assigneeEmoji: "📝", deadline: "Mar 1", priority: "medium", progress: 30, project: "MRI Remittance" },
    ],
  },
  {
    id: "review",
    title: "👀 Review",
    tasks: [
      { id: "t5", title: "Revenue analysis report", assignee: "Priya", assigneeEmoji: "💼", deadline: "Feb 27", priority: "high", progress: 80, project: "MRI Remittance" },
    ],
  },
  {
    id: "done",
    title: "✅ Done",
    tasks: [
      { id: "t6", title: "Deploy PocketPOS landing", assignee: "Mason", assigneeEmoji: "🚀", deadline: "Feb 26", priority: "high", progress: 100, project: "PocketPOS" },
    ],
  },
];

const priorityColors = {
  high: "bg-red-500/20 text-red-400 border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
};

export default function KanbanPage() {
  return (
    <ProtectedLayout>
      <KanbanContent />
    </ProtectedLayout>
  );
}

function KanbanContent() {
  const { isAdmin } = useAuth();
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);

  const handleDragStart = (task: Task, fromColumn: string) => {
    if (!isAdmin) return;
    setDraggedTask(task);
    setDraggedFrom(fromColumn);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, toColumnId: string) => {
    e.preventDefault();
    if (!isAdmin || !draggedTask || !draggedFrom) return;

    if (draggedFrom === toColumnId) {
      setDraggedTask(null);
      setDraggedFrom(null);
      return;
    }

    setColumns((prev) => {
      const newColumns = prev.map((col) => {
        if (col.id === draggedFrom) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== draggedTask.id) };
        }
        if (col.id === toColumnId) {
          const updatedTask = { ...draggedTask };
          if (toColumnId === "done") updatedTask.progress = 100;
          return { ...col, tasks: [...col.tasks, updatedTask] };
        }
        return col;
      });
      return newColumns;
    });

    setDraggedTask(null);
    setDraggedFrom(null);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {!isAdmin && (
        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-400 text-sm">
          👁️ View-only mode. Contact an admin to make changes.
        </div>
      )}

      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div
            key={column.id}
            className="min-w-80 flex-shrink-0"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-slate-200">{column.title}</h2>
              <span className="text-xs bg-slate-800 px-2 py-1 rounded-full text-slate-400">
                {column.tasks.length}
              </span>
            </div>

            {/* Tasks */}
            <div className="space-y-3 min-h-32">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  draggable={isAdmin}
                  onDragStart={() => handleDragStart(task, column.id)}
                  className={`bg-slate-800/80 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600 transition-all hover:shadow-lg group ${
                    isAdmin ? "cursor-move" : "cursor-default"
                  }`}
                >
                  {/* Task Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-slate-200 text-sm leading-relaxed">
                      {task.title}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded border ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>

                  {/* Project Tag */}
                  <div className="mb-3">
                    <span className="text-xs bg-slate-700/50 text-slate-400 px-2 py-1 rounded">
                      {task.project}
                    </span>
                  </div>

                  {/* Task Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{task.assigneeEmoji}</span>
                      <span className="text-xs text-slate-400">{task.assignee}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">📅 {task.deadline}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {task.progress > 0 && (
                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-700 rounded-full h-1.5">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 w-8 text-right">{task.progress}%</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
