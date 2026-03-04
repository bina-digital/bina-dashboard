import DashboardLayout from "@/components/DashboardLayout";
import { getDashboardStats, getRecentTransactions, getPipelineStats } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const stats = await getDashboardStats();
  const recentTransactions = await getRecentTransactions(5);
  const pipeline = await getPipelineStats();

  const pipelineStages = [
    { stage: "Contacted via WhatsApp", count: stats.customers, color: "bg-blue-500" },
    { stage: "Responded Positively", count: pipeline.responded, color: "bg-purple-500" },
    { stage: "Awaiting Transfer Slip", count: stats.pendingSlips, color: "bg-amber-500" },
    { stage: "Processing with MRI", count: pipeline.inTransaction, color: "bg-cyan-500" },
    { stage: "Completed", count: pipeline.completed, color: "bg-emerald-500" },
    { stage: "Failed / Resolving", count: pipeline.failed, color: "bg-red-500" },
  ];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      processing: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      awaiting_slip: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      slip_received: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      failed: "bg-red-500/20 text-red-400 border-red-500/30",
    };
    return colors[status] || "bg-slate-500/20 text-slate-400";
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <p className="text-slate-400">Real-time insights into your remittance operations</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
              <span className="text-sm text-emerald-400">1 MYR = 3,250 IDR</span>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors">
              + New Transaction
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Customers"
            value={stats.customers.toLocaleString()}
            subtitle="In database"
            trend="+12%"
            trendUp={true}
            color="blue"
          />
          <StatCard
            title="Total Transactions"
            value={stats.totalTransactions.toLocaleString()}
            subtitle="All time"
            trend="+8%"
            trendUp={true}
            color="purple"
          />
          <StatCard
            title="Completed"
            value={stats.completed.toLocaleString()}
            subtitle="Successful"
            trend="+15%"
            trendUp={true}
            color="emerald"
          />
          <StatCard
            title="Revenue"
            value={`RM ${stats.revenue.toLocaleString()}`}
            subtitle="@ RM4/transaction"
            trend="+10%"
            trendUp={true}
            color="amber"
          />
        </div>

        {/* Second Row Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Awaiting Slips</h3>
              <span className="text-amber-400 font-bold">{stats.pendingSlips}</span>
            </div>
            <p className="text-sm text-slate-400">Customers waiting to send bank slips</p>
            <div className="mt-4 w-full bg-slate-800 rounded-full h-2">
              <div className="h-2 rounded-full bg-amber-500" style={{ width: `${Math.min(stats.pendingSlips * 2, 100)}%` }} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Processing Now</h3>
              <span className="text-cyan-400 font-bold">{stats.processing}</span>
            </div>
            <p className="text-sm text-slate-400">Transactions with MRI</p>
            <div className="mt-4 w-full bg-slate-800 rounded-full h-2">
              <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${Math.min(stats.processing * 5, 100)}%` }} />
            </div>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Failed</h3>
              <span className="text-red-400 font-bold">{stats.failed}</span>
            </div>
            <p className="text-sm text-slate-400">Requires attention</p>
            <div className="mt-4 w-full bg-slate-800 rounded-full h-2">
              <div className="h-2 rounded-full bg-red-500" style={{ width: `${Math.min(stats.failed * 10, 100)}%` }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pipeline */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Customer Pipeline</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">View All →</button>
            </div>

            <div className="space-y-4">
              {pipelineStages.map((stage, index) => {
                const maxCount = Math.max(...pipelineStages.map(s => s.count)) || 1;
                const percentage = (stage.count / maxCount) * 100;
                
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-300">{stage.stage}</span>
                      <span className="text-sm font-medium">{stage.count.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className={`h-2 rounded-full ${stage.color}`} style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <h2 className="text-lg font-semibold">Recent Transactions</h2>
              </div>
              <a href="/transactions" className="text-sm text-blue-400 hover:text-blue-300">View All →</a>
            </div>

            {recentTransactions.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <p>No transactions yet</p>
                <p className="text-sm mt-2">Complete a transaction in WhatsApp to see it here</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-slate-400 border-b border-slate-800">
                      <th className="pb-3 font-medium">Reference</th>
                      <th className="pb-3 font-medium">Recipient</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {recentTransactions.map((tx: any) => (
                      <tr key={tx.id} className="border-b border-slate-800/50">
                        <td className="py-3 font-mono text-blue-400">{tx.reference}</td>
                        <td className="py-3">{tx.recipient_name}</td>
                        <td className="py-3">RM {tx.amount_myr}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(tx.status)}`}>
                            {tx.status}
                          </span>
                        </td>
                        <td className="py-3 text-slate-400">{formatTimeAgo(tx.created_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  trend,
  trendUp,
  color,
}: {
  title: string;
  value: string;
  subtitle: string;
  trend: string;
  trendUp: boolean;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
    cyan: "from-cyan-500/20 to-cyan-600/20 border-cyan-500/30",
    emerald: "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30",
    purple: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
    amber: "from-amber-500/20 to-amber-600/20 border-amber-500/30",
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            trendUp ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
          }`}
        >
          {trend}
        </span>
      </div>
    </div>
  );
}
