import DashboardLayout from "@/components/DashboardLayout";

const transactions = [
  { id: "MIR-2025-001847", name: "Dina Lestari", phone: "011-39489392", amountMYR: 500, amountIDR: 1625000, status: "completed", bank: "BRI", date: "2026-02-27", time: "14:32" },
  { id: "MIR-2025-001846", name: "Siti Rahayu", phone: "011-23456789", amountMYR: 300, amountIDR: 975000, status: "processing", bank: "BCA", date: "2026-02-27", time: "14:25" },
  { id: "MIR-2025-001845", name: "Ahmad Fauzi", phone: "012-34567890", amountMYR: 1200, amountIDR: 3900000, status: "processing", bank: "Mandiri", date: "2026-02-27", time: "14:18" },
  { id: "MIR-2025-001844", name: "Dewi Susanti", phone: "011-98765432", amountMYR: 250, amountIDR: 812500, status: "failed", bank: "BNI", date: "2026-02-27", time: "14:11", failReason: "Account number mismatch" },
  { id: "MIR-2025-001843", name: "Budi Santoso", phone: "013-11223344", amountMYR: 800, amountIDR: 2600000, status: "completed", bank: "BRI", date: "2026-02-27", time: "14:02" },
  { id: "MIR-2025-001842", name: "Rina Wati", phone: "011-55667788", amountMYR: 450, amountIDR: 1462500, status: "completed", bank: "BCA", date: "2026-02-27", time: "13:48" },
  { id: "MIR-2025-001841", name: "Hendra Gunawan", phone: "012-99887766", amountMYR: 600, amountIDR: 1950000, status: "awaiting_slip", bank: "Mandiri", date: "2026-02-27", time: "13:35" },
  { id: "MIR-2025-001840", name: "Yuni Astuti", phone: "014-33221100", amountMYR: 350, amountIDR: 1137500, status: "slip_received", bank: "BRI", date: "2026-02-27", time: "13:22" },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    processing: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    awaiting_slip: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    slip_received: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    failed: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  const labels: Record<string, string> = {
    completed: "Completed",
    processing: "Processing",
    awaiting_slip: "Awaiting Slip",
    slip_received: "Slip Received",
    failed: "Failed",
  };
  return { style: styles[status] || styles.failed, label: labels[status] || status };
};

export default function Transactions() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Transactions</h1>
            <p className="text-slate-400">Manage and track all remittance transactions</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors">
              Export CSV
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors">
              + New Transaction
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-slate-400 mb-1">Search</label>
            <input
              type="text"
              placeholder="Reference, name, or phone..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="w-48">
            <label className="block text-sm text-slate-400 mb-1">Status</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none">
              <option>All Status</option>
              <option>Completed</option>
              <option>Processing</option>
              <option>Awaiting Slip</option>
              <option>Failed</option>
            </select>
          </div>

          <div className="w-48">
            <label className="block text-sm text-slate-400 mb-1">Bank</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none">
              <option>All Banks</option>
              <option>BRI</option>
              <option>BCA</option>
              <option>Mandiri</option>
              <option>BNI</option>
            </select>
          </div>

          <div className="w-48">
            <label className="block text-sm text-slate-400 mb-1">Date Range</label>
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none">
              <option>Today</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This month</option>
            </select>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="flex gap-4 text-sm">
          <div className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
            <span className="text-emerald-400 font-medium">Completed: 3</span>
          </div>
          <div className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
            <span className="text-cyan-400 font-medium">Processing: 2</span>
          </div>
          <div className="px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
            <span className="text-amber-400 font-medium">Awaiting Slip: 1</span>
          </div>
          <div className="px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
            <span className="text-red-400 font-medium">Failed: 1</span>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-800">
                <tr className="text-left text-sm">
                  <th className="px-6 py-4 font-medium text-slate-400">Reference</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Customer</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Phone</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Amount (MYR)</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Amount (IDR)</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Bank</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Status</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Date/Time</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {transactions.map((tx) => {
                  const status = getStatusBadge(tx.status);
                  return (
                    <tr key={tx.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4 font-mono text-blue-400">{tx.id}</td>
                      <td className="px-6 py-4">{tx.name}</td>
                      <td className="px-6 py-4 text-slate-400">{tx.phone}</td>
                      <td className="px-6 py-4 font-medium">RM {tx.amountMYR}</td>
                      <td className="px-6 py-4 text-slate-400">Rp {tx.amountIDR.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-slate-800 rounded text-xs">{tx.bank}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs border ${status.style}`}>
                          {status.label}
                        </span>
                        {tx.failReason && (
                          <p className="text-xs text-red-400 mt-1">{tx.failReason}</p>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {tx.date}
                        <br />
                        <span className="text-xs">{tx.time}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                            👁️
                          </button>
                          {tx.status === 'slip_received' && (
                            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs transition-colors">
                              Process
                            </button>
                          )}
                          {tx.status === 'processing' && (
                            <button className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs transition-colors">
                              Complete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
            <p className="text-sm text-slate-400">Showing 1-8 of 1,247 transactions</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors disabled:opacity-50" disabled>
                Previous
              </button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
