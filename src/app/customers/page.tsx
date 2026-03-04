import DashboardLayout from "@/components/DashboardLayout";

const customers = [
  { id: "271287", name: "Dina Lestari", ic: "E2096776", phone: "011-39489392", nationality: "Indonesia", employer: "Flextronics Tech", cifStatus: "Active", outreach: "Contacted", transactions: 3 },
  { id: "271288", name: "Siti Rahayu", ic: "E1234567", phone: "011-23456789", nationality: "Indonesia", employer: "Penang Factory", cifStatus: "Active", outreach: "Responded", transactions: 1 },
  { id: "271289", name: "Ahmad Fauzi", ic: "E7654321", phone: "012-34567890", nationality: "Indonesia", employer: "Top Glove", cifStatus: "Active", outreach: "In Transaction", transactions: 2 },
  { id: "271290", name: "Budi Santoso", ic: "E1111222", phone: "013-11223344", nationality: "Indonesia", employer: "Aeon Retail", cifStatus: "Dormant", outreach: "Not Sent", transactions: 0 },
  { id: "271291", name: "Dewi Susanti", ic: "E3333444", phone: "011-98765432", nationality: "Indonesia", employer: "Parkson Group", cifStatus: "Dormant", outreach: "Not Sent", transactions: 0 },
  { id: "271292", name: "Rina Wati", ic: "E5555666", phone: "011-55667788", nationality: "Indonesia", employer: "Intel Malaysia", cifStatus: "Active", outreach: "Completed", transactions: 5 },
  { id: "271293", name: "Hendra Gunawan", ic: "E7777888", phone: "012-99887766", nationality: "Indonesia", employer: "AMD Electronics", cifStatus: "Active", outreach: "Contacted", transactions: 1 },
  { id: "271294", name: "Yuni Astuti", ic: "E9999000", phone: "014-33221100", nationality: "Indonesia", employer: "Osram", cifStatus: "Active", outreach: "Awaiting Slip", transactions: 1 },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    Active: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Dormant: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    Inactive: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  };
  return styles[status] || styles.Inactive;
};

const getOutreachBadge = (status: string) => {
  const styles: Record<string, string> = {
    "Not Sent": "bg-slate-500/20 text-slate-400 border-slate-500/30",
    "Contacted": "bg-blue-500/20 text-blue-400 border-blue-500/30",
    "Responded": "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "In Transaction": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "Completed": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    "Awaiting Slip": "bg-amber-500/20 text-amber-400 border-amber-500/30",
  };
  return styles[status] || styles["Not Sent"];
};

export default function Customers() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Customer Database</h1>
            <p className="text-slate-400">Manage CIF records and outreach status</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors">
              Import CIF
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors">
              Export List
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400">Total CIF</p>
            <p className="text-3xl font-bold">30,000</p>
            <p className="text-xs text-slate-500 mt-1">From MRI</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400">Contacted</p>
            <p className="text-3xl font-bold text-blue-400">8,420</p>
            <p className="text-xs text-slate-500 mt-1">Via WhatsApp</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400">Active Customers</p>
            <p className="text-3xl font-bold text-emerald-400">12,450</p>
            <p className="text-xs text-slate-500 mt-1">With transactions</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <p className="text-sm text-slate-400">Not Yet Contacted</p>
            <p className="text-3xl font-bold text-amber-400">21,580</p>
            <p className="text-xs text-slate-500 mt-1">Ready for outreach</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 bg-slate-900/50 border border-slate-800 rounded-xl p-4">
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              placeholder="Search by name, IC, or phone..."
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div className="w-40">
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200">
              <option>All Status</option>
              <option>Active</option>
              <option>Dormant</option>
            </select>
          </div>
          <div className="w-48">
            <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-200">
              <option>All Outreach</option>
              <option>Not Sent</option>
              <option>Contacted</option>
              <option>Responded</option>
              <option>In Transaction</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-800">
                <tr className="text-left text-sm">
                  <th className="px-6 py-4 font-medium text-slate-400">CIF ID</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Name</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Passport/IC</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Phone</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Employer</th>
                  <th className="px-6 py-4 font-medium text-slate-400">CIF Status</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Outreach</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Tx Count</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-6 py-4 font-mono text-blue-400">{customer.id}</td>
                    <td className="px-6 py-4">{customer.name}</td>
                    <td className="px-6 py-4 font-mono text-slate-400">{customer.ic}</td>
                    <td className="px-6 py-4 text-slate-400">{customer.phone}</td>
                    <td className="px-6 py-4 text-slate-400">{customer.employer}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusBadge(customer.cifStatus)}`}>
                        {customer.cifStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getOutreachBadge(customer.outreach)}`}>
                        {customer.outreach}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={customer.transactions > 0 ? "text-emerald-400 font-medium" : "text-slate-500"}>
                        {customer.transactions}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg">
                          📤
                        </button>
                        {customer.outreach === "Not Sent" && (
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs">
                            Send
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800">
            <p className="text-sm text-slate-400">Showing 1-8 of 30,000 customers</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm disabled:opacity-50" disabled>Previous</button>
              <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm">Next</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
