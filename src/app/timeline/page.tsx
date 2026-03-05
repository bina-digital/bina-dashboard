"use client";

import { useState } from "react";
import { ProtectedLayout } from "../components/ProtectedLayout";

interface TimelineItem {
  id: string;
  name: string;
  start: string;
  end: string;
  progress: number;
  status: "planning" | "in-progress" | "deployed" | "completed";
  assignees: string[];
  type: "project" | "task" | "milestone";
}

const timelineData: TimelineItem[] = [
  { id: "p1", name: "MRI Remittance System", start: "2026-02-27", end: "2026-03-15", progress: 25, status: "in-progress", assignees: ["Samantha", "Ellie", "Tasha"], type: "project" },
  { id: "p2", name: "PocketPOS Landing", start: "2026-02-20", end: "2026-02-27", progress: 100, status: "deployed", assignees: ["Ellie", "Mason"], type: "project" },
  { id: "p3", name: "PocketPOS Mobile App", start: "2026-03-01", end: "2026-03-30", progress: 0, status: "planning", assignees: ["Samantha", "Ellie"], type: "project" },
  { id: "p4", name: "Bina Digital Website", start: "2026-03-15", end: "2026-04-15", progress: 0, status: "planning", assignees: ["Ellie"], type: "project" },
  { id: "t1", name: "Build Dashboard MVP", start: "2026-02-27", end: "2026-02-28", progress: 60, status: "in-progress", assignees: ["Samantha"], type: "task" },
  { id: "t2", name: "Write UAT Docs", start: "2026-02-27", end: "2026-03-01", progress: 30, status: "in-progress", assignees: ["Dylan"], type: "task" },
  { id: "m1", name: "MRI MVP Launch", start: "2026-03-15", end: "2026-03-15", progress: 0, status: "planning", assignees: [], type: "milestone" },
];

const statusColors = {
  planning: "bg-amber-500",
  "in-progress": "bg-blue-500",
  deployed: "bg-emerald-500",
  completed: "bg-purple-500",
};

const statusBgColors = {
  planning: "bg-amber-500/20",
  "in-progress": "bg-blue-500/20",
  deployed: "bg-emerald-500/20",
  completed: "bg-purple-500/20",
};

export default function TimelinePage() {
  return (
    <ProtectedLayout>
      <TimelineContent />
    </ProtectedLayout>
  );
}

function TimelineContent() {
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  
  const startDate = new Date("2026-02-20");
  const endDate = new Date("2026-04-20");
  const dates: Date[] = [];
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  
  const daysTotal = dates.length;
  
  const visibleDates = viewMode === "week" 
    ? dates.filter((d, i) => i % 3 === 0)
    : dates.filter((d) => d.getDate() === 1 || d.getDate() === 15);

  const getPosition = (dateStr: string) => {
    const date = new Date(dateStr);
    const diff = date.getTime() - startDate.getTime();
    const days = diff / (1000 * 3600 * 24);
    return (days / daysTotal) * 100;
  };

  const getWidth = (start: string, end: string) => {
    const startPos = getPosition(start);
    const endPos = getPosition(end);
    return Math.max(endPos - startPos, 1);
  };

  const today = new Date("2026-02-27");
  const todayPosition = getPosition(today.toISOString().split("T")[0]);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Legend */}
      <div className="flex items-center gap-6 mb-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-amber-500"></span>
          <span className="text-slate-400">Planning</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-blue-500"></span>
          <span className="text-slate-400">In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-emerald-500"></span>
          <span className="text-slate-400">Deployed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-purple-500"></span>
          <span className="text-slate-400">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500"></span>
          <span className="text-slate-400">Milestone</span>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("week")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "week" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewMode("month")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                viewMode === "month" ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              Month
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-full" style={{ width: `${Math.max(daysTotal * 3, 800)}px` }}>
            {/* Date Header */}
            <div className="flex border-b border-slate-800">
              <div className="w-64 flex-shrink-0 p-4 border-r border-slate-800 bg-slate-900/80">
                <span className="text-sm font-medium text-slate-400">Project / Task</span>
              </div>
              <div className="flex-1 relative">
                <div className="flex h-12">
                  {visibleDates.map((date, i) => (
                    <div
                      key={i}
                      className="flex-1 border-r border-slate-800/50 flex items-center justify-center text-xs text-slate-500"
                      style={{ minWidth: viewMode === "week" ? "60px" : "100px" }}
                    >
                      {date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                  ))}
                </div>
                
                <div
                  className="absolute top-0 bottom-0 w-px bg-red-500 z-10"
                  style={{ left: `${todayPosition}%` }}
                >
                  <div className="absolute -top-1 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-0.5 rounded">
                    Today
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Items */}
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={`flex items-center ${index % 2 === 0 ? "bg-slate-800/30" : ""} hover:bg-slate-800/50 transition-colors`}
              >
                <div className="w-64 flex-shrink-0 p-4 border-r border-slate-800">
                  <div className="flex items-center gap-2">
                    <span>{item.type === "project" ? "📁" : item.type === "milestone" ? "🎯" : "⚡"}</span>
                    <span className={`font-medium truncate ${item.type === "project" ? "text-slate-200" : "text-slate-400"}`}>
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 ml-6">
                    <span className={`text-xs px-2 py-0.5 rounded ${statusBgColors[item.status]}`}>
                      {item.status}
                    </span>
                    {item.assignees.length > 0 && (
                      <span className="text-xs text-slate-500">{item.assignees.join(", ")}</span>
                    )}
                  </div>
                </div>

                <div className="flex-1 relative h-16">
                  {item.type === "milestone" ? (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                      style={{ left: `${getPosition(item.start)}%` }}
                    >
                      <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-slate-900 shadow-lg"></div>
                    </div>
                  ) : (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-8 rounded-lg overflow-hidden"
                      style={{
                        left: `${getPosition(item.start)}%`,
                        width: `${Math.max(getWidth(item.start, item.end), 2)}%`,
                      }}
                    >
                      <div className={`h-full ${statusBgColors[item.status]} border border-${statusColors[item.status].replace("bg-", "")}/30 relative`}>
                        <div
                          className={`h-full ${statusColors[item.status]} opacity-60`}
                          style={{ width: `${item.progress}%` }}
                        ></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-xs font-medium text-white drop-shadow-md">{item.progress}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
