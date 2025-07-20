"use client";

import { Loader } from "lucide-react";
import withAuth from "@/components/withAuth";
import { toast } from 'react-toastify';
import { 
  useUserAttendance, 
  useAttendanceStats, 
  useTodayAttendance, 
  useMarkMealAttendance,
  useMealTimeUtils 
} from "@/hooks/useAttendance";
import { authService } from "@/utils/authService";
import { AttendanceHeader } from "@/components/attendance/AttendanceHeader";
import { TodayAttendanceCard } from "@/components/attendance/TodayAttendanceCard";
import { AttendanceStats } from "@/components/attendance/AttendanceStats";
import { MealStats } from "@/components/attendance/MealStats";
import { AttendanceCalendar } from "@/components/attendance/AttendanceCalendar";
import { RecentAttendance } from "@/components/attendance/RecentAttendance";
import { useState } from "react";

function UserAttendancePage() {
  // TanStack Query hooks
  const { data: attendanceData = [], isLoading: isLoadingAttendance, error: attendanceError } = useUserAttendance(30);
  const { data: attendanceStats = {}, isLoading: isLoadingStats } = useAttendanceStats(30);
  const { data: todayAttendance = {}, isLoading: isLoadingToday } = useTodayAttendance();
  const markMealMutation = useMarkMealAttendance();
  
  // Utility hooks
  const { isMealTimeActive } = useMealTimeUtils();
  
  // Local state
  const [markingAttendance, setMarkingAttendance] = useState({
    breakfast: false,
    lunch: false,
    dinner: false
  });

  // Get current user
  const currentUser = authService.getCurrentUser();

  // Handle marking meal attendance
  const handleMarkMealAttendance = async (mealType) => {
    if (!isMealTimeActive(mealType)) {
      toast.error(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)} time is not active!`, {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
      return;
    }

    if (todayAttendance[mealType]?.status === 'present') {
      toast.info(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)} attendance already marked!`, {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
      return;
    }

    setMarkingAttendance(prev => ({ ...prev, [mealType]: true }));
    
    try {
      await markMealMutation.mutateAsync({ 
        mealType, 
        date: new Date() 
      });
    } catch (error) {
      // Error is handled by the mutation's onError
    } finally {
      setMarkingAttendance(prev => ({ ...prev, [mealType]: false }));
    }
  };

  // Loading state
  const isLoading = isLoadingAttendance || isLoadingStats || isLoadingToday;
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (attendanceError) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-400 mb-4">Error loading attendance data</p>
          <p className="text-gray-400">{attendanceError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <AttendanceHeader userName={currentUser?.name} />

        {/* Today's Attendance */}
        <TodayAttendanceCard
          todayAttendance={todayAttendance}
          onMarkAttendance={handleMarkMealAttendance}
          isMarkingAttendance={markingAttendance}
        />

        {/* Overall Statistics */}
        <AttendanceStats stats={attendanceStats} />

        {/* Meal-wise Statistics */}
        <MealStats mealStats={attendanceStats.mealStats} />

        {/* Calendar and Recent Attendance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AttendanceCalendar attendanceData={attendanceData} />
          <RecentAttendance attendanceData={attendanceData} />
        </div>
      </div>
    </div>
  );
}

export default withAuth(UserAttendancePage);
