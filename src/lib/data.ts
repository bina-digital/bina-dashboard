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
