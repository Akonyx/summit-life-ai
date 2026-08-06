import { createFileRoute } from "@tanstack/react-router";
import { Dumbbell, Flame, Footprints, LineChart } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/fitness")({
  head: () => ({
    meta: [
      { title: "Fitness Hub — LifeHub AI" },
      { name: "description", content: "Workout planner, exercise library, weight tracking, running logs and weekly reports." },
      { property: "og:title", content: "Fitness Hub — LifeHub AI" },
      { property: "og:description", content: "Plan workouts, track progress and see weekly fitness reports." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Fitness"
      title="Fitness Hub"
      description="Plans, progress and proof — training that compounds week after week."
      stats={[
        { label: "Workouts this week", value: "3 / 5" },
        { label: "Calories burned", value: "2,140" },
        { label: "Longest run", value: "7.2 km" },
        { label: "Weight", value: "72.4 kg", hint: "-1.6 kg in 8 weeks" },
      ]}
      panels={[
        { title: "This week's plan", icon: Dumbbell, wide: true, items: ["Mon · Upper body push · 45 min", "Tue · Easy 5km run", "Thu · Lower body · 50 min", "Sat · Intervals 6 × 400m", "Sun · Mobility & stretch"] },
        { title: "Exercise library", icon: Footprints, items: ["Push-ups · chest, triceps", "Goblet squat · quads, glutes", "Romanian deadlift · hamstrings", "Plank · core"] },
        { title: "Weekly report", icon: LineChart, progress: [{ label: "Volume goal", value: 68 }, { label: "Cardio minutes", value: 55 }, { label: "Recovery", value: 80 }] },
        { title: "AI coach", icon: Flame, note: "Your pull volume is 40% behind push. Add one rowing session before Saturday." },
      ]}
    />
  ),
});