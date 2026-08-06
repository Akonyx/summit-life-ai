import type { LucideIcon } from "lucide-react";

import { GlassCard, PageShell } from "@/components/page-shell";
import { Progress } from "@/components/ui/progress";

export type FeatureStat = { label: string; value: string; hint?: string };
export type FeaturePanel = {
  title: string;
  icon: LucideIcon;
  items?: string[];
  progress?: { label: string; value: number }[];
  note?: string;
  wide?: boolean;
};

export function FeaturePage({
  eyebrow,
  title,
  description,
  stats,
  panels,
}: {
  eyebrow: string;
  title: string;
  description: string;
  stats: FeatureStat[];
  panels: FeaturePanel[];
}) {
  return (
    <PageShell eyebrow={eyebrow} title={title} description={description}>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <GlassCard key={s.label}>
            <p className="truncate text-xs text-muted-foreground">{s.label}</p>
            <p className="mt-1 text-2xl font-bold text-gradient">{s.value}</p>
            {s.hint ? <p className="mt-2 text-xs text-muted-foreground">{s.hint}</p> : null}
          </GlassCard>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {panels.map((p) => (
          <GlassCard key={p.title} className={p.wide ? "lg:col-span-2" : ""}>
            <div className="flex items-center gap-2">
              <span className="bg-primary/12 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-primary">
                <p.icon className="h-4 w-4" />
              </span>
              <h2 className="min-w-0 flex-1 truncate text-sm font-semibold">{p.title}</h2>
            </div>
            {p.note ? <p className="mt-3 text-sm text-muted-foreground">{p.note}</p> : null}
            {p.progress ? (
              <div className="mt-4 space-y-4">
                {p.progress.map((g) => (
                  <div key={g.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="truncate font-medium">{g.label}</span>
                      <span className="shrink-0 text-muted-foreground">{g.value}%</span>
                    </div>
                    <Progress value={g.value} className="mt-2 h-2" />
                  </div>
                ))}
              </div>
            ) : null}
            {p.items ? (
              <ul className="mt-4 grid gap-2 text-sm">
                {p.items.map((i) => (
                  <li
                    key={i}
                    className="rounded-xl border border-border/50 px-3 py-2 transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            ) : null}
          </GlassCard>
        ))}
      </div>
    </PageShell>
  );
}