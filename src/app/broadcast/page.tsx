import DashboardLayout from "@/components/DashboardLayout";

const broadcastStats = {
  totalCIF: 30000,
  contacted: 8420,
  responded: 4102,
  inTransaction: 1247,
  completed: 3891,
  notContacted: 21580,
};

const templates = [
  {
    id: "welcome",
    name: "Welcome Message",
    preview: "🌙 Assalamualaikum! Selamat datang ke Mandiri Remittance International...",
    used: 8420,
    responseRate: "48.7%",
  },
  {
    id: "ramadhan",
    name: "Ramadhan Special",
    preview: "🌙 Promosi Ramadhan! Hantar THR dengan MRI. Rate: 1 MYR = 3,250 IDR...",
    used: 5234,
    responseRate: "52.3%",
  },
  {
    id: "followup",
    name: "Follow-up",
    preview: "👋 Hai! Anda masih berminat untuk hantar duit ke Indonesia?...",
    used: 1892,
    responseRate: "35.1%",
  },
  {
    id: "loyalty",
    name: "Loyalty Reward",
    preview: "🎁 Tahniah! Anda layak mendapat 1 transaksi PERCUMA...",
    used: 234,
    responseRate: "89.3%",
  },
];

const batchHistory = [
  { id: "B-2026-0028", date: "2026-02-27", sent: 50, delivered: 48, read: 42, responded: 18, status: "completed" },
  { id: "B-2026-0027", date: "2026-02-27", sent: 50, delivered: 49, read: 45, responded: 22, status: "completed" },
  { id: "B-2026-0026", date: "2026-02-26", sent: 50, delivered: 50, read: 47, responded: 24, status: "completed" },
  { id: "B-2026-0025", date: "2026-02-26", sent: 50, delivered: 48, read: 40, responded: 15, status: "completed" },
  { id: "B-2026-0024", date: "2026-02-25", sent: 50, delivered: 49, read: 44, responded: 21, status: "completed" },
];

const scheduledBroadcasts = [
  { id: "S-2026-0001", name: "Morning Broadcast", template: "Welcome Message", audience: 1000, scheduled: "2026-03-01 08:00", status: "scheduled" },
  { id: "S-2026-0002", name: "Ramadhan Campaign", template: "Ramadhan Special", audience: 5000, scheduled: "2026-03-05 10:00", status: "scheduled" },
];

export default function Broadcast() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">WhatsApp Broadcast</h1>
            <p className="text-slate-400">Send bulk messages to CIF database</p>
          </div>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors">
            + New Broadcast
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <StatCard title="Total CIF" value={broadcastStats.totalCIF.toLocaleString()} color="blue" />
          <StatCard title="Contacted" value={broadcastStats.contacted.toLocaleString()} color="purple" />
          <StatCard title="Responded" value={broadcastStats.responded.toLocaleString()} color="emerald" />
          <StatCard title="In Transaction" value={broadcastStats.inTransaction.toLocaleString()} color="cyan" />
          <StatCard title="Completed" value={broadcastStats.completed.toLocaleString()} color="amber" />
          <StatCard title="Not Contacted" value={broadcastStats.notContacted.toLocaleString()} color="slate" />
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Outreach Progress</h3>
            <span className="text-sm text-slate-400">{broadcastStats.contacted.toLocaleString()} / {broadcastStats.totalCIF.toLocaleString()} ({Math.round((broadcastStats.contacted / broadcastStats.totalCIF) * 100)}%)</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
            <div className="flex h-full">
              <div className="bg-purple-500 h-full" style={{ width: `${(broadcastStats.contacted / broadcastStats.totalCIF) * 100}%` }} />
            </div>
          </div>
          <div className="flex gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span className="text-slate-400">Contacted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-700"></div>
              <span className="text-slate-400">Not Contacted</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Message Templates */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Message Templates</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">+ Create New</button>
            </div>

            <div className="space-y-4">
              {templates.map((template) => (
                <div key={template.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-slate-600 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-xs text-slate-500">ID: {template.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-emerald-400">{template.responseRate}</p>
                      <p className="text-xs text-slate-500">response rate</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400 line-clamp-2">{template.preview}</p>

                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                    <span>📤 {template.used.toLocaleString()} sent</span>
                    <button className="ml-auto text-blue-400 hover:text-blue-300">Use Template →</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Broadcast */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Quick Broadcast</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Select Template</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200">
                  <option>Welcome Message</option>
                  <option>Ramadhan Special</option>
                  <option>Follow-up</option>
                  <option>Custom Message</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Target Audience</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200">
                  <option>All Not Contacted (21,580)</option>
                  <option>Active CIF Only (18,420)</option>
                  <option>Dormant CIF Only (11,580)</option>
                  <option>Custom Selection</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-400 mb-2">Batch Size (rate limiting)</label>
                <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200">
                  <option>50 messages (recommended)</option>
                  <option>100 messages</option>
                  <option>200 messages</option>
                </select>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <p className="text-sm text-slate-400 mb-2">Preview:</p>
                <p className="text-sm text-slate-300">🌙 Assalamualaikum!

Selamat datang ke Mandiri Remittance International!

Kami membantu anda kirim duit ke Indonesia dengan mudah...

Balas YA untuk mulakan! 👇</p>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg font-medium transition-colors">
                  Schedule
                </button>
                <button className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition-colors">
                  Send Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Batch History */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Broadcast History</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300">View All →</button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-800">
                <tr className="text-left text-sm">
                  <th className="px-6 py-4 font-medium text-slate-400">Batch ID</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Date</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Sent</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Delivered</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Read</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Responded</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Status</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {batchHistory.map((batch) => (
                  <tr key={batch.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-mono text-blue-400">{batch.id}</td>
                    <td className="px-6 py-4">{batch.date}</td>
                    <td className="px-6 py-4">{batch.sent}</td>
                    <td className="px-6 py-4 text-emerald-400">{batch.delivered}</td>
                    <td className="px-6 py-4 text-blue-400">{batch.read}</td>
                    <td className="px-6 py-4 text-purple-400">{batch.responded}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs border bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        {batch.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-400 hover:text-blue-300">Details →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Scheduled Broadcasts */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Scheduled Broadcasts</h2>
          </div>

          <div className="space-y-3">
            {scheduledBroadcasts.map((broadcast) => (
              <div key={broadcast.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">⏰</div>
                  <div>
                    <p className="font-medium">{broadcast.name}</p>
                    <p className="text-sm text-slate-400">{broadcast.template} • {broadcast.audience.toLocaleString()} recipients</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{broadcast.scheduled}</p>
                    <p className="text-xs text-slate-400">Scheduled</p>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-400">✏️</button>
                    <button className="p-2 text-slate-400 hover:text-red-400">🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ title, value, color }: { title: string; value: string; color: string }) {
  const colorClasses: Record<string, string> = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    emerald: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30",
    cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
    amber: "from-amber-500/20 to-amber-600/20 border-amber-500/30",
    slate: "from-slate-500/20 to-slate-600/20 border-slate-500/30",
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-4`}>
      <p className="text-xs text-slate-400 mb-1">{title}</p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}
