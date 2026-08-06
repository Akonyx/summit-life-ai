import { createFileRoute } from "@tanstack/react-router";
import { Award, Crown, Flame, Star } from "lucide-react";

import { GlassCard, PageShell } from "@/components/page-shell";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — LifeHub AI" },
      { name: "description", content: "Your LifeHub profile: XP, level, badges, streaks and lifetime progress across every hub." },
      { property: "og:title", content: "Profile — LifeHub AI" },
      { property: "og:description", content: "XP, levels, badges and streaks for your LifeHub journey." },
    ],
  }),
  component: Profile,
});

const badges = [
  { name: "Hydration Hero", icon: Star },
  { name: "31-day Zen", icon: Flame },
  { name: "Budget Boss", icon: Crown },
  { name: "Bookworm", icon: Award },
];

function Profile() {
  return (
    <PageShell eyebrow="Profile" title="Anele Ndlovu" description="Member since March 2025 · Level 12 Trailblazer">
      <div className="grid gap-4 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-brand grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-xl font-black text-white glow">
              AN
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold">Anele Ndlovu</p>
              <p className="truncate text-sm text-muted-foreground">anele@lifehub.ai · Johannesburg</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Level 12 · Trailblazer</span>
              <span className="text-muted-foreground">3,420 / 5,000 XP</span>
            </div>
            <Progress value={68} className="mt-2 h-3" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Day streak", value: "31" },
              { label: "Goals completed", value: "14" },
              { label: "Weekly challenges", value: "9" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-border/50 p-4">
                <p className="text-2xl font-bold text-gradient">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h2 className="text-sm font-semibold">Badges</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {badges.map((b) => (
              <div key={b.name} className="rounded-xl border border-border/50 p-3 text-center">
                <b.icon className="mx-auto h-5 w-5 text-primary" />
                <p className="mt-2 text-xs font-medium">{b.name}</p>
              </div>
            ))}
          </div>
          <h2 className="mt-6 text-sm font-semibold">This week's challenge</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Log 5 workouts and earn 250 XP + the Iron Week badge.
          </p>
          <Progress value={60} className="mt-3 h-2" />
        </GlassCard>
      </div>
    </PageShell>
  );
}