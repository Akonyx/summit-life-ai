import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM = `You are LifeHub AI, a warm, sharp personal life-management assistant.
You help with productivity, study, finance, health, fitness, wellness, travel, writing and career.
Be concise, practical and encouraging. Use markdown-free plain text with short paragraphs and simple
dash bullet lists. Keep answers under 250 words unless the user asks for more.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: Msg[] };
        const messages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];
        if (messages.length === 0) {
          return new Response(JSON.stringify({ error: "No messages" }), { status: 400 });
        }

        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return new Response(JSON.stringify({ error: "AI is not configured" }), { status: 500 });
        }

        const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({
            model: "openai/gpt-5.6-sol",
            instructions: SYSTEM,
            input: messages.map((m) => ({ role: m.role, content: m.content })),
          }),
        });

        if (!res.ok) {
          const status = res.status === 429 || res.status === 402 ? res.status : 500;
          const error =
            status === 429
              ? "Too many requests right now — please try again in a moment."
              : status === 402
                ? "AI credits are exhausted. Add credits to keep chatting."
                : "The assistant could not answer just now.";
          return new Response(JSON.stringify({ error }), { status });
        }

        const data = (await res.json()) as {
          output_text?: string;
          output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
        };
        const text =
          data.output_text ??
          data.output
            ?.flatMap((o) => o.content ?? [])
            .filter((c) => c.type === "output_text")
            .map((c) => c.text ?? "")
            .join("") ??
          "";

        return new Response(JSON.stringify({ text: text.trim() }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});