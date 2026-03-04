import DashboardLayout from "@/components/DashboardLayout";

export default function TimelinePage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Timeline</h1>
        <p className="text-slate-400">Gantt-style timeline view (next milestone).</p>
      </div>
    </DashboardLayout>
  );
}
