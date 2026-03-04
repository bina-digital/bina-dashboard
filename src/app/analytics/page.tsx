import DashboardLayout from "@/components/DashboardLayout";

const monthlyData = [
  { month: "Sep", transactions: 450, revenue: 1800, customers: 120 },
  { month: "Oct", transactions: 680, revenue: 2720, customers: 180 },
  { month: "Nov", transactions: 920, revenue: 3680, customers: 250 },
  { month: "Dec", transactions: 1250, revenue: 5000, customers: 320 },
  { month: "Jan", transactions: 890, revenue: 3560, customers: 240 },
  { month: "Feb", transactions: 1100, revenue: 4400, customers: 290 },
];

const conversionFunnel = [
  { stage: "Message Sent", count: 8420, percentage: 100 },
  { stage: "Message Read", count: 6120, percentage: 72.7 },
  { stage: "Responded", count: 4102, percentage: 48.7 },
  { stage: "Started Transaction", count: 1247, percentage: 14.8 },
  { stage: "Slip Received", count: 891, percentage: 10.6 },
  { stage: "Completed", count: 3891, percentage: 46.2 },
];

const bankDistribution = [
  { bank: "BRI", count: 1456, percentage: 37.4, color: "bg-blue-500" },
  { bank: "BCA", count: 982, percentage: 25.2, color: "bg-purple-500" },
  { bank: "Mandiri", count: 756, percentage: 19.4, color: "bg-yellow-500" },
  { bank: "BNI", count: 697, percentage: 17.9, color: "bg-emerald-500" },
];

const topSenders = [
  { name: "Rina Wati", amount: 12500, transactions: 28, lastActive: "2 hours ago" },
  { name: "Dina Lestari", amount: 8900, transactions: 15, lastActive: "5 hours ago" },
  { name: "Budi Santoso", amount: 7200, transactions: 12, lastActive: "1 day ago" },
  { name: "Siti Rahayu", amount: 6500, transactions: 7, lastActive: "3 days ago" },
  { name: "Ahmad Fauzi", amount: 5800, transactions: 6, lastActive: "1 week ago" },
];

const hourlyActivity = [
  { hour: "00:00", count: 12 },
  { hour: "04:00", count: 8 },
  { hour: "08:00", count: 45 },
  { hour: "12:00", count: 89 },
  { hour: "16:00", count: 67 },
  { hour: "20:00", count: 34 },
];

export default function Analytics() {
  const maxMonthly = Math.max(...monthlyData.map(d => d.transactions));
  const maxHourly = Math.max(...hourlyActivity.map(h => h.count));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Analytics</h1>
            <p className="text-slate-400">Deep insights into agency delivery and revenue operations</p>
          </div>
          <div className="flex gap-3">
            <select className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>This year</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors">
              Export Report
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard title="Conversion Rate" value="14.8%" subtitle="Msg to Transaction" trend="+2.3%" trendUp={true} />
          <KPICard title="Avg. Transaction" value="RM 425" subtitle="Per customer" trend="+5.1%" trendUp={true} />
          <KPICard title="Response Rate" value="48.7%" subtitle="Of messages read" trend="+1.2%" trendUp={true} />
          <KPICard title="Customer LTV" value="RM 1,240" subtitle="Lifetime value" trend="+8.4%" trendUp={true} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Chart */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Monthly Performance</h2>
              <div className="flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-slate-400">Transactions</span>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-between h-64 gap-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-slate-800 rounded-t-lg relative overflow-hidden" style={{ height: `${(data.transactions / maxMonthly) * 200}px` }}>
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-500 hover:to-blue-300" style={{ height: "100%" }} />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{data.transactions}</p>
                    <p className="text-xs text-slate-500">{data.month}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Conversion Funnel</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">View Details →</button>
            </div>

            <div className="space-y-3">
              {conversionFunnel.map((stage, index) => (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{stage.stage}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">{stage.count.toLocaleString()}</span>
                      <span className="text-xs text-slate-400">{stage.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bank Distribution */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-6">Bank Distribution</h2>

            <div className="space-y-4">
              {bankDistribution.map((bank) => (
                <div key={bank.bank}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{bank.bank}</span>
                    <span className="text-sm font-medium">{bank.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className={`h-2 rounded-full ${bank.color}`} style={{ width: `${bank.percentage}%` }} />
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{bank.count.toLocaleString()} transactions</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-400">Total Bank Transactions</p>
              <p className="text-2xl font-bold">3,891</p>
            </div>
          </div>

          {/* Hourly Activity */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-6">Peak Activity Hours</h2>

            <div className="space-y-3">
              {hourlyActivity.map((hour) => (
                <div key={hour.hour}>
                  <div className="flex items-center gap-3">
                    <span className="text-sm w-16">{hour.hour}</span>
                    <div className="flex-1 bg-slate-800 rounded-full h-4">
                      <div
                        className="h-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                        style={{ width: `${(hour.count / maxHourly) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm w-10 text-right">{hour.count}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-lg">
              <p className="text-sm">📈 Peak time: <strong>12:00 PM - 2:00 PM</strong></p>
              <p className="text-xs text-slate-400 mt-1">Best time to send broadcasts</p>
            </div>
          </div>

          {/* Top Senders */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Top Senders</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">View All →</button>
            </div>

            <div className="space-y-4">
              {topSenders.map((sender, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? "bg-yellow-500/20 text-yellow-400" :
                      index === 1 ? "bg-slate-400/20 text-slate-300" :
                      index === 2 ? "bg-amber-600/20 text-amber-600" :
                      "bg-slate-700 text-slate-400"
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{sender.name}</p>
                      <p className="text-xs text-slate-400">{sender.transactions} transactions</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">RM {sender.amount.toLocaleString()}</p>
                    <p className="text-xs text-slate-400">{sender.lastActive}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function KPICard({ title, value, subtitle, trend, trendUp }: { title: string; value: string; subtitle: string; trend: string; trendUp: boolean }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
      <p className="text-sm text-slate-400 mb-1">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold">{value}</p>
        <span className={`text-sm px-2 py-1 rounded-full ${trendUp ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}`}>
          {trend}
        </span>
      </div>
      <p className="text-xs text-slate-500 mt-2">{subtitle}</p>
    </div>
  );
}
