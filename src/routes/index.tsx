import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  BedDouble,
  BookOpen,
  CheckCircle2,
  CloudSun,
  Droplets,
  Flame,
  Quote,
  Sparkles,
  Target,
  Timer,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { GlassCard, PageShell } from "@/components/page-shell";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — LifeHub AI" },
      {
        name: "description",
        content:
          "See your day at a glance: schedule, goals, habits, mood, sleep, money and AI insights in one premium workspace.",
      },
      { property: "og:title", content: "Dashboard — LifeHub AI" },
      {
        property: "og:description",
        content: "Your intelligent life management dashboard: goals, habits, health and finance.",
      },
    ],
  }),
  component: Dashboard,
});

const schedule = [
  { time: "08:00", title: "Deep work — Thesis chapter 3", tone: "bg-gradient-brand" },
  { time: "11:30", title: "Gym — Upper body", tone: "bg-gradient-fresh" },
  { time: "14:00", title: "Team sync call", tone: "bg-gradient-warm" },
  { time: "19:30", title: "Read 20 pages", tone: "bg-gradient-brand" },
];

const habits = [
  { name: "Water", value: 80, streak: 14 },
  { name: "Workout", value: 60, streak: 5 },
  { name: "Meditate", value: 95, streak: 31 },
  { name: "Read", value: 45, streak: 3 },
];

const moodData = [
  { day: "Mon", mood: 6 },
  { day: "Tue", mood: 7 },
  { day: "Wed", mood: 5 },
  { day: "Thu", mood: 8 },
  { day: "Fri", mood: 9 },
  { day: "Sat", mood: 8 },
  { day: "Sun", mood: 7 },
];

const studyData = [
  { day: "Mon", hrs: 2 },
  { day: "Tue", hrs: 3.5 },
  { day: "Wed", hrs: 1 },
  { day: "Thu", hrs: 4 },
  { day: "Fri", hrs: 2.5 },
  { day: "Sat", hrs: 5 },
  { day: "Sun", hrs: 3 },
];

const insights = [
  "You focus best between 07:00 and 10:00 — protect that window.",
  "You haven't logged a workout in 3 days. A 20-minute walk counts.",
  "Trimming takeaways twice a week could save you R500 this month.",
  "Statistics exam in 6 days — 4 flashcard decks still untouched.",
];

function Dashboard() {
  return (
    <PageShell
      eyebrow="Good morning, Anele"
      title="Your day, beautifully in order"
      description="Thursday, 6 August · 4 events · 7 tasks · 68% of today's plan complete"
      actions={
        <Link
          to="/assistant"
          className="bg-gradient-brand inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white glow"
        >
          <Sparkles className="h-4 w-4" /> Ask LifeHub AI
        </Link>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={CheckCircle2} label="Tasks completed" value="12 / 18" hint="+4 vs yesterday" tone="bg-gradient-brand" />
        <StatCard icon={Flame} label="Habit streak" value="31 days" hint="Meditation" tone="bg-gradient-warm" />
        <StatCard icon={Wallet} label="Spent this month" value="R4,280" hint="68% of budget" tone="bg-gradient-fresh" />
        <StatCard icon={Activity} label="Calories burned" value="612 kcal" hint="Goal 800" tone="bg-gradient-brand" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <CardTitle icon={Timer} title="Today's schedule" hint="4 events" />
          <ul className="mt-4 space-y-3">
            {schedule.map((e) => (
              <li key={e.time} className="flex items-center gap-3 rounded-xl border border-border/50 p-3">
                <span className={`${e.tone} h-10 w-1.5 shrink-0 rounded-full`} />
                <span className="w-14 shrink-0 text-sm font-semibold text-muted-foreground">{e.time}</span>
                <span className="min-w-0 flex-1 truncate text-sm font-medium">{e.title}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard>
          <CardTitle icon={Sparkles} title="AI insights" hint="Personalised" />
          <ul className="mt-4 space-y-3">
            {insights.map((i) => (
              <li key={i} className="rounded-xl bg-primary/8 p-3 text-sm leading-relaxed">
                {i}
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard>
          <CardTitle icon={Target} title="Current goals" hint="3 active" />
          <div className="mt-4 space-y-4">
            {[
              { name: "Save R20,000", pct: 62 },
              { name: "Read 24 books", pct: 45 },
              { name: "Run 10km non-stop", pct: 78 },
            ].map((g) => (
              <div key={g.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate font-medium">{g.name}</span>
                  <span className="text-muted-foreground">{g.pct}%</span>
                </div>
                <Progress value={g.pct} className="mt-2 h-2" />
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <CardTitle icon={Droplets} title="Habit progress" hint="Today" />
          <div className="mt-4 grid grid-cols-2 gap-4">
            {habits.map((h) => (
              <Ring key={h.name} label={h.name} value={h.value} sub={`${h.streak}d streak`} />
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <CardTitle icon={Activity} title="Mood tracker" hint="7 days" />
          <div className="mt-4 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={moodData}>
                <defs>
                  <linearGradient id="moodFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.62 0.22 293)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="oklch(0.62 0.22 293)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip cursor={false} />
                <Area
                  type="monotone"
                  dataKey="mood"
                  stroke="oklch(0.62 0.22 293)"
                  strokeWidth={2.5}
                  fill="url(#moodFill)"
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <CardTitle icon={BookOpen} title="Study progress" hint="17.5 hrs this week" />
          <div className="mt-4 h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyData}>
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={11} />
                <Tooltip cursor={false} />
                <Bar dataKey="hrs" radius={6} fill="oklch(0.7 0.13 195)" isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <CardTitle icon={BedDouble} title="Sleep summary" hint="Last night" />
          <p className="mt-4 text-4xl font-bold">7h 12m</p>
          <p className="text-sm text-muted-foreground">Deep 1h 48m · REM 1h 30m · Score 82</p>
          <Progress value={82} className="mt-4 h-2" />
        </GlassCard>

        <GlassCard>
          <CardTitle icon={CloudSun} title="Weather" hint="Johannesburg" />
          <div className="mt-4 flex items-center gap-4">
            <p className="text-5xl font-bold">21°</p>
            <div className="text-sm text-muted-foreground">
              <p>Sunny, light breeze</p>
              <p>H 24° · L 11°</p>
            </div>
          </div>
        </GlassCard>

        <FocusTimer />

        <GlassCard>
          <CardTitle icon={Quote} title="Daily motivation" />
          <p className="mt-4 text-lg leading-relaxed font-medium">
            “Discipline is choosing between what you want now and what you want most.”
          </p>
          <p className="mt-2 text-sm text-muted-foreground">— Abraham Lincoln</p>
        </GlassCard>

        <QuickNotes />
      </div>
    </PageShell>
  );
}

function CardTitle({
  icon: Icon,
  title,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="bg-primary/12 grid h-8 w-8 shrink-0 place-items-center rounded-lg text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <h2 className="min-w-0 flex-1 truncate text-sm font-semibold">{title}</h2>
      {hint ? <span className="shrink-0 text-xs text-muted-foreground">{hint}</span> : null}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint: string;
  tone: string;
}) {
  return (
    <GlassCard>
      <div className="flex items-center gap-3">
        <span className={`${tone} grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-xs text-muted-foreground">{label}</p>
          <p className="truncate text-xl font-bold">{value}</p>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{hint}</p>
    </GlassCard>
  );
}

function Ring({ label, value, sub }: { label: string; value: number; sub: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="grid h-20 w-20 place-items-center rounded-full"
        style={{
          background: `conic-gradient(oklch(0.62 0.22 293) ${value * 3.6}deg, var(--color-muted) 0deg)`,
        }}
      >
        <div className="grid h-15 w-15 place-items-center rounded-full bg-background text-sm font-bold">
          {value}%
        </div>
      </div>
      <p className="text-xs font-medium">{label}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
    </div>
  );
}

function FocusTimer() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <GlassCard>
      <CardTitle icon={Timer} title="Focus timer" hint="Pomodoro" />
      <p className="mt-4 text-center font-display text-5xl font-bold tabular-nums">
        {mm}:{ss}
      </p>
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className="bg-gradient-brand rounded-full px-5 py-2 text-sm font-semibold text-white"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setSeconds(25 * 60);
          }}
          className="rounded-full border border-border px-5 py-2 text-sm font-semibold"
        >
          Reset
        </button>
      </div>
    </GlassCard>
  );
}

function QuickNotes() {
  const [notes, setNotes] = useState<string[]>(["Email Prof about extension", "Buy running shoes"]);
  const [draft, setDraft] = useState("");

  return (
    <GlassCard>
      <CardTitle icon={CheckCircle2} title="Quick notes" hint={`${notes.length} saved`} />
      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!draft.trim()) return;
          setNotes((n) => [draft.trim(), ...n]);
          setDraft("");
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Capture a thought…"
          aria-label="New note"
          className="min-w-0 flex-1 rounded-full border border-border bg-background/60 px-4 py-2 text-sm outline-none"
        />
        <button className="bg-gradient-brand shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-white">
          Add
        </button>
      </form>
      <ul className="mt-3 space-y-2 text-sm">
        {notes.map((n, i) => (
          <li key={`${n}-${i}`} className="rounded-lg border border-border/50 px-3 py-2">
            {n}
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
