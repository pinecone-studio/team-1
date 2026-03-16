"use client";

import {
  LayoutDashboard,
  Package,
  QrCode,
  FileText,
  ChevronRight,
  UserCheck,
  UserMinus,
  ArrowLeftRight,
  Users,
  Monitor,
  Building2,
} from "lucide-react";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Хянах самбар",
    icon: LayoutDashboard,
  },
  {
    title: "Хөрөнгө",
    icon: Package,
    subItems: [{ title: "" }, { title: "" }],
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
    title: "Ажлаас гарах",
    icon: UserMinus,
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
  const [openMenus, setOpenMenus] = useState<string[]>(["Хөрөнгө"]);

  const setMenuOpen = (title: string, open: boolean) => {
    setOpenMenus((prev) => {
      if (open) return prev.includes(title) ? prev : [...prev, title];
      return prev.filter((item) => item !== title);
    });
  };

  return (
    <Sidebar
      className={cn(
        "border-r border-sidebar-border bg-white",
        sidebarClassName,
      )}
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title} className="pt-4 pl-4">
                  {item.subItems ? (
                    <Collapsible
                      open={openMenus.includes(item.title)}
                      onOpenChange={(open) => setMenuOpen(item.title, open)}
                    >
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={activeTitle === item.title}
                          className="w-full justify-between"
                          onClick={() => onSelect(item.title)}
                        >
                          <span className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </span>
                          <ChevronRight className="h-4 w-4 opacity-60" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {/* {item.subItems.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton asChild>
                                <button className="w-full text-left">
                                  {subItem.title}
                                </button>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))} */}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton
                      isActive={activeTitle === item.title}
                      onClick={() => onSelect(item.title)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
