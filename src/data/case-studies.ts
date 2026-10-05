// src/data/case-studies.ts
// Case studies shown in the "Case Studies" section (app/page.tsx).
// Edit text freely. To go live later:
//   - add `image`  -> a path like "/assets/case-ai-rag.jpg" (shown on hover, same as live-site cards)
//   - add `href`   -> a URL (Behance / Figma prototype / GitHub / Loom walkthrough); the card becomes a link.
// Keep `summary` factual: describe what the system does, not made-up numbers.

export type CaseStudy = {
  id: string;
  cat: string; // small mono label above the title
  title: string;
  summary: string; // concrete functional outcome
  stack: string[]; // tool chips
  bg: string; // gradient used behind the hover preview
  image?: string;
  href?: string;
  status?: string; // top-right badge, defaults to "Case Study"
};

export const caseStudies: CaseStudy[] = [
  {
    id: "ai-rag-automation",
    cat: "AI & Workflow Automation",
    title: "Enterprise AI Workflow & RAG Automation",
    summary:
      "n8n orchestrates automated email triage and CRM routing, with Claude/OpenAI and Groq handling the LLM steps and a Supabase vector store powering retrieval-augmented answers from the company's own knowledge base.",
    stack: ["n8n", "Claude / OpenAI", "Groq", "Supabase Vector", "RAG"],
    bg: "linear-gradient(135deg,#1a1208 0%,#2e1f10 100%)",
  },
  {
    id: "cloud-web-systems",
    cat: "Cloud & Web Systems",
    title: "Cloud & Web Systems Architecture",
    summary:
      "AWS-hosted infrastructure with Dockerised services and a GitHub-to-Netlify CI/CD pipeline, backed by PostgreSQL, built for high-availability CMS and e-commerce deployments.",
    stack: ["AWS", "Docker", "CI/CD", "GitHub", "Netlify", "PostgreSQL"],
    bg: "linear-gradient(135deg,#0a0a14 0%,#14142a 100%)",
  },
  {
    id: "saas-mobile-design-system",
    cat: "Product Design · UI/UX",
    title: "B2B SaaS & Mobile App Design System",
    summary:
      "A Figma design system for a B2B SaaS product and its mobile app: auto-layout components, variant-driven states and interactive prototypes that map directly to developer hand-off.",
    stack: ["Figma", "Auto-Layout", "Variants", "Prototyping", "Design System"],
    bg: "linear-gradient(135deg,#1e0e1c 0%,#321a2e 100%)",
  },
];
