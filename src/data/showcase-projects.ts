// src/data/showcase-projects.ts
// Cards for the "AI & Automation" and "UI/UX Design (Figma)" filter tabs in "Selected Projects".
//
// HOW TO USE
//   - Each entry is one card. `p: "ai"` shows under the AI & Automation tab, `p: "ux"` under UI/UX Design (Figma).
//   - To add a thumbnail:  put the image in /public/assets/ and set  image: "/assets/your-file.jpg"
//   - To make the card clickable (Behance, Figma prototype, Loom, GitHub, live demo): set  href: "https://..."
//   - Without `image`, the card shows the emoji + title placeholder. Without `href`, it is not clickable.
//   - IMPORTANT: the titles below are generic PLACEHOLDERS. Rename them to your real projects, or delete
//     any entry you cannot back up with a real project, before deploying.

export type ShowcaseProject = {
  id: string;
  p: "ai" | "ux";
  emoji: string;
  cat: string; // small label above the title
  title: string;
  niche: string; // line under the title (stack / context)
  bg: string; // placeholder gradient behind the emoji
  image?: string;
  href?: string;
};

export const showcaseProjects: ShowcaseProject[] = [
  // ───────── AI & Automation ─────────
  {
    id: "ai-email-triage-crm",
    p: "ai",
    emoji: "📬",
    cat: "AI Workflow",
    title: "Email Triage & CRM Routing",
    niche: "n8n · Claude / OpenAI · CRM",
    bg: "linear-gradient(135deg,#1a1208 0%,#2e1f10 100%)",
    // image: "/assets/ai-email-triage.jpg",
    // href: "https://...",
  },
  {
    id: "ai-rag-knowledge-assistant",
    p: "ai",
    emoji: "🧠",
    cat: "RAG Pipeline",
    title: "RAG Knowledge-Base Assistant",
    niche: "Supabase Vector · Groq · n8n",
    bg: "linear-gradient(135deg,#140c04 0%,#2a1a0a 100%)",
  },
  {
    id: "ai-multi-llm-orchestration",
    p: "ai",
    emoji: "⚙️",
    cat: "LLM Orchestration",
    title: "Multi-LLM Workflow Orchestration",
    niche: "n8n · Claude · OpenAI · Webhooks & REST APIs",
    bg: "linear-gradient(135deg,#0a0a14 0%,#14142a 100%)",
  },

  // ───────── UI/UX Design (Figma) ─────────
  {
    id: "ux-saas-design-system",
    p: "ux",
    emoji: "🧩",
    cat: "Design System",
    title: "B2B SaaS Design System",
    niche: "Figma · Auto-Layout · Component Variants",
    bg: "linear-gradient(135deg,#1e0e1c 0%,#321a2e 100%)",
  },
  {
    id: "ux-mobile-app-prototype",
    p: "ux",
    emoji: "📱",
    cat: "Mobile App UI/UX",
    title: "Mobile App Interactive Prototype",
    niche: "Figma · Prototyping · User Flows",
    bg: "linear-gradient(135deg,#1a0e18 0%,#2e1a28 100%)",
  },
  {
    id: "ux-saas-dashboard",
    p: "ux",
    emoji: "📊",
    cat: "Product Design",
    title: "SaaS Dashboard UI",
    niche: "Figma · Components · Developer Hand-off",
    bg: "linear-gradient(135deg,#0c1828 0%,#142840 100%)",
  },
];
