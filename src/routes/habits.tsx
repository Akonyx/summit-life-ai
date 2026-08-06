import { createFileRoute } from "@tanstack/react-router";
import { Award, Flame, Repeat, Sparkles } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/habits")({
  head: () => ({
    meta: [
      { title: "Habit Tracker — LifeHub AI" },
      { name: "description", content: "Build habits with streaks, progress rings, achievements and gentle AI nudges." },
      { property: "og:title", content: "Habit Tracker — LifeHub AI" },
      { property: "og:description", content: "Streaks, rings and rewards that make good habits stick." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Habits"
      title="Habit Tracker"
      description="Small daily wins, tracked with streaks, rings and rewards."
      stats={[
        { label: "Longest streak", value: "31 days", hint: "Meditation" },
        { label: "Habits today", value: "5 / 8" },
        { label: "Consistency", value: "76%", hint: "Last 30 days" },
        { label: "Badges earned", value: "17" },
      ]}
      panels={[
        { title: "Today's habits", icon: Repeat, wide: true, progress: [{ label: "Drink water", value: 80 }, { label: "Workout", value: 60 }, { label: "Meditate", value: 100 }, { label: "Read", value: 45 }, { label: "Sleep early", value: 30 }] },
        { title: "Streaks", icon: Flame, items: ["Meditate · 31 days 🔥", "Water · 14 days", "Journal · 9 days", "Workout · 5 days"] },
        { title: "Achievements", icon: Award, items: ["Hydration Hero · 14-day water streak", "Early Riser · 10 mornings before 06:00", "Bookworm · 11 books read"] },
        { title: "AI nudge", icon: Sparkles, note: "You break the reading habit on Fridays. Try 10 pages right after dinner instead of before bed." },
      ]}
    />
  ),
});