export type Agent = {
  id: string;
  name: string;
  emoji: string;
  role: string;
  status: "active" | "busy" | "idle";
};

export type Task = {
  id: string;
  title: string;
  assigneeAgentId: string;
  status: "backlog" | "in-progress" | "review" | "done";
  priority: "high" | "medium" | "low";
  deadline: string;
};

export const agents: Agent[] = [
  { id: "samantha", name: "Samantha", emoji: "👩‍💻", role: "Lead Developer", status: "active" },
  { id: "dylan", name: "Dylan", emoji: "📝", role: "Documentation", status: "active" },
  { id: "tasha", name: "Tasha", emoji: "🧪", role: "QA Specialist", status: "busy" },
  { id: "mason", name: "Mason", emoji: "🚀", role: "DevOps", status: "active" },
  { id: "priya", name: "Priya", emoji: "💼", role: "Business Strategy", status: "idle" },
  { id: "ellie", name: "Ellie", emoji: "🎨", role: "UI/UX Design", status: "active" },
];

export const tasks: Task[] = [
  { id: "k1", title: "Wire agents and project views", assigneeAgentId: "samantha", status: "done", priority: "high", deadline: "2026-03-05" },
  { id: "k2", title: "Design Kanban interactions", assigneeAgentId: "ellie", status: "in-progress", priority: "medium", deadline: "2026-03-06" },
  { id: "k3", title: "Write UAT for dashboard", assigneeAgentId: "dylan", status: "review", priority: "medium", deadline: "2026-03-07" },
  { id: "k4", title: "Regression test command center", assigneeAgentId: "tasha", status: "backlog", priority: "high", deadline: "2026-03-08" }
];
