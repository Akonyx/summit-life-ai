import { createFileRoute } from "@tanstack/react-router";
import { BookMarked, Mic, NotebookPen, Sparkles } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — LifeHub AI" },
      { name: "description", content: "A beautiful notebook for written, voice and photo entries with AI summaries and mood analysis." },
      { property: "og:title", content: "Journal — LifeHub AI" },
      { property: "og:description", content: "Write, record and reflect with AI-assisted mood analysis." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Journal"
      title="Journal"
      description="Write it down, say it out loud, or capture it in a photo — then let AI find the pattern."
      stats={[
        { label: "Entries", value: "146" },
        { label: "Current streak", value: "9 days" },
        { label: "Words this month", value: "8,420" },
        { label: "Dominant mood", value: "Hopeful" },
      ]}
      panels={[
        { title: "Recent entries", icon: NotebookPen, wide: true, items: ["6 Aug · \"Chapter three finally clicked today…\"", "5 Aug · \"Nervous about the exam, but the study plan helps.\"", "3 Aug · \"Long walk with Thabo. Needed that.\""] },
        { title: "Voice journal", icon: Mic, note: "Record a 2-minute entry and LifeHub AI transcribes and summarises it for you." },
        { title: "Mood analysis", icon: Sparkles, progress: [{ label: "Positive", value: 62 }, { label: "Neutral", value: 26 }, { label: "Stressed", value: 12 }] },
        { title: "AI summary", icon: BookMarked, note: "This month you wrote most about study pressure and family — and every entry after exercise was more positive." },
      ]}
    />
  ),
});