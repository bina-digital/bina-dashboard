"use client";

import { ProtectedLayout } from "../components/ProtectedLayout";

interface AnalyticsData {
  velocity: number[];
  burnDown: number[];
  agentProductivity: { name: string; tasks: number; hours: number }[];
  taskDistribution: { label: string; value: number; color: string }[];
}

const analyticsData: AnalyticsData = {
  velocity: [8, 12, 10, 15, 18, 14, 20],
  burnDown: [50, 45, 42, 38, 35, 30, 25, 20, 15, 10, 5, 0],
  agentProductivity: [
    { name: "Samantha", tasks: 12, hours: 45 },
    { name: "Dylan", tasks: 8, hours: 32 },
    { name: "Tasha", tasks: 6, hours: 28 },
    { name: "Mason", tasks: 10, hours: 38 },
    { name: "Priya", tasks: 7, hours: 30 },
    { name: "Ellie", tasks: 9, hours: 35 },
  ],
  taskDistribution: [
    { label: "Completed", value: 24, color: "#10b981" },
    { label: "In Progress", value: 12, color: "#3b82f6" },
    { label: "Review", value: 5, color: "#f59e0b" },
    { label: "Backlog", value: 18, color: "#64748b" },
  ],
};

function BarChart({ data, max }: { data: number[]; max: number }) {
  return (
    <div className="flex items-end gap-2 h-32">
      {data.map((value, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all"
            style={{ height: `${(value / max) * 100}%` }}
          />
          <span className="text-xs text-slate-500">{value}</span>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className="h-32 relative">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={`0,100 ${points} 100,100`} fill="url(#lineGradient)" />
        <polyline
          points={points}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 100 100" className="w-32 h-32">
        {data.map((item, i) => {
          const angle = (item.value / total) * 360;
          const startAngle = currentAngle;
          currentAngle += angle;
          
          const startRad = (startAngle * Math.PI) / 180;
          const endRad = ((startAngle + angle) * Math.PI) / 180;
          
          const x1 = 50 + 40 * Math.cos(startRad);
          const y1 = 50 + 40 * Math.sin(startRad);
          const x2 = 50 + 40 * Math.cos(endRad);
          const y2 = 50 + 40 * Math.sin(endRad);
          
          const largeArc = angle > 180 ? 1 : 0;
          
          return (
            <path
              key={i}
              d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={item.color}
              stroke="#0f172a"
              strokeWidth="2"
            />
          );
        })}
        <circle cx="50" cy="50" r="25" fill="#0f172a" />
        <text x="50" y="48" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
          {total}
        </text>
        <text x="50" y="60" textAnchor="middle" fill="#94a3b8" fontSize="8">
          Total
        </text>
      </svg>
      
      <div className="space-y-2">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-slate-400">{item.label}: {item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <ProtectedLayout>
      <AnalyticsContent />
    </ProtectedLayout>
  );
}

function AnalyticsContent() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <p className="text-sm text-slate-400 mb-1">Tasks Completed</p>
          <p className="text-3xl font-bold text-emerald-400">24</p>
          <p className="text-xs text-slate-500">+12% from last week</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <p className="text-sm text-slate-400 mb-1">Avg Velocity</p>
          <p className="text-3xl font-bold text-blue-400">14.1</p>
          <p className="text-xs text-slate-500">tasks/week</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <p className="text-sm text-slate-400 mb-1">Completion Rate</p>
          <p className="text-3xl font-bold text-purple-400">42%</p>
          <p className="text-xs text-slate-500">of total tasks</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <p className="text-sm text-slate-400 mb-1">On-time Delivery</p>
          <p className="text-3xl font-bold text-amber-400">87%</p>
          <p className="text-xs text-slate-500">3 late this week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">📈 Team Velocity</h2>
            <span className="text-xs text-slate-500">Tasks completed per week</span>
          </div>
          <BarChart data={analyticsData.velocity} max={25} />
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">🔥 Sprint Burn-down</h2>
            <span className="text-xs text-slate-500">Remaining tasks over time</span>
          </div>
          <LineChart data={analyticsData.burnDown} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">👥 Agent Productivity</h2>
            <span className="text-xs text-slate-500">Tasks completed this week</span>
          </div>
          <div className="space-y-4">
            {analyticsData.agentProductivity.map((agent) => (
              <div key={agent.name} className="flex items-center gap-4">
                <div className="w-24">
                  <p className="text-sm font-medium text-slate-200">{agent.name}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-800 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${(agent.tasks / 15) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-slate-400 w-8">{agent.tasks}</span>
                  </div>
                </div>
                <div className="w-20 text-right">
                  <p className="text-xs text-slate-500">{agent.hours}h</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">📊 Task Distribution</h2>
            <span className="text-xs text-slate-500">By status</span>
          </div>
          <DonutChart data={analyticsData.taskDistribution} />
        </div>
      </div>

      <div className="mt-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4">💡 Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 rounded-xl p-4">
            <p className="text-sm text-emerald-400 font-medium mb-1">🚀 High Performer</p>
            <p className="text-sm text-slate-400">Samantha completed 12 tasks this week, 50% above average.</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4">
            <p className="text-sm text-amber-400 font-medium mb-1">⚠️ Attention Needed</p>
            <p className="text-sm text-slate-400">3 tasks are approaching deadline in the next 2 days.</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4">
            <p className="text-sm text-blue-400 font-medium mb-1">📈 Trending Up</p>
            <p className="text-sm text-slate-400">Team velocity increased 150% over the last 3 weeks.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
