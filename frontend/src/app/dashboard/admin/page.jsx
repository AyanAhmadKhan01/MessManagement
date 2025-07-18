"use client";

import { Loader } from "lucide-react";
import {
  Users,
  CalendarDays,
  UtensilsCrossed,
  Package,
  ClipboardList,
} from "lucide-react";

// Hooks
import { useDashboardStats } from "@/hooks/useDashboardStats";

// Components
import StatsCard from "@/components/dashboard/StatsCard";
import { SystemHealth, QuickActions } from "@/components/dashboard/AdminWidgets";
import { MenuAnalyticsChart, RevenueOverview } from "@/components/dashboard/Charts";

// HOC
import withAuth from "@/components/withAuth";

function AdminDashboard() {
  const { data, isLoading, error } = useDashboardStats();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-400 mb-4">Error loading dashboard</p>
          <p className="text-gray-400">{error.message}</p>
        </div>
      </div>
    );
  }

  const { stats } = data;

  // Management cards configuration
  const managementCards = [
    {
      title: "Users",
      stat: stats.totalUsers,
      statLabel: "Total Users",
      icon: Users,
      href: "/dashboard/admin/manage-users",
    },
    {
      title: "Plans",
      stat: stats.totalPlans,
      statLabel: "Available Plans",
      icon: ClipboardList,
      href: "/dashboard/admin/manage-plans",
    },
    {
      title: "Menus",
      stat: stats.totalMenus,
      statLabel: "Days Configured",
      icon: UtensilsCrossed,
      href: "/dashboard/admin/manage-menus",
    },
    {
      title: "Subscriptions",
      stat: stats.totalUserPlans,
      statLabel: "Active Subscriptions",
      icon: CalendarDays,
      href: "/dashboard/admin/manage-user-plans",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6 space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-[#FF0049] mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-400">
          Mess management system overview and controls
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {managementCards.map((card, index) => (
          <StatsCard key={index} {...card} loading={isLoading} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MenuAnalyticsChart data={data} loading={isLoading} />
        <RevenueOverview data={data} loading={isLoading} />
      </div>

      {/* System Health & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2">
          <SystemHealth stats={stats} loading={isLoading} />
        </div>
        <div className="lg:col-span-3">
          <QuickActions loading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default withAuth(AdminDashboard);
