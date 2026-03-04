import DashboardLayout from "@/components/DashboardLayout";

const accounts = [
  { name: "SNF Bakes", type: "Client", stage: "Active", owner: "Priya" },
  { name: "Readylah", type: "Internal Product", stage: "Build", owner: "Samantha" },
  { name: "MRI Project", type: "Client", stage: "Ops", owner: "Mason" },
];

export default function CustomersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Accounts</h1>
          <p className="text-slate-400">Client and internal product account registry</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {accounts.map((c) => (
            <article key={c.name} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <h2 className="font-semibold">{c.name}</h2>
              <p className="text-sm text-slate-400 mt-1">{c.type}</p>
              <p className="text-xs text-slate-500 mt-2">Stage: {c.stage} • Owner: {c.owner}</p>
            </article>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
