import { createFileRoute } from "@tanstack/react-router";
import { Brain, GraduationCap, Layers, Timer } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/study")({
  head: () => ({
    meta: [
      { title: "Study Hub — LifeHub AI" },
      { name: "description", content: "AI tutor, flashcards, quiz generator, exam planner and Pomodoro timer for students." },
      { property: "og:title", content: "Study Hub — LifeHub AI" },
      { property: "og:description", content: "Flashcards, AI quizzes, exam planning and study analytics in one place." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Study Hub"
      title="Study Hub"
      description="An AI tutor, flashcards, quizzes and an exam planner built for real student life."
      stats={[
        { label: "Hours this week", value: "17.5", hint: "+3.2 vs last week" },
        { label: "Flashcards mastered", value: "218 / 340" },
        { label: "Next exam", value: "6 days", hint: "Statistics 201" },
        { label: "Quiz average", value: "82%" },
      ]}
      panels={[
        { title: "Subject progress", icon: GraduationCap, wide: true, progress: [{ label: "Statistics 201", value: 64 }, { label: "Databases", value: 81 }, { label: "Networks", value: 47 }, { label: "Business Ethics", value: 92 }] },
        { title: "AI tutor", icon: Brain, items: ["Explain hypothesis testing simply", "Generate 10 quiz questions on SQL joins", "Summarise chapter 7 into one page"] },
        { title: "Flashcard decks", icon: Layers, items: ["Statistics formulas · 42 cards", "SQL joins · 28 cards", "OSI model · 18 cards"] },
        { title: "Pomodoro", icon: Timer, note: "4 focus blocks completed today · 100 minutes of deep work." },
      ]}
    />
  ),
});