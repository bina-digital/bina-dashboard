"use client";

import { useEffect, useState } from "react";

interface LiveActivity {
  id: string;
  agent: string;
  emoji: string;
  action: string;
  task: string;
  timestamp: Date;
  type: "started" | "completed" | "updated" | "commented";
}

const activities: LiveActivity[] = [
  { id: "1", agent: "Samantha", emoji: "👩‍💻", action: "started", task: "Kanban Board feature", timestamp: new Date(Date.now() - 2 * 60000), type: "started" },
  { id: "2", agent: "Ellie", emoji: "🎨", action: "completed", task: "Dashboard UI polish", timestamp: new Date(Date.now() - 5 * 60000), type: "completed" },
  { id: "3", agent: "Dylan", emoji: "📝", action: "updated", task: "UAT documentation", timestamp: new Date(Date.now() - 12 * 60000), type: "updated" },
  { id: "4", agent: "Mason", emoji: "🚀", action: "deployed", task: "Command Center v2", timestamp: new Date(Date.now() - 18 * 60000), type: "completed" },
  { id: "5", agent: "Priya", emoji: "💼", action: "commented on", task: "MRI revenue analysis", timestamp: new Date(Date.now() - 25 * 60000), type: "commented" },
];

const getActivityIcon = (type: string) => {
  switch (type) {
    case "started": return "🚀";
    case "completed": return "✅";
    case "updated": return "📝";
    case "commented": return "💬";
    default: return "•";
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case "started": return "text-blue-400";
    case "completed": return "text-emerald-400";
    case "updated": return "text-amber-400";
    case "commented": return "text-purple-400";
    default: return "text-slate-400";
  }
};

const formatTime = (date: Date) => {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
};

export function LiveActivityFeed() {
  const [visibleActivities, setVisibleActivities] = useState(activities.slice(0, 3));
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Occasionally add new activity
      if (Math.random() > 0.7) {
        const newActivity: LiveActivity = {
          id: Date.now().toString(),
          agent: ["Samantha", "Dylan", "Tasha", "Mason", "Priya", "Ellie"][Math.floor(Math.random() * 6)],
          emoji: ["👩‍💻", "📝", "🧪", "🚀", "💼", "🎨"][Math.floor(Math.random() * 6)],
          action: ["started", "completed", "updated"][Math.floor(Math.random() * 3)],
          task: ["API integration", "UI components", "Test cases", "Documentation", "Deployment"][Math.floor(Math.random() * 5)],
          timestamp: new Date(),
          type: ["started", "completed", "updated"][Math.floor(Math.random() * 3)] as any,
        };
        setVisibleActivities(prev => [newActivity, ...prev.slice(0, 4)]);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">🔴 Live Activity</h2>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        </div>
        <span className="text-xs text-slate-500">
          Updated {formatTime(lastUpdate)}
        </span>
      </div>

      <div className="space-y-3">
        {visibleActivities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 bg-slate-800/30 rounded-xl">
            <div className="text-lg">{activity.emoji}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-300">
                <span className="font-medium text-slate-200">{activity.agent}</span>{" "}
                <span className={getActivityColor(activity.type)}>{activity.action}</span>{" "}
                <span className="text-slate-400">{activity.task}</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {getActivityIcon(activity.type)} {formatTime(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hook for auto-refreshing data
export function useAutoRefresh(intervalMs: number = 30000) {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(k => k + 1);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return refreshKey;
}

// Real-time status indicator
export function ConnectionStatus() {
  const [connected, setConnected] = useState(true);

  useEffect(() => {
    // Simulate connection status
    const interval = setInterval(() => {
      setConnected(Math.random() > 0.1); // 90% uptime
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className={`w-2 h-2 rounded-full ${connected ? "bg-emerald-500" : "bg-red-500"}`}></span>
      <span className={connected ? "text-emerald-400" : "text-red-400"}>
        {connected ? "Connected" : "Reconnecting..."}
      </span>
    </div>
  );
}
