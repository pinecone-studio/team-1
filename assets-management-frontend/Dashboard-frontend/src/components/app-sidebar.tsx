"use client";

import {
  LayoutDashboard,
  Package,
  QrCode,
  FileText,
  Users,
  Monitor,
  Building2,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Хянах самбар",
    icon: LayoutDashboard,
  },
  // {
  //   title: "Хөрөнгө",
  //   icon: Package,
  // },
  {
    title: "Эд Хөрөнгө",
    icon: Package,
  },
  {
    title: "Хөрөнгө хуваарилах",
    icon: UserCheck,
  },
  {
    title: "Хөрөнгө шилжүүлэх",
    icon: ArrowLeftRight,
  },
  {
    title: "QR тооллого",
    icon: QrCode,
  },

  {
    title: "Тайлан",
    icon: FileText,
  },
  {
    title: "Demo Ажилтан",
    icon: Users,
  },
  {
    title: "Demo IT",
    icon: Monitor,
  },
  {
    title: "Demo HR",
    icon: Building2,
  },
  {
    title: "Ажлаас гарах явц",
    icon: LogOut,
  },
];

export function AppSidebar({
  activeTitle,
  onSelect,
  sidebarClassName,
}: {
  activeTitle: string;
  onSelect: (title: string) => void;
  sidebarClassName?: string;
}) {
  const { state } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className={cn(
        "border-r border-sidebar-border bg-white",
        sidebarClassName,
      )}
    >
      <SidebarContent className="bg-white overflow-visible group-data-[collapsible=icon]:overflow-visible">
        <div className="relative h-9 w-full px-2">
          <SidebarTrigger className="absolute right-4 top-1/2 z-10 h-9 w-9 -translate-y-1/2 bg-transparent text-foreground hover:bg-muted/80 active:-translate-y-1/2" />
        </div>
        <SidebarGroup className="bg-white p-0">
          <SidebarGroupContent>
            <SidebarMenu className="overflow-visible">
              {menuItems.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="pt-2 overflow-visible flex justify-center"
                >
                  <SidebarMenuButton
                    isActive={activeTitle === item.title}
                    className={cn(
                      "group/tooltip relative overflow-visible!",
                      state === "expanded"
                        ? "justify-start px-3"
                        : "mx-auto h-10 w-10 justify-center px-0",
                    )}
                    onClick={() => onSelect(item.title)}
                  >
                    <item.icon className="h-4 w-4" />
                    {state === "expanded" ? (
                      <span>{item.title}</span>
                    ) : (
                      <span className="sr-only">{item.title}</span>
                    )}
                    {state === "collapsed" ? (
                      <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-4 -translate-y-1/2 whitespace-nowrap rounded-[16px] bg-gray-500 px-5 py-2.5 text-sm font-medium text-white opacity-0 shadow-[0_12px_22px_rgba(31,41,55,0.25)] transition duration-150 ease-out invisible group-hover/tooltip:visible group-hover/tooltip:opacity-100">
                        <span className="absolute left-1 top-1/2 h-4 w-4 -translate-x-full -translate-y-1/2 rotate-45 bg-gray-500" />
                        {item.title}
                      </span>
                    ) : null}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
