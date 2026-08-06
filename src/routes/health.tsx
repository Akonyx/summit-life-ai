import { createFileRoute } from "@tanstack/react-router";
import { Droplets, HeartPulse, Pill, Stethoscope } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/health")({
  head: () => ({
    meta: [
      { title: "Health Hub — LifeHub AI" },
      { name: "description", content: "Water, medication, calories, BMI, sleep and mood tracking with AI wellness tips." },
      { property: "og:title", content: "Health Hub — LifeHub AI" },
      { property: "og:description", content: "Daily health tracking with gentle AI guidance." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Health"
      title="Health Hub"
      description="Hydration, sleep, medication and vitals — quietly tracked, clearly explained."
      stats={[
        { label: "Water today", value: "1.8 L", hint: "Goal 2.5 L" },
        { label: "Sleep last night", value: "7h 12m", hint: "Score 82" },
        { label: "Calories", value: "1,740", hint: "Goal 2,100" },
        { label: "BMI", value: "22.4", hint: "Healthy range" },
      ]}
      panels={[
        { title: "Daily tracking", icon: Droplets, wide: true, progress: [{ label: "Water", value: 72 }, { label: "Sleep", value: 82 }, { label: "Nutrition", value: 64 }, { label: "Steps", value: 58 }] },
        { title: "Medication", icon: Pill, items: ["Vitamin D · 08:00 · taken", "Iron supplement · 20:00 · pending"] },
        { title: "Appointments", icon: Stethoscope, items: ["Dentist · Wed 09:15", "Annual check-up · 18 September"] },
        { title: "AI wellness tips", icon: HeartPulse, items: ["Two glasses before noon fixes your afternoon slump", "Screens off 45 min earlier would add ~30 min of deep sleep"] },
      ]}
    />
  ),
});