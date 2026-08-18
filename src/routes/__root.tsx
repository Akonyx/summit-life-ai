import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { Bell, Search } from "lucide-react";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "LifeHub AI — Personal Growth & Life Management" },
      {
        name: "description",
        content:
          "LifeHub AI brings goals, habits, tasks, money, health, study and journaling into one intelligent workspace.",
      },
      { name: "author", content: "LifeHub AI" },
      { property: "og:site_name", content: "LifeHub AI" },
      { property: "og:title", content: "LifeHub AI — Personal Growth & Life Management" },
      {
        property: "og:description",
        content:
          "One elegant workspace for goals, habits, tasks, finance, health, study and reflection — with an AI assistant built in.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/60 bg-background/70 px-3 backdrop-blur-xl sm:px-6">
              <SidebarTrigger />
              <label className="glass flex min-w-0 flex-1 items-center gap-2 rounded-full px-4 py-2 sm:max-w-md">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search tasks, goals, notes…"
                  aria-label="Global search"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
              </label>
              <div className="ml-auto flex shrink-0 items-center gap-2">
                <Link
                  to="/notifications"
                  aria-label="Notifications"
                  className="relative grid h-9 w-9 place-items-center rounded-full border border-border/60 transition-colors hover:bg-accent"
                >
                  <Bell className="h-4 w-4" />
                  <span className="bg-gradient-warm absolute top-1.5 right-1.5 h-2 w-2 rounded-full" />
                </Link>
                <ThemeToggle />
                <div className="bg-gradient-brand hidden h-9 w-9 place-items-center rounded-full text-xs font-bold text-white sm:grid">
                  AN
                </div>
              </div>
            </header>
            <main className="flex-1">
              {/* Required: nested routes render here. */}
              <Outlet />
            </main>
            <SiteFooter />
          </div>
        </div>
      </SidebarProvider>
      <Toaster />
    </QueryClientProvider>
  );
}

function SiteFooter() {
  const columns = [
    { title: "Product", links: ["About", "Features", "Pricing", "Changelog"] },
    { title: "Support", links: ["Contact", "Help Center", "Community", "Status"] },
    { title: "Legal", links: ["Privacy Policy", "Terms", "Security", "Cookies"] },
  ];
  return (
    <footer className="mt-10 border-t border-border/60 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="min-w-0">
          <p className="font-display text-lg font-bold text-gradient">LifeHub AI</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Your intelligent life management assistant — goals, habits, money, health and study in
            one elegant workspace.
          </p>
          <form
            className="mt-4 flex max-w-sm items-center gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email"
              aria-label="Newsletter email"
              className="glass min-w-0 flex-1 rounded-full px-4 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="bg-gradient-brand shrink-0 rounded-full px-4 py-2 text-sm font-semibold text-white"
            >
              Subscribe
            </button>
          </form>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold">{col.title}</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {col.links.map((l) => (
                <li key={l}>
                  <span className="cursor-pointer transition-colors hover:text-foreground">{l}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-8 w-full max-w-7xl text-xs text-muted-foreground">
        © {new Date().getFullYear()} LifeHub AI. Crafted with care.
      </p>
    </footer>
  );
}
