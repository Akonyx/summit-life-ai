import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Bot,
  BookOpen,
  CalendarDays,
  CircleUser,
  Dumbbell,
  FileText,
  Heart,
  HeartPulse,
  Home,
  Images,
  ListChecks,
  NotebookPen,
  Plane,
  Repeat,
  Settings,
  Target,
  Wallet,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const groups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/", icon: Home },
      { title: "AI Assistant", url: "/assistant", icon: Bot },
      { title: "Calendar", url: "/calendar", icon: CalendarDays },
    ],
  },
  {
    label: "Productivity",
    items: [
      { title: "Goals", url: "/goals", icon: Target },
      { title: "Tasks", url: "/tasks", icon: ListChecks },
      { title: "Habits", url: "/habits", icon: Repeat },
      { title: "Study Hub", url: "/study", icon: BookOpen },
      { title: "Documents", url: "/documents", icon: FileText },
    ],
  },
  {
    label: "Life",
    items: [
      { title: "Finance", url: "/finance", icon: Wallet },
      { title: "Health", url: "/health", icon: HeartPulse },
      { title: "Fitness", url: "/fitness", icon: Dumbbell },
      { title: "Mental Wellness", url: "/wellness", icon: Heart },
      { title: "Travel", url: "/travel", icon: Plane },
      { title: "Journal", url: "/journal", icon: NotebookPen },
      { title: "Vision Board", url: "/vision-board", icon: Images },
    ],
  },
  {
    label: "Account",
    items: [
      { title: "Notifications", url: "/notifications", icon: Bell },
      { title: "Settings", url: "/settings", icon: Settings },
      { title: "Profile", url: "/profile", icon: CircleUser },
    ],
  },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border/60">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-1 py-2">
          <div className="bg-gradient-brand grid h-9 w-9 shrink-0 place-items-center rounded-xl text-sm font-black text-white glow">
            LH
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate font-display text-sm font-bold">LifeHub AI</p>
            <p className="truncate text-[11px] text-muted-foreground">Life, beautifully organized</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      tooltip={item.title}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="glass rounded-xl p-3 group-data-[collapsible=icon]:hidden">
          <p className="text-xs font-semibold">Level 12 · Trailblazer</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="bg-gradient-brand h-full w-[68%] rounded-full" />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">3,420 / 5,000 XP</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}