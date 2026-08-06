import type { ReactNode } from "react";

export function PageShell({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:flex-wrap sm:justify-between">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">{eyebrow}</p>
          ) : null}
          <h1 className="truncate text-2xl font-bold sm:text-3xl">{title}</h1>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
      </header>
      <div className="mt-6 animate-in fade-in slide-in-from-bottom-2 duration-500">{children}</div>
    </div>
  );
}

export function GlassCard({
  className = "",
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`glass rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}