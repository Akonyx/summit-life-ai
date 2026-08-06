import { createFileRoute } from "@tanstack/react-router";
import { Heart, Smile, Sparkles, Wind } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/wellness")({
  head: () => ({
    meta: [
      { title: "Mental Wellness — LifeHub AI" },
      { name: "description", content: "Affirmations, mood diary, meditation timer, breathing exercises and AI emotional support." },
      { property: "og:title", content: "Mental Wellness — LifeHub AI" },
      { property: "og:description", content: "A calm space for mood, gratitude, breathing and support." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Mental Wellness"
      title="Mental Wellness"
      description="A quiet corner of the app for breathing, gratitude and honest check-ins."
      stats={[
        { label: "Mood average", value: "7.1 / 10", hint: "Last 7 days" },
        { label: "Meditation", value: "94 min", hint: "This week" },
        { label: "Stress level", value: "Moderate" },
        { label: "Gratitude entries", value: "22" },
      ]}
      panels={[
        { title: "Today's affirmation", icon: Sparkles, wide: true, note: "\"I am allowed to move at my own pace. Progress counts even when it is quiet.\"" },
        { title: "Breathing", icon: Wind, items: ["Box breathing · 4-4-4-4 · 3 min", "Calm down · 4-7-8 · 2 min", "Energise · 30 breaths · 90 sec"] },
        { title: "Mood diary", icon: Smile, progress: [{ label: "Calm", value: 68 }, { label: "Energy", value: 54 }, { label: "Focus", value: 71 }] },
        { title: "AI support", icon: Heart, note: "Exam pressure showed up in three entries this week. Want to talk it through in the assistant?" },
      ]}
    />
  ),
});