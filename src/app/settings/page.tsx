import DashboardLayout from "@/components/DashboardLayout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-slate-400">Configure agency dashboard behavior and integrations</p>
        </div>

        <section className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h2 className="font-semibold mb-2">General</h2>
            <p className="text-sm text-slate-400">Workspace name, timezone, and display preferences.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h2 className="font-semibold mb-2">Integrations</h2>
            <p className="text-sm text-slate-400">GitHub, Vercel, and project delivery tooling connections.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h2 className="font-semibold mb-2">Agent Operations</h2>
            <p className="text-sm text-slate-400">Permanent agent routing rules and workload limits.</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h2 className="font-semibold mb-2">Security</h2>
            <p className="text-sm text-slate-400">Access control, session policy, and audit logs.</p>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
