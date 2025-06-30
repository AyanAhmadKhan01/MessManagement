import {  ChevronUp, User2, LayoutDashboard, CalendarCheck, Users, ChefHat,
  User, } from "lucide-react"

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


const items = [
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

export default function DashboardSidebar() {
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
            <span>username</span>
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