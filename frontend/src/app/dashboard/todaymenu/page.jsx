"use client";

import { Loader } from "lucide-react";
import withAuth from "@/components/withAuth";
import { useTodayMenu } from "@/hooks/useMenus";
import { TodayMenuHeader } from "@/components/todaymenu/TodayMenuHeader";
import { SpecialMenuBanner } from "@/components/todaymenu/SpecialMenuBanner";
import { MealGrid } from "@/components/todaymenu/MealGrid";
import { NoMenuAvailable } from "@/components/todaymenu/NoMenuAvailable";
import { MessGuidelines } from "@/components/todaymenu/MessGuidelines";

function TodayMenuPage() {
  // TanStack Query hook
  const { data: todayMenu, isLoading, error } = useTodayMenu();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading today's menu...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-400 mb-4">Error loading today's menu</p>
          <p className="text-gray-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 py-10">
      {/* Header */}
      <TodayMenuHeader />

      {/* Special Menu Banner */}
      <SpecialMenuBanner specialMenu={todayMenu?.special_menu} />

      {/* Menu Content */}
      {todayMenu ? (
        <MealGrid todayMenu={todayMenu} />
      ) : (
        <NoMenuAvailable />
      )}

      {/* Guidelines */}
      <MessGuidelines />
    </div>
  );
}

export default withAuth(TodayMenuPage);
