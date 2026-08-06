import { createFileRoute } from "@tanstack/react-router";
import { FileText, FileSignature, Presentation, ReceiptText } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Document Generator — LifeHub AI" },
      { name: "description", content: "Generate CVs, cover letters, reports, presentations, business plans, invoices and study notes with AI." },
      { property: "og:title", content: "Document Generator — LifeHub AI" },
      { property: "og:description", content: "AI-generated CVs, letters, reports, plans and invoices." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Documents"
      title="Document Generator"
      description="Professional documents drafted in seconds, then polished in your own voice."
      stats={[
        { label: "Documents created", value: "38" },
        { label: "Templates", value: "10" },
        { label: "Drafts in progress", value: "3" },
        { label: "Avg. time saved", value: "42 min" },
      ]}
      panels={[
        { title: "Templates", icon: FileText, wide: true, items: ["CV / Résumé", "Cover letter", "Business plan", "Report", "Meeting notes", "Invoice", "Certificate", "Formal letter", "Presentation outline", "Study notes"] },
        { title: "Recent", icon: FileSignature, items: ["Internship cover letter · yesterday", "Group project report · 3 Aug", "August invoice · 1 Aug"] },
        { title: "Presentations", icon: Presentation, note: "Give the AI a topic and it drafts slide titles, talking points and speaker notes." },
        { title: "Invoices", icon: ReceiptText, note: "Reusable client details, auto numbering and totals." },
      ]}
    />
  ),
});