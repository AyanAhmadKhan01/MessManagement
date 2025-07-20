"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authService } from "@/utils/authService";
import {
  Users,
  CalendarDays,
  UtensilsCrossed,
  Package,
  Settings,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  ClipboardList,
  Home,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
  User,
  Calendar,
  BookOpen,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  const getNavigationItems = () => {
    if (user?.role === 2) {
      return [
        {
          name: "Dashboard",
          href: "/dashboard/admin",
          icon: LayoutDashboard,
          description: "Overview & Analytics",
        },
        {
          name: "Manage Users",
          href: "/dashboard/admin/manage-users",
          icon: Users,
          description: "User accounts & profiles",
        },
        {
          name: "Manage Plans",
          href: "/dashboard/admin/manage-plans",
          icon: ClipboardList,
          description: "Subscription plans",
        },
        {
          name: "Manage Menus",
          href: "/dashboard/admin/manage-menus",
          icon: UtensilsCrossed,
          description: "Daily meal menus",
        },
        {
          name: "Manage Inventory",
          href: "/dashboard/admin/manage-inventory",
          icon: Package,
          description: "Stock & supplies",
        },
        {
          name: "User Plans",
          href: "/dashboard/admin/manage-user-plans",
          icon: CalendarDays,
          description: "Plan assignments",
        },
      ];
    } else {
      return [
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
          description: "Your overview",
        },
        {
          name: "My Plan",
          href: "/dashboard/userplan",
          icon: ClipboardList,
          description: "Your subscription",
        },
        {
          name: "Today's Menu",
          href: "/dashboard/todaymenu",
          icon: UtensilsCrossed,
          description: "Today's meals",
        },
        {
          name: "Attendance",
          href: "/dashboard/userattendance",
          icon: Calendar,
          description: "Your attendance",
        },
        {
          name: "Profile",
          href: "/dashboard/profile",
          icon: User,
          description: "Your account",
        },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  const isActive = (href) => {
    if (href === "/dashboard/admin" || href === "/dashboard") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const closeSidebar = () => setSidebarOpen(false);
  const toggleSidebarCollapse = () => setSidebarCollapsed(!sidebarCollapsed);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-[rgba(255,255,255,0.08)] to-[rgba(255,255,255,0.02)] backdrop-blur-xl border-r border-[rgba(255,255,255,0.1)] z-50 transform transition-all duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 ${
          sidebarCollapsed ? "lg:w-20" : "lg:w-80"
        } w-80`}
      >
        <div className="p-6 border-b border-[rgba(255,255,255,0.1)]">
          <div className="flex items-center justify-between">
            <div className={`flex items-center transition-all duration-300 ${sidebarCollapsed ? "lg:justify-center lg:w-full" : "space-x-3"}`}>
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF0049] to-[#FF336F] rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Home className="h-6 w-6 text-white" />
              </div>
              {!sidebarCollapsed && (
                <div className="lg:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-[#FF0049] to-[#FF336F] bg-clip-text text-transparent">
                    MessMate
                  </h1>
                  <p className="text-xs text-gray-400">
                    {user?.role === 2 ? "Admin Panel" : "User Dashboard"}
                  </p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeSidebar}
              className="lg:hidden h-8 w-8 p-0 text-gray-400 hover:text-[#FF0049] hover:bg-[#FF0049]/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="hidden lg:block absolute -right-3 top-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebarCollapse}
            className="h-6 w-6 p-0 bg-[rgba(255,255,255,0.08)] hover:bg-[#FF0049]/20 border border-[rgba(255,255,255,0.1)] hover:border-[#FF0049]/30 text-gray-400 hover:text-[#FF0049] rounded-full shadow-lg backdrop-blur-sm"
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link key={item.name} href={item.href} onClick={closeSidebar}>
                  <div
                    className={`group flex items-center ${sidebarCollapsed ? "lg:justify-center lg:px-2" : "justify-between"} p-4 rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      active
                        ? "bg-gradient-to-r from-[#FF0049]/20 to-[#FF336F]/10 border border-[#FF0049]/30 shadow-lg"
                        : "hover:bg-[rgba(255,255,255,0.05)] hover:border-[#FF0049]/20 border border-transparent"
                    }`}
                    title={sidebarCollapsed ? item.name : ""}
                  >
                    {active && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#FF0049] to-[#FF336F] rounded-r-full" />
                    )}
                    
                    <div className={`flex items-center ${sidebarCollapsed ? "lg:justify-center lg:w-full" : "space-x-4 flex-1"}`}>
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
                          active
                            ? "bg-[#FF0049]/20 text-[#FF0049] shadow-md"
                            : "bg-[rgba(255,255,255,0.05)] text-gray-400 group-hover:bg-[#FF0049]/10 group-hover:text-[#FF0049]"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      {!sidebarCollapsed && (
                        <div className="flex-1 lg:block">
                          <p
                            className={`font-medium transition-colors duration-300 ${
                              active
                                ? "text-white"
                                : "text-gray-300 group-hover:text-white"
                            }`}
                          >
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {!sidebarCollapsed && (
                      <ChevronRight
                        className={`h-4 w-4 transition-all duration-300 lg:block ${
                          active
                            ? "text-[#FF0049] transform rotate-90"
                            : "text-gray-500 group-hover:text-[#FF0049] group-hover:transform group-hover:translate-x-1"
                        }`}
                      />
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[rgba(255,255,255,0.1)]">
          <div className="space-y-3">
              
            <div 
              className={`group flex items-center ${sidebarCollapsed ? "lg:justify-center lg:px-2" : ""} p-3 rounded-lg hover:bg-red-500/10 transition-all duration-300 cursor-pointer`}
              title={sidebarCollapsed ? "Logout" : ""}
              onClick={handleLogout}
            >
              <div className="p-2 bg-[rgba(255,255,255,0.05)] rounded-lg group-hover:bg-red-500/20 transition-all duration-300 flex-shrink-0">
                <LogOut className="h-4 w-4 text-gray-400 group-hover:text-red-400" />
              </div>
              {!sidebarCollapsed && (
                <span className="text-sm text-gray-400 group-hover:text-red-400 transition-colors duration-300 ml-3 lg:block">
                  Logout
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-80"}`}>
        <div className="lg:hidden sticky top-0 z-30 bg-[rgba(13,13,13,0.95)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.1)] p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="h-10 w-10 p-0 text-gray-400 hover:text-[#FF0049] hover:bg-[#FF0049]/10"
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-[#FF0049] to-[#FF336F] rounded-lg flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-[#FF0049] to-[#FF336F] bg-clip-text text-transparent">
                MessMate
              </h1>
            </div>
          </div>
        </div>

        <main className="min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}