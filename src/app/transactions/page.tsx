import DashboardLayout from "@/components/DashboardLayout";

const workItems = [
  { id: "TASK-1847", title: "Kanban interaction polish", owner: "Ellie", value: "UI", status: "completed", date: "2026-03-04", time: "14:32" },
  { id: "TASK-1846", title: "Timeline data model", owner: "Samantha", value: "Core", status: "processing", date: "2026-03-04", time: "14:25" },
  { id: "TASK-1845", title: "UAT checklist v1", owner: "Dylan", value: "Docs", status: "review", date: "2026-03-04", time: "14:18" },
  { id: "TASK-1844", title: "Regression suite update", owner: "Tasha", value: "QA", status: "blocked", date: "2026-03-04", time: "14:11", reason: "Awaiting staging environment" },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    processing: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    review: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    blocked: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  const labels: Record<string, string> = {
    completed: "Completed",
    processing: "In Progress",
    review: "Review",
    blocked: "Blocked",
  };
  return { style: styles[status] || styles.blocked, label: labels[status] || status };
};

export default function Transactions() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Work Items</h1>
            <p className="text-slate-400">Track delivery tasks across projects and agents</p>
          </div>
          <a href="/kanban" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition-colors">
            + New Task
          </a>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-800">
                <tr className="text-left text-sm">
                  <th className="px-6 py-4 font-medium text-slate-400">ID</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Title</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Owner</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Type</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Status</th>
                  <th className="px-6 py-4 font-medium text-slate-400">Date/Time</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {workItems.map((tx) => {
                  const status = getStatusBadge(tx.status);
                  return (
                    <tr key={tx.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                      <td className="px-6 py-4 font-mono text-blue-400">{tx.id}</td>
                      <td className="px-6 py-4">{tx.title}</td>
                      <td className="px-6 py-4 text-slate-300">{tx.owner}</td>
                      <td className="px-6 py-4 text-slate-400">{tx.value}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs border ${status.style}`}>{status.label}</span>
                        {tx.reason && <p className="text-xs text-red-400 mt-1">{tx.reason}</p>}
                      </td>
                      <td className="px-6 py-4 text-slate-400">{tx.date}<br /><span className="text-xs">{tx.time}</span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
