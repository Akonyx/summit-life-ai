import { createFileRoute } from "@tanstack/react-router";
import { Flag, Lightbulb, Target, Trophy } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/goals")({
  head: () => ({
    meta: [
      { title: "Smart Goals — LifeHub AI" },
      { name: "description", content: "Track goals with milestones, deadlines, completion percentages and AI recommendations." },
      { property: "og:title", content: "Smart Goals — LifeHub AI" },
      { property: "og:description", content: "Milestones, deadlines and AI coaching for every goal you set." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Goals"
      title="Smart Goals"
      description="Every goal broken into milestones, deadlines and AI-backed next steps."
      stats={[
        { label: "Active goals", value: "6" },
        { label: "Completed", value: "14", hint: "This year" },
        { label: "Average progress", value: "58%" },
        { label: "Closest deadline", value: "9 days", hint: "Pass Statistics" },
      ]}
      panels={[
        { title: "Progress", icon: Target, wide: true, progress: [{ label: "Save R20,000", value: 62 }, { label: "Read 24 books", value: 45 }, { label: "Run 10km non-stop", value: 78 }, { label: "Learn Python", value: 34 }, { label: "Get a promotion", value: 51 }] },
        { title: "Milestones", icon: Flag, items: ["R12,400 saved of R20,000", "11 books finished", "7km longest run", "3 of 8 Python modules done"] },
        { title: "AI recommendations", icon: Lightbulb, items: ["Automate a R1,500 transfer on payday", "Swap 20 min of scrolling for reading", "Add one interval run per week"] },
        { title: "Motivation", icon: Trophy, note: "You have kept 4 goals moving for 9 straight weeks — your best streak yet." },
      ]}
    />
  ),
});