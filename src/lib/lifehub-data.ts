import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";

export type LifeHubKind = "tasks" | "habits" | "goals" | "transactions" | "journal_entries";
export type TaskRow = Tables<"tasks">;
export type HabitRow = Tables<"habits">;
export type GoalRow = Tables<"goals">;
export type TransactionRow = Tables<"transactions">;
export type JournalEntryRow = Tables<"journal_entries">;
export type ProfileRow = Tables<"profiles">;

export type LifeHubEntry =
  | { kind: "tasks"; record: TaskRow }
  | { kind: "habits"; record: HabitRow }
  | { kind: "goals"; record: GoalRow }
  | { kind: "transactions"; record: TransactionRow }
  | { kind: "journal_entries"; record: JournalEntryRow };

export type FormValues = Record<string, string>;

export type DashboardData = {
  name: string;
  email: string;
  tasks: TaskRow[];
  habits: HabitRow[];
  goals: GoalRow[];
  transactions: TransactionRow[];
  journalEntries: JournalEntryRow[];
};

export async function getDashboardData(): Promise<DashboardData> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!userData.user) throw new Error("Please sign in again to view your dashboard.");

  const [profileResult, tasksResult, habitsResult, goalsResult, transactionsResult, journalResult] =
    await Promise.all([
      supabase.from("profiles").select("display_name").eq("id", userData.user.id).maybeSingle(),
      supabase.from("tasks").select("*").order("created_at", { ascending: false }),
      supabase.from("habits").select("*").order("created_at", { ascending: false }),
      supabase.from("goals").select("*").order("created_at", { ascending: false }),
      supabase.from("transactions").select("*").order("occurred_on", { ascending: false }),
      supabase.from("journal_entries").select("*").order("created_at", { ascending: false }),
    ]);

  const results = [
    profileResult,
    tasksResult,
    habitsResult,
    goalsResult,
    transactionsResult,
    journalResult,
  ];
  const failure = results.find((result) => result.error)?.error;
  if (failure) throw failure;

  const metadataName = userData.user.user_metadata["display_name"];
  const email = userData.user.email ?? "";
  const name =
    profileResult.data?.display_name?.trim() ||
    (typeof metadataName === "string" ? metadataName.trim() : "") ||
    email.split("@")[0] ||
    "there";

  return {
    name,
    email,
    tasks: tasksResult.data ?? [],
    habits: habitsResult.data ?? [],
    goals: goalsResult.data ?? [],
    transactions: transactionsResult.data ?? [],
    journalEntries: journalResult.data ?? [],
  };
}

export async function getAccountProfile(): Promise<{
  id: string;
  email: string;
  displayName: string;
}> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) throw userError;
  if (!userData.user) throw new Error("Please sign in again to view your profile.");

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("display_name")
    .eq("id", userData.user.id)
    .maybeSingle();
  if (error) throw error;

  const metadataName = userData.user.user_metadata["display_name"];
  const email = userData.user.email ?? "";
  return {
    id: userData.user.id,
    email,
    displayName:
      profile?.display_name?.trim() ||
      (typeof metadataName === "string" ? metadataName.trim() : "") ||
      email.split("@")[0] ||
      "",
  };
}

export async function listLifeHubEntries(kind: LifeHubKind): Promise<LifeHubEntry[]> {
  switch (kind) {
    case "tasks": {
      const { data, error } = await supabase.from("tasks").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((record) => ({ kind, record }));
    }
    case "habits": {
      const { data, error } = await supabase.from("habits").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((record) => ({ kind, record }));
    }
    case "goals": {
      const { data, error } = await supabase.from("goals").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((record) => ({ kind, record }));
    }
    case "transactions": {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("occurred_on", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((record) => ({ kind, record }));
    }
    case "journal_entries": {
      const { data, error } = await supabase
        .from("journal_entries")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []).map((record) => ({ kind, record }));
    }
  }
}

export async function saveLifeHubEntry(
  kind: LifeHubKind,
  id: string | null,
  values: FormValues,
): Promise<void> {
  switch (kind) {
    case "tasks": {
      const payload = {
        title: values["title"]?.trim() ?? "",
        details: values["details"]?.trim() || null,
        due_date: values["due_date"] || null,
        priority: values["priority"] || "medium",
      };
      const result = id
        ? await supabase.from("tasks").update(payload).eq("id", id)
        : await supabase.from("tasks").insert(payload);
      if (result.error) throw result.error;
      return;
    }
    case "habits": {
      const payload = {
        name: values["name"]?.trim() ?? "",
        frequency: values["frequency"] || "daily",
      };
      const result = id
        ? await supabase.from("habits").update(payload).eq("id", id)
        : await supabase.from("habits").insert(payload);
      if (result.error) throw result.error;
      return;
    }
    case "goals": {
      const payload = {
        title: values["title"]?.trim() ?? "",
        target_value: Number(values["target_value"] || 1),
        current_value: Number(values["current_value"] || 0),
        unit: values["unit"]?.trim() ?? "",
        due_date: values["due_date"] || null,
      };
      const result = id
        ? await supabase.from("goals").update(payload).eq("id", id)
        : await supabase.from("goals").insert(payload);
      if (result.error) throw result.error;
      return;
    }
    case "transactions": {
      const payload = {
        description: values["description"]?.trim() ?? "",
        amount: Number(values["amount"] || 0),
        kind: values["kind"] || "expense",
        category: values["category"]?.trim() || "General",
        occurred_on: values["occurred_on"] || todayIso(),
      };
      const result = id
        ? await supabase.from("transactions").update(payload).eq("id", id)
        : await supabase.from("transactions").insert(payload);
      if (result.error) throw result.error;
      return;
    }
    case "journal_entries": {
      const payload = {
        title: values["title"]?.trim() || "Journal entry",
        body: values["body"]?.trim() ?? "",
        mood: values["mood"]?.trim() || null,
      };
      const result = id
        ? await supabase.from("journal_entries").update(payload).eq("id", id)
        : await supabase.from("journal_entries").insert(payload);
      if (result.error) throw result.error;
    }
  }
}

export async function deleteLifeHubEntry(kind: LifeHubKind, id: string): Promise<void> {
  const result = await (kind === "tasks"
    ? supabase.from("tasks").delete().eq("id", id)
    : kind === "habits"
      ? supabase.from("habits").delete().eq("id", id)
      : kind === "goals"
        ? supabase.from("goals").delete().eq("id", id)
        : kind === "transactions"
          ? supabase.from("transactions").delete().eq("id", id)
          : supabase.from("journal_entries").delete().eq("id", id));
  if (result.error) throw result.error;
}

export async function setLifeHubEntryComplete(
  kind: LifeHubKind,
  id: string,
  completed: boolean,
): Promise<void> {
  if (kind === "tasks") {
    const { error } = await supabase.from("tasks").update({ is_completed: completed }).eq("id", id);
    if (error) throw error;
    return;
  }
  if (kind === "goals") {
    const { error } = await supabase.from("goals").update({ is_completed: completed }).eq("id", id);
    if (error) throw error;
    return;
  }
  if (kind === "habits") {
    const { error } = await supabase
      .from("habits")
      .update({ completed_on: completed ? todayIso() : null })
      .eq("id", id);
    if (error) throw error;
  }
}

export async function saveDisplayName(id: string, displayName: string): Promise<void> {
  const { error } = await supabase
    .from("profiles")
    .update({ display_name: displayName.trim() })
    .eq("id", id);
  if (error) throw error;
}

export function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

export function formatDay(value: string): string {
  return new Intl.DateTimeFormat("en-ZA", { dateStyle: "medium" }).format(
    new Date(`${value}T00:00:00`),
  );
}

export function formatRand(value: number): string {
  return new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 2,
  }).format(value);
}