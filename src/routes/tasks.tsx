import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, Inbox, Layers } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — LifeHub AI" },
      { name: "description", content: "Capture, prioritise and complete tasks with smart lists, due dates and AI triage." },
      { property: "og:title", content: "Tasks — LifeHub AI" },
      { property: "og:description", content: "Smart task lists with priorities, due dates and AI triage." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Tasks"
      title="Task Manager"
      description="Everything you need to do, sorted by what actually matters today."
      stats={[
        { label: "Due today", value: "7", hint: "3 high priority" },
        { label: "Completed today", value: "12" },
        { label: "Overdue", value: "2" },
        { label: "Weekly completion", value: "84%" },
      ]}
      panels={[
        { title: "Today", icon: CheckCircle2, wide: true, items: ["Finish thesis chapter 3 · high", "Submit tutorial 4 · high", "Reply to bursary email · medium", "Grocery run · low", "Book gym class · low"] },
        { title: "AI triage", icon: Layers, items: ["Do the tutorial first — it's due in 6 hours", "Batch your 3 admin emails at 16:00", "Delegate or drop the poster design"] },
        { title: "Upcoming", icon: Clock, items: ["Mon · Group presentation slides", "Tue · Dentist forms", "Wed · Renew student card"] },
        { title: "Inbox", icon: Inbox, items: ["Idea: automate monthly report", "Follow up on internship application"] },
      ]}
    />
  ),
});