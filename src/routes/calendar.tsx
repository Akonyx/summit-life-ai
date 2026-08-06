import { createFileRoute } from "@tanstack/react-router";
import { AlarmClock, CalendarDays, CalendarRange, Repeat } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Smart Calendar — LifeHub AI" },
      { name: "description", content: "Monthly, weekly and daily views with colour-coded events, recurring routines and AI scheduling." },
      { property: "og:title", content: "Smart Calendar — LifeHub AI" },
      { property: "og:description", content: "AI-assisted scheduling with reminders for exams, deadlines and birthdays." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Calendar"
      title="Smart Calendar"
      description="Month, week and day views with colour-coded events and an AI scheduling assistant."
      stats={[
        { label: "Events this week", value: "18", hint: "4 today" },
        { label: "Deadlines", value: "3", hint: "Next in 2 days" },
        { label: "Recurring routines", value: "7" },
        { label: "Free focus hours", value: "11h", hint: "AI protected" },
      ]}
      panels={[
        { title: "This week", icon: CalendarRange, wide: true, items: ["Mon · Stats lecture 08:00 · Gym 17:30", "Tue · Group project 10:00 · Budget review 20:00", "Wed · Dentist 09:15 · Deep work 13:00", "Thu · Team sync 14:00 · Reading 19:30", "Fri · Assignment deadline 23:59"] },
        { title: "AI scheduling", icon: CalendarDays, items: ["Move gym to 06:30 — you skip evening sessions 60% of the time", "Block Wed 13:00-16:00 for thesis writing", "Add a 15-min buffer before your dentist trip"] },
        { title: "Reminders", icon: AlarmClock, items: ["Statistics exam · 6 days", "Mom's birthday · 12 August", "Rent due · 1 September"] },
        { title: "Recurring events", icon: Repeat, items: ["Morning meditation · daily 06:00", "Meal prep · Sundays 16:00", "Budget review · Tuesdays 20:00"] },
      ]}
    />
  ),
});