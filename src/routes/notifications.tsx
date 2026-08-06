import { createFileRoute } from "@tanstack/react-router";
import { Bell, CalendarClock, Gift, Wallet } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — LifeHub AI" },
      { name: "description", content: "One calm notification centre for tasks, deadlines, bills, birthdays, habits and study sessions." },
      { property: "og:title", content: "Notifications — LifeHub AI" },
      { property: "og:description", content: "All your reminders in one calm place." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Notifications"
      title="Notification Centre"
      description="Everything asking for your attention, ranked by what actually matters."
      stats={[
        { label: "Unread", value: "6" },
        { label: "Due today", value: "4" },
        { label: "This week", value: "19" },
        { label: "Muted channels", value: "2" },
      ]}
      panels={[
        { title: "Today", icon: Bell, wide: true, items: ["Tutorial 4 due at 23:59", "Meditation habit not logged yet", "Team sync starts in 40 minutes", "Water goal 0.7 L behind"] },
        { title: "Deadlines", icon: CalendarClock, items: ["Statistics exam · 6 days", "Bursary form · 9 days"] },
        { title: "Bills", icon: Wallet, items: ["Rent R3,200 · 1 Sep", "Gym R450 · 5 Sep"] },
        { title: "Celebrations", icon: Gift, items: ["Mom's birthday · 12 Aug", "1 year of journaling · 20 Aug"] },
      ]}
    />
  ),
});