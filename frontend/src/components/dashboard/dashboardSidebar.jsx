"use client";

import { ChevronUp, User2, LayoutDashboard, CalendarCheck, Users, ChefHat, User, Settings, Package, Calendar, UserPlus } from "lucide-react"
import { authService } from "@/utils/authService";
import { useEffect, useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const userItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Attendance",
    url: "/dashboard/userattendance",
    icon: CalendarCheck,
  },
  {
    title: "Your Plan",
    url: "/dashboard/userplan",
    icon: ChefHat, 
  },
  {
    title: "User Menu",
    url: "/dashboard/todaymenu",
    icon: Users,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
]

const adminItems = [
  {
    title: "User Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Admin Dashboard",
    url: "/dashboard/admin",
    icon: Settings,
  },
  {
    title: "Manage Users",
    url: "/dashboard/all-users",
    icon: UserPlus,
  },
  {
    title: "Manage Inventory",
    url: "/dashboard/inventory",
    icon: Package,
  },
  {
    title: "Manage Plans",
    url: "/dashboard/admin/manage-plans",
    icon: Calendar,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
]

export default function DashboardSidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const items = user?.role === 2 ? adminItems : userItems;
  return (
<Sidebar className="h-screen">
  <SidebarContent className="flex flex-col h-full">
    <SidebarGroup>
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>

    <div className="mt-auto p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="w-full">
            <User2 className="mr-2" />
            <span>{user?.name || 'User'}</span>
            <ChevronUp className="ml-auto" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top">
          <DropdownMenuItem>Account</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </SidebarContent>
</Sidebar>
    
  )
}