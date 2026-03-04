import DashboardLayout from "@/components/DashboardLayout";

const loyaltyStats = {
  activeMembers: 1247,
  totalTransactions: 3891,
  freeTransactionsClaimed: 234,
  referralsMade: 89,
  avgTransactionsPerCustomer: 3.1,
};

const loyaltyTiers = [
  { tier: "Bronze", minTx: 0, color: "from-amber-600 to-amber-700", icon: "🥉", benefits: ["Basic rate", "Standard support"], customers: 523 },
  { tier: "Silver", minTx: 5, color: "from-slate-400 to-slate-500", icon: "🥈", benefits: ["1 free transaction", "Priority support"], customers: 418 },
  { tier: "Gold", minTx: 10, color: "from-yellow-400 to-amber-500", icon: "🥇", benefits: ["2 free transactions/month", "VIP support", "Better rates"], customers: 198 },
  { tier: "Platinum", minTx: 20, color: "from-purple-400 to-pink-500", icon: "💎", benefits: ["Unlimited free transactions", "Dedicated agent", "Best rates", "Exclusive offers"], customers: 108 },
];

const topCustomers = [
  { name: "Rina Wati", tier: "Platinum", transactions: 28, freeUsed: 3, referrals: 5, joined: "2024-03-15" },
  { name: "Dina Lestari", tier: "Gold", transactions: 15, freeUsed: 2, referrals: 3, joined: "2024-06-20" },
  { name: "Budi Santoso", tier: "Gold", transactions: 12, freeUsed: 1, referrals: 2, joined: "2024-08-10" },
  { name: "Siti Rahayu", tier: "Silver", transactions: 7, freeUsed: 1, referrals: 1, joined: "2024-09-05" },
  { name: "Ahmad Fauzi", tier: "Silver", transactions: 6, freeUsed: 0, referrals: 0, joined: "2024-10-12" },
];

const recentRewards = [
  { customer: "Dina Lestari", reward: "Free Transaction", value: "RM 3", date: "2026-02-27", status: "claimed" },
  { customer: "Budi Santoso", reward: "Referral Bonus", value: "RM 1", date: "2026-02-26", status: "claimed" },
  { customer: "Siti Rahayu", reward: "Free Transaction", value: "RM 3", date: "2026-02-25", status: "claimed" },
  { customer: "Rina Wati", reward: "Tier Upgrade", value: "Platinum", date: "2026-02-24", status: "active" },
  { customer: "Hendra Gunawan", reward: "Referral Bonus", value: "RM 1", date: "2026-02-23", status: "claimed" },
];

export default function Loyalty() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Loyalty Program</h1>
            <p className="text-slate-400">Reward system for customer retention</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors">
            Configure Program
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Active Members" value={loyaltyStats.activeMembers.toLocaleString()} color="blue" />
          <StatCard title="Total Transactions" value={loyaltyStats.totalTransactions.toLocaleString()} color="purple" />
          <StatCard title="Free Tx Claimed" value={loyaltyStats.freeTransactionsClaimed.toString()} color="emerald" />
          <StatCard title="Referrals Made" value={loyaltyStats.referralsMade.toString()} color="amber" />
        </div>

        {/* Tier System */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Loyalty Tiers</h2>
            <p className="text-sm text-slate-400">Reward customers based on transaction history</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {loyaltyTiers.map((tier) => (
              <div
                key={tier.tier}
                className={`relative bg-gradient-to-br ${tier.color} rounded-xl p-6 text-white overflow-hidden`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl">{tier.icon}</div>
                <div className="relative z-10">
                  <div className="text-4xl mb-2">{tier.icon}</div>
                  <h3 className="text-xl font-bold mb-1">{tier.tier}</h3>
                  <p className="text-sm opacity-80 mb-4">{tier.minTx}+ transactions</p>
                  
                  <ul className="space-y-1 text-sm opacity-90">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i}>• {benefit}</li>
                    ))}
                  </ul>

                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-2xl font-bold">{tier.customers}</p>
                    <p className="text-xs opacity-80">customers</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Customers */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Top Loyalty Members</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">View All →</button>
            </div>

            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold">
                      {customer.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-xs text-slate-400">Member since {customer.joined}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Tier</p>
                      <p className={`font-medium ${
                        customer.tier === "Platinum" ? "text-purple-400" :
                        customer.tier === "Gold" ? "text-yellow-400" :
                        customer.tier === "Silver" ? "text-slate-300" : "text-amber-600"
                      }`}>{customer.tier}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-slate-400">Transactions</p>
                      <p className="font-medium">{customer.transactions}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-slate-400">Referrals</p>
                      <p className="font-medium text-emerald-400">{customer.referrals}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Rewards */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Recent Rewards</h2>
              <button className="text-sm text-blue-400 hover:text-blue-300">View All →</button>
            </div>

            <div className="space-y-3">
              {recentRewards.map((reward, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                      reward.reward === "Free Transaction" ? "bg-emerald-500/20" :
                      reward.reward === "Referral Bonus" ? "bg-blue-500/20" :
                      "bg-purple-500/20"
                    }`}>
                      {reward.reward === "Free Transaction" ? "🎁" :
                       reward.reward === "Referral Bonus" ? "🤝" : "⭐"}
                    </div>
                    <div>
                      <p className="font-medium">{reward.customer}</p>
                      <p className="text-sm text-slate-400">{reward.reward}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">{reward.value}</p>
                    <p className="text-xs text-slate-400">{reward.date}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${
                      reward.status === "claimed" ? "bg-emerald-500/20 text-emerald-400" :
                      "bg-blue-500/20 text-blue-400"
                    }`}>
                      {reward.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Program Summary */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-lg">
              <h3 className="font-semibold mb-2">Program Performance</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Avg. Retention Rate</p>
                  <p className="text-xl font-bold text-emerald-400">78%</p>
                </div>
                <div>
                  <p className="text-slate-400">Repeat Customers</p>
                  <p className="text-xl font-bold text-blue-400">1,247</p>
                </div>
              </div>
            </div>
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
    amber: "from-amber-500/20 to-amber-600/20 border-amber-500/30",
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} border rounded-xl p-6`}>
      <p className="text-sm text-slate-400 mb-1">{title}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}
