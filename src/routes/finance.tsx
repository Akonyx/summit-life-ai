import { createFileRoute } from "@tanstack/react-router";
import { Banknote, PiggyBank, Receipt, TrendingUp } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Finance Hub — LifeHub AI" },
      { name: "description", content: "Track income, expenses, savings goals and bills with AI budget recommendations and a financial health score." },
      { property: "og:title", content: "Finance Hub — LifeHub AI" },
      { property: "og:description", content: "Budgets, spending analytics and AI money coaching." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Finance"
      title="Finance Hub"
      description="Where your money goes, where it should go, and how to close the gap."
      stats={[
        { label: "Income this month", value: "R9,800" },
        { label: "Spent", value: "R4,280", hint: "68% of budget" },
        { label: "Saved", value: "R2,150", hint: "Goal R3,000" },
        { label: "Financial health", value: "74 / 100" },
      ]}
      panels={[
        { title: "Spending by category", icon: Receipt, wide: true, progress: [{ label: "Groceries", value: 42 }, { label: "Transport", value: 28 }, { label: "Data & subscriptions", value: 18 }, { label: "Eating out", value: 22 }, { label: "Entertainment", value: 11 }] },
        { title: "AI budget coach", icon: TrendingUp, items: ["Two fewer takeaways a week frees R500", "Cancel the duplicate music subscription", "Move R1,500 to savings on the 25th"] },
        { title: "Savings goals", icon: PiggyBank, progress: [{ label: "Emergency fund", value: 62 }, { label: "New laptop", value: 35 }, { label: "December trip", value: 18 }] },
        { title: "Upcoming bills", icon: Banknote, items: ["Rent · R3,200 · 1 Sep", "Data bundle · R399 · 3 Sep", "Gym · R450 · 5 Sep"] },
      ]}
    />
  ),
});