export type Agent = {
  id: string;
  name: string;
  emoji: string;
  role: string;
  status: "active" | "busy" | "idle";
  focus: string;
};

export type Project = {
  id: string;
  name: string;
  status: "backlog" | "in-progress" | "review" | "done";
  ownerAgentId: string;
  progress: number;
  priority: "high" | "medium" | "low";
};

export type Task = {
  id: string;
  title: string;
  projectId: string;
  assigneeAgentId: string;
  status: "backlog" | "in-progress" | "review" | "done";
  priority: "high" | "medium" | "low";
  deadline: string;
};

export const agents: Agent[] = [
  { id: "samantha", name: "Samantha", emoji: "👩‍💻", role: "Lead Developer", status: "active", focus: "Core feature development" },
  { id: "dylan", name: "Dylan", emoji: "📝", role: "Documentation", status: "active", focus: "UAT + handover docs" },
  { id: "tasha", name: "Tasha", emoji: "🧪", role: "QA Specialist", status: "busy", focus: "Regression + release checks" },
  { id: "mason", name: "Mason", emoji: "🚀", role: "DevOps", status: "active", focus: "Deployments + CI/CD" },
  { id: "priya", name: "Priya", emoji: "💼", role: "Business Strategy", status: "idle", focus: "Revenue opportunity analysis" },
  { id: "ellie", name: "Ellie", emoji: "🎨", role: "UI/UX Design", status: "active", focus: "Dashboard UX polish" },
];

export const projects: Project[] = [
  { id: "mri-command-center", name: "MRI Command Center", status: "in-progress", ownerAgentId: "samantha", progress: 55, priority: "high" },
  { id: "snf-bakes-pos", name: "SNF Bakes POS", status: "in-progress", ownerAgentId: "ellie", progress: 42, priority: "high" },
  { id: "readylah-platform", name: "Readylah Platform", status: "review", ownerAgentId: "tasha", progress: 75, priority: "medium" },
  { id: "mri-ops-docs", name: "MRI Ops Documentation", status: "in-progress", ownerAgentId: "dylan", progress: 61, priority: "medium" },
  { id: "growth-pricing-pack", name: "Growth & Pricing Pack", status: "backlog", ownerAgentId: "priya", progress: 15, priority: "low" },
];

export const tasks: Task[] = [
  { id: "t1", title: "Wire dashboard agents/projects", projectId: "mri-command-center", assigneeAgentId: "samantha", status: "done", priority: "high", deadline: "2026-03-05" },
  { id: "t2", title: "Design Kanban interaction states", projectId: "mri-command-center", assigneeAgentId: "ellie", status: "in-progress", priority: "medium", deadline: "2026-03-06" },
  { id: "t3", title: "Write UAT checklist for command center", projectId: "mri-ops-docs", assigneeAgentId: "dylan", status: "review", priority: "medium", deadline: "2026-03-07" },
  { id: "t4", title: "Regression test login + dashboard routes", projectId: "mri-command-center", assigneeAgentId: "tasha", status: "backlog", priority: "high", deadline: "2026-03-06" },
  { id: "t5", title: "Define pricing pack v1", projectId: "growth-pricing-pack", assigneeAgentId: "priya", status: "backlog", priority: "low", deadline: "2026-03-10" }
];
