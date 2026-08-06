import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Car, Home, Plane } from "lucide-react";

import { GlassCard, PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/vision-board")({
  head: () => ({
    meta: [
      { title: "Vision Board — LifeHub AI" },
      { name: "description", content: "Arrange the life you're building: career, home, travel, fitness, family and business dreams." },
      { property: "og:title", content: "Vision Board — LifeHub AI" },
      { property: "og:description", content: "A visual board for the life you're building." },
    ],
  }),
  component: VisionBoard,
});

const tiles = [
  { title: "Career", note: "Junior data analyst by June", icon: Briefcase, tone: "bg-gradient-brand", span: "sm:col-span-2 sm:row-span-2" },
  { title: "Home", note: "Sunlit apartment, plants everywhere", icon: Home, tone: "bg-gradient-fresh", span: "" },
  { title: "Travel", note: "Cape Town, then Zanzibar", icon: Plane, tone: "bg-gradient-warm", span: "" },
  { title: "Car", note: "Reliable, paid in cash", icon: Car, tone: "bg-gradient-brand", span: "sm:col-span-2" },
];

function VisionBoard() {
  return (
    <PageShell
      eyebrow="Vision Board"
      title="The life you're building"
      description="Drop in the images and words that keep you moving. Career, home, travel, family, business."
      actions={
        <button className="bg-gradient-brand rounded-full px-4 py-2 text-sm font-semibold text-white">
          Upload image
        </button>
      }
    >
      <div className="grid auto-rows-[160px] gap-4 sm:grid-cols-4">
        {tiles.map((t) => (
          <div
            key={t.title}
            className={`${t.tone} ${t.span} group relative overflow-hidden rounded-2xl p-5 text-white shadow-lg transition-transform duration-300 hover:-translate-y-1`}
          >
            <t.icon className="h-6 w-6 opacity-90" />
            <p className="mt-3 text-lg font-bold">{t.title}</p>
            <p className="text-sm opacity-85">{t.note}</p>
          </div>
        ))}
        <GlassCard className="grid place-items-center text-center sm:col-span-2">
          <div>
            <p className="text-sm font-semibold">Add your own</p>
            <p className="text-xs text-muted-foreground">Drag images anywhere on the board</p>
          </div>
        </GlassCard>
      </div>
    </PageShell>
  );
}