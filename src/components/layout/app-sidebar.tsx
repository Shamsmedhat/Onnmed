"use client";

import { Calendar, ChevronUp, Home, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "@/i18n/routing";
import AuthDialog from "../features/auth/auth-dialog";
import { signOut, useSession } from "next-auth/react";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";

export function AppSidebar() {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  // Session
  const session = useSession();

  // Navigation
  const pathname = usePathname();

  // Sidebar items
  const items = [
    {
      title: t("home-link"),
      url: "/",
      icon: Home,
    },
    {
      title: t("appointment-link"),
      url: "/appointment",
      icon: Calendar,
    },
  ];

  return (
    <Sidebar side={locale === "en" ? "left" : "right"} collapsible="icon">
      {/* Sidebar content */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="h-auto flex flex-col">
            <h2 className="text-xl capitalize">{t("appointment-management-system")}</h2>
            <Separator className="my-2" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:text-main-gold-600 text-main-black">
                    <Link
                      href={item.url}
                      className={cn(
                        pathname === item.url
                          ? "text-main-gold-600"
                          : "hover:text-main-gold-600 text-main-black",
                        "capitalize "
                      )}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar footer */}
      <SidebarFooter>
        <SidebarMenu>
          {/* Return component based on session */}
          {session.status === "loading" && <Skeleton className="w-full h-12" />}
          {session.status === "unauthenticated" && <AuthDialog />}
          {session.status === "authenticated" && (
            <SidebarMenu>
              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="flex justify-center items-center h-fit">
                      <User2 /> {t("hello")}, {session.data.name} | ({session.data.userType})
                      <ChevronUp className="ml-auto" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                    <DropdownMenuItem>
                      <Button
                        variant="destructive"
                        className="w-full h-fit capitalize"
                        onClick={() => {
                          signOut({ redirect: false });
                          toast.success(t("logged-out-successfully"));
                        }}
                      >
                        {t("sign-out")}
                      </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            </SidebarMenu>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
