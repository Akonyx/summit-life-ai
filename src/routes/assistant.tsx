import { createFileRoute } from "@tanstack/react-router";
import { Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — LifeHub AI" },
      {
        name: "description",
        content:
          "Chat with LifeHub AI to plan your day, study smarter, budget better, write documents and get emotional support.",
      },
      { property: "og:title", content: "AI Assistant — LifeHub AI" },
      {
        property: "og:description",
        content: "An intelligent assistant for study, money, health, career and everyday planning.",
      },
    ],
  }),
  component: Assistant,
});

type Msg = { role: "user" | "assistant"; content: string };

const suggestions = [
  "Plan my study schedule for finals",
  "Write a professional cover letter",
  "Build me a R6,000 monthly budget",
  "Suggest a 30-minute home workout",
  "Give me 5 startup ideas for students",
  "Help me calm down before an exam",
];

function Assistant() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [loading]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { text?: string; error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? "Request failed");
      setMessages([...next, { role: "assistant", content: data.text ?? "" }]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setMessages(next);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell
      eyebrow="AI Assistant"
      title="Ask LifeHub anything"
      description="Study help, budgets, workouts, writing, planning and a listening ear — all in one chat."
    >
      <div className="glass flex h-[70vh] flex-col rounded-2xl p-4 sm:p-6">
        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <span className="bg-gradient-brand grid h-14 w-14 place-items-center rounded-2xl text-white glow animate-float">
                <Sparkles className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-xl font-bold">How can I help today?</h2>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                I can plan, write, calculate, teach, motivate and organise. Pick a prompt or type
                your own.
              </p>
              <div className="mt-6 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-xl border border-border/60 px-4 py-3 text-left text-sm transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/5"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={
                    m.role === "user"
                      ? "bg-primary max-w-[85%] rounded-2xl rounded-br-md px-4 py-3 text-sm whitespace-pre-wrap text-primary-foreground"
                      : "max-w-[85%] text-sm leading-relaxed whitespace-pre-wrap text-foreground"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))
          )}
          {loading ? (
            <p className="animate-pulse text-sm text-muted-foreground">LifeHub AI is thinking…</p>
          ) : null}
          <div ref={endRef} />
        </div>

        <form
          className="mt-4 flex items-end gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send(input);
              }
            }}
            rows={2}
            placeholder="Message LifeHub AI…"
            aria-label="Message"
            className="min-h-12 min-w-0 flex-1 resize-none rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary/60"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="bg-gradient-brand grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </PageShell>
  );
}