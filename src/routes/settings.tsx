import { createFileRoute } from "@tanstack/react-router";
import { Accessibility, Bell, Keyboard, ShieldCheck } from "lucide-react";

import { FeaturePage } from "@/components/feature-page";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — LifeHub AI" },
      { name: "description", content: "Control appearance, notifications, accessibility, privacy and security for your LifeHub AI workspace." },
      { property: "og:title", content: "Settings — LifeHub AI" },
      { property: "og:description", content: "Appearance, privacy, accessibility and notification controls." },
    ],
  }),
  component: () => (
    <FeaturePage
      eyebrow="Settings"
      title="Settings"
      description="Make LifeHub work the way your brain works."
      stats={[
        { label: "Theme", value: "Auto", hint: "Light / Dark toggle in header" },
        { label: "Security", value: "2FA on" },
        { label: "Data encryption", value: "Enabled" },
        { label: "Connected logins", value: "Google, Email" },
      ]}
      panels={[
        { title: "Accessibility", icon: Accessibility, wide: true, items: ["Large touch targets and readable type", "High contrast mode", "Screen-reader friendly labels and landmarks", "Reduced motion support"] },
        { title: "Notifications", icon: Bell, items: ["Daily plan · 07:00", "Habit nudges · evening", "Bill reminders · 3 days before"] },
        { title: "Privacy & security", icon: ShieldCheck, items: ["Sign in with Google, Microsoft or email", "Password recovery", "Encrypted at rest and in transit"] },
        { title: "Keyboard shortcuts", icon: Keyboard, items: ["⌘K · global search", "G then D · dashboard", "N · new task"] },
      ]}
    />
  ),
});