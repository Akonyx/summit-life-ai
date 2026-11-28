import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, Circle, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { GlassCard, PageShell } from "@/components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  deleteLifeHubEntry,
  formatDay,
  formatRand,
  listLifeHubEntries,
  saveLifeHubEntry,
  setLifeHubEntryComplete,
  todayIso,
  type FormValues,
  type LifeHubEntry,
  type LifeHubKind,
} from "@/lib/lifehub-data";

type FieldOption = { label: string; value: string };
type Field = {
  key: string;
  label: string;
  type: "text" | "number" | "date" | "textarea" | "select";
  required: boolean;
  placeholder: string;
  wide: boolean;
  min?: number;
  step?: string;
  options?: FieldOption[];
};

const fieldsByKind: Record<LifeHubKind, Field[]> = {
  tasks: [
    { key: "title", label: "Task", type: "text", required: true, placeholder: "What needs doing?", wide: true },
    { key: "details", label: "Details", type: "textarea", required: false, placeholder: "Add a note (optional)", wide: true },
    { key: "due_date", label: "Due date", type: "date", required: false, placeholder: "", wide: false },
    {
      key: "priority",
      label: "Priority",
      type: "select",
      required: true,
      placeholder: "Choose priority",
      wide: false,
      options: [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
      ],
    },
  ],
  habits: [
    { key: "name", label: "Habit", type: "text", required: true, placeholder: "e.g. Take a walk", wide: true },
    {
      key: "frequency",
      label: "Frequency",
      type: "select",
      required: true,
      placeholder: "Choose frequency",
      wide: false,
      options: [
        { label: "Daily", value: "daily" },
        { label: "Weekdays", value: "weekdays" },
        { label: "Weekly", value: "weekly" },
      ],
    },
  ],
  goals: [
    { key: "title", label: "Goal", type: "text", required: true, placeholder: "What would you like to achieve?", wide: true },
    { key: "current_value", label: "Current progress", type: "number", required: true, placeholder: "0", wide: false, min: 0, step: "any" },
    { key: "target_value", label: "Target", type: "number", required: true, placeholder: "1", wide: false, min: 0.01, step: "any" },
    { key: "unit", label: "Unit", type: "text", required: false, placeholder: "e.g. km, books, R", wide: false },
    { key: "due_date", label: "Target date", type: "date", required: false, placeholder: "", wide: false },
  ],
  transactions: [
    { key: "description", label: "Description", type: "text", required: true, placeholder: "What was this for?", wide: true },
    { key: "amount", label: "Amount (R)", type: "number", required: true, placeholder: "0.00", wide: false, min: 0.01, step: "0.01" },
    {
      key: "kind",
      label: "Type",
      type: "select",
      required: true,
      placeholder: "Choose type",
      wide: false,
      options: [
        { label: "Expense", value: "expense" },
        { label: "Income", value: "income" },
      ],
    },
    { key: "category", label: "Category", type: "text", required: false, placeholder: "General", wide: false },
    { key: "occurred_on", label: "Date", type: "date", required: true, placeholder: "", wide: false },
  ],
  journal_entries: [
    { key: "title", label: "Title", type: "text", required: false, placeholder: "A short title (optional)", wide: true },
    { key: "body", label: "Entry", type: "textarea", required: true, placeholder: "Write what is on your mind…", wide: true },
    {
      key: "mood",
      label: "Mood",
      type: "select",
      required: false,
      placeholder: "Choose if you like",
      wide: false,
      options: [
        { label: "😊 Good", value: "Good" },
        { label: "😌 Calm", value: "Calm" },
        { label: "😐 Neutral", value: "Neutral" },
        { label: "😟 Stressed", value: "Stressed" },
        { label: "😔 Low", value: "Low" },
      ],
    },
  ],
};

const labels: Record<LifeHubKind, { singular: string; plural: string; empty: string }> = {
  tasks: { singular: "task", plural: "tasks", empty: "No tasks yet. Add your first one above." },
  habits: { singular: "habit", plural: "habits", empty: "No habits yet. Add one you want to build." },
  goals: { singular: "goal", plural: "goals", empty: "No goals yet. Add something you want to work toward." },
  transactions: { singular: "money entry", plural: "money entries", empty: "No money entries yet. Add income or an expense above." },
  journal_entries: { singular: "entry", plural: "entries", empty: "No journal entries yet. Start with whatever is on your mind." },
};

function emptyValues(kind: LifeHubKind): FormValues {
  switch (kind) {
    case "tasks":
      return { title: "", details: "", due_date: "", priority: "medium" };
    case "habits":
      return { name: "", frequency: "daily" };
    case "goals":
      return { title: "", current_value: "0", target_value: "1", unit: "", due_date: "" };
    case "transactions":
      return { description: "", amount: "", kind: "expense", category: "", occurred_on: todayIso() };
    case "journal_entries":
      return { title: "", body: "", mood: "" };
  }
}

function entryId(entry: LifeHubEntry): string {
  return entry.record.id;
}

function entryValues(entry: LifeHubEntry): FormValues {
  switch (entry.kind) {
    case "tasks":
      return {
        title: entry.record.title,
        details: entry.record.details ?? "",
        due_date: entry.record.due_date ?? "",
        priority: entry.record.priority,
      };
    case "habits":
      return { name: entry.record.name, frequency: entry.record.frequency };
    case "goals":
      return {
        title: entry.record.title,
        current_value: String(entry.record.current_value),
        target_value: String(entry.record.target_value),
        unit: entry.record.unit,
        due_date: entry.record.due_date ?? "",
      };
    case "transactions":
      return {
        description: entry.record.description,
        amount: String(entry.record.amount),
        kind: entry.record.kind,
        category: entry.record.category,
        occurred_on: entry.record.occurred_on,
      };
    case "journal_entries":
      return {
        title: entry.record.title,
        body: entry.record.body,
        mood: entry.record.mood ?? "",
      };
  }
}

export function RecordWorkspace({
  kind,
  eyebrow,
  title,
  description,
}: {
  kind: LifeHubKind;
  eyebrow: string;
  title: string;
  description: string;
}) {
  const queryClient = useQueryClient();
  const [values, setValues] = useState<FormValues>(() => emptyValues(kind));
  const [editingId, setEditingId] = useState<string | null>(null);
  const entryQuery = useQuery({
    queryKey: ["lifehub", kind],
    queryFn: () => listLifeHubEntries(kind),
  });
  const invalidateRecords = async () =>
    queryClient.invalidateQueries({ queryKey: ["lifehub"] });

  const saveMutation = useMutation({
    mutationFn: ({ id, nextValues }: { id: string | null; nextValues: FormValues }) =>
      saveLifeHubEntry(kind, id, nextValues),
    onSuccess: async () => {
      await invalidateRecords();
      setEditingId(null);
      setValues(emptyValues(kind));
      toast.success(`${labels[kind].singular} saved`);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Unable to save this record."),
  });
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteLifeHubEntry(kind, id),
    onSuccess: async () => {
      await invalidateRecords();
      toast.success(`${labels[kind].singular} deleted`);
    },
    onError: (error) => toast.error(error instanceof Error ? error.message : "Unable to delete this record."),
  });
  const statusMutation = useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      setLifeHubEntryComplete(kind, id, completed),
    onSuccess: invalidateRecords,
    onError: (error) => toast.error(error instanceof Error ? error.message : "Unable to update this record."),
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveMutation.mutate({ id: editingId, nextValues: values });
  }

  function cancelEdit() {
    setEditingId(null);
    setValues(emptyValues(kind));
  }

  return (
    <PageShell eyebrow={eyebrow} title={title} description={description}>
      <div className="grid items-start gap-4 xl:grid-cols-[minmax(19rem,0.82fr)_minmax(0,1.4fr)]">
        <GlassCard>
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold">{editingId ? `Edit ${labels[kind].singular}` : `Add ${labels[kind].singular}`}</h2>
              <p className="mt-1 text-sm text-muted-foreground">Saved to your account</p>
            </div>
            {editingId ? (
              <Button type="button" variant="ghost" size="icon" aria-label="Cancel editing" onClick={cancelEdit}>
                <X />
              </Button>
            ) : null}
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            {fieldsByKind[kind].map((field) => (
              <div key={field.key} className={`grid gap-2 ${field.wide ? "sm:col-span-2" : ""}`}>
                <Label htmlFor={`${kind}-${field.key}`}>{field.label}</Label>
                {field.type === "textarea" ? (
                  <Textarea
                    id={`${kind}-${field.key}`}
                    value={values[field.key] ?? ""}
                    placeholder={field.placeholder}
                    required={field.required}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, [field.key]: event.target.value }))
                    }
                    rows={kind === "journal_entries" ? 5 : 3}
                  />
                ) : field.type === "select" ? (
                  <Select
                    value={values[field.key] ?? ""}
                    onValueChange={(value) => setValues((current) => ({ ...current, [field.key]: value }))}
                  >
                    <SelectTrigger id={`${kind}-${field.key}`} aria-label={field.label}>
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {(field.options ?? []).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={`${kind}-${field.key}`}
                    type={field.type}
                    value={values[field.key] ?? ""}
                    placeholder={field.placeholder}
                    required={field.required}
                    min={field.min}
                    step={field.step}
                    onChange={(event) =>
                      setValues((current) => ({ ...current, [field.key]: event.target.value }))
                    }
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2 sm:col-span-2">
              <Button type="submit" disabled={saveMutation.isPending}>
                {editingId ? <Check /> : <Plus />}
                {saveMutation.isPending ? "Saving…" : editingId ? "Save changes" : `Add ${labels[kind].singular}`}
              </Button>
              {editingId ? (
                <Button type="button" variant="outline" onClick={cancelEdit}>
                  Cancel
                </Button>
              ) : null}
            </div>
          </form>
        </GlassCard>

        <GlassCard>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold">Your {labels[kind].plural}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {entryQuery.data?.length ?? 0} saved
              </p>
            </div>
          </div>
          {entryQuery.isPending ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Loading your {labels[kind].plural}…</p>
          ) : entryQuery.isError ? (
            <p role="alert" className="py-8 text-center text-sm text-destructive">
              {entryQuery.error instanceof Error ? entryQuery.error.message : "Unable to load your records."}
            </p>
          ) : entryQuery.data.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
              {labels[kind].empty}
            </p>
          ) : (
            <ul className="divide-y divide-border/70">
              {entryQuery.data.map((entry) => (
                <RecordRow
                  key={entryId(entry)}
                  entry={entry}
                  onEdit={() => {
                    setEditingId(entryId(entry));
                    setValues(entryValues(entry));
                  }}
                  onDelete={() => deleteMutation.mutate(entryId(entry))}
                  onToggle={(completed) =>
                    statusMutation.mutate({ id: entryId(entry), completed })
                  }
                />
              ))}
            </ul>
          )}
        </GlassCard>
      </div>
    </PageShell>
  );
}

function RecordRow({
  entry,
  onEdit,
  onDelete,
  onToggle,
}: {
  entry: LifeHubEntry;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: (completed: boolean) => void;
}) {
  let title = "";
  let details = "";
  let status: boolean | null = null;
  let statusLabel = "";
  let progress: number | null = null;

  switch (entry.kind) {
    case "tasks":
      title = entry.record.title;
      details = [
        entry.record.details,
        entry.record.due_date ? `Due ${formatDay(entry.record.due_date)}` : "",
        `${entry.record.priority} priority`,
      ]
        .filter(Boolean)
        .join(" · ");
      status = entry.record.is_completed;
      statusLabel = status ? "Reopen task" : "Mark task complete";
      break;
    case "habits":
      title = entry.record.name;
      details = `${entry.record.frequency} · ${entry.record.completed_on === todayIso() ? "done today" : "not checked off today"}`;
      status = entry.record.completed_on === todayIso();
      statusLabel = status ? "Undo today's habit check-off" : "Mark habit done today";
      break;
    case "goals":
      title = entry.record.title;
      details = `${entry.record.current_value} / ${entry.record.target_value}${entry.record.unit ? ` ${entry.record.unit}` : ""}${entry.record.due_date ? ` · Target ${formatDay(entry.record.due_date)}` : ""}`;
      status = entry.record.is_completed;
      statusLabel = status ? "Reopen goal" : "Mark goal complete";
      progress = Math.min(100, Math.max(0, (entry.record.current_value / entry.record.target_value) * 100));
      break;
    case "transactions":
      title = entry.record.description;
      details = `${entry.record.kind === "income" ? "Income" : "Expense"} · ${entry.record.category} · ${formatDay(entry.record.occurred_on)}`;
      break;
    case "journal_entries":
      title = entry.record.title;
      details = `${formatDay(entry.record.created_at.slice(0, 10))}${entry.record.mood ? ` · ${entry.record.mood}` : ""} · ${entry.record.body}`;
      break;
  }

  return (
    <li className="flex min-w-0 items-start gap-3 py-4 first:pt-1 last:pb-1">
      {status === null ? null : (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="mt-0.5 shrink-0"
          aria-label={statusLabel}
          title={statusLabel}
          onClick={() => onToggle(!status)}
        >
          {status ? <Check className="text-primary" /> : <Circle className="text-muted-foreground" />}
        </Button>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h3 className={`min-w-0 break-words text-sm font-semibold ${status ? "text-muted-foreground line-through" : ""}`}>
            {title}
          </h3>
          {entry.kind === "transactions" ? (
            <span className={`shrink-0 text-sm font-semibold ${entry.record.kind === "income" ? "text-emerald" : "text-foreground"}`}>
              {entry.record.kind === "income" ? "+" : "−"}{formatRand(entry.record.amount)}
            </span>
          ) : null}
        </div>
        {details ? (
          <p className="mt-1 line-clamp-3 break-words text-xs leading-relaxed text-muted-foreground">
            {details}
          </p>
        ) : null}
        {progress !== null ? <Progress value={progress} className="mt-3 h-1.5" /> : null}
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Button type="button" variant="ghost" size="icon" aria-label={`Edit ${title}`} onClick={onEdit}>
          <Pencil />
        </Button>
        <Button type="button" variant="ghost" size="icon" aria-label={`Delete ${title}`} onClick={onDelete}>
          <Trash2 className="text-destructive" />
        </Button>
      </div>
    </li>
  );
}