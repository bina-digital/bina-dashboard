import DashboardLayout from "@/components/DashboardLayout";

const templates = [
  { name: "Project Kickoff", preview: "Hi team — kickoff for this sprint starts today. Please confirm ownership and ETA." },
  { name: "Client Update", preview: "Status update: milestone delivered, next review scheduled, blockers currently none." },
  { name: "Internal Reminder", preview: "Reminder: complete QA checklist and update Kanban statuses before EOD." },
];

export default function BroadcastPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Broadcast & Announcements</h1>
          <p className="text-slate-400">Agency communication templates for team and stakeholder updates</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {templates.map((t) => (
            <article key={t.name} className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
              <h2 className="font-semibold">{t.name}</h2>
              <p className="text-sm text-slate-400 mt-2">{t.preview}</p>
            </article>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
