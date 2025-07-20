import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { attendanceService } from '@/services/attendanceService';
import { authService } from '@/utils/authService';
import { toast } from 'react-toastify';

// Query keys
export const attendanceKeys = {
  all: ['attendance'],
  user: (userId) => [...attendanceKeys.all, 'user', userId],
  userAttendance: (userId, days) => [...attendanceKeys.user(userId), 'data', days],
  userStats: (userId, days) => [...attendanceKeys.user(userId), 'stats', days],
  today: (userId) => [...attendanceKeys.user(userId), 'today'],
};

// Get user attendance data
export const useUserAttendance = (days = 30) => {
  const currentUser = authService.getCurrentUser();
  
  return useQuery({
    queryKey: attendanceKeys.userAttendance(currentUser?.id, days),
    queryFn: () => attendanceService.getUserAttendance(currentUser?.id, days),
    enabled: !!currentUser?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
    select: (data) => data.data || [],
  });
};

// Get attendance statistics
export const useAttendanceStats = (days = 30) => {
  const currentUser = authService.getCurrentUser();
  
  return useQuery({
    queryKey: attendanceKeys.userStats(currentUser?.id, days),
    queryFn: () => attendanceService.getAttendanceStats(currentUser?.id, days),
    enabled: !!currentUser?.id,
    staleTime: 2 * 60 * 1000, // 2 minutes
    select: (data) => data.data || {},
  });
};

// Get today's attendance
export const useTodayAttendance = () => {
  const currentUser = authService.getCurrentUser();
  
  return useQuery({
    queryKey: attendanceKeys.today(currentUser?.id),
    queryFn: () => attendanceService.getTodayAttendance(currentUser?.id),
    enabled: !!currentUser?.id,
    staleTime: 1 * 60 * 1000, // 1 minute (refresh more frequently for today)
    select: (data) => data.data || { breakfast: null, lunch: null, dinner: null },
  });
};

// Mark meal attendance mutation
export const useMarkMealAttendance = () => {
  const queryClient = useQueryClient();
  const currentUser = authService.getCurrentUser();

  return useMutation({
    mutationFn: ({ mealType, date }) => 
      attendanceService.markMealAttendance(currentUser?.id, mealType, date),
    onSuccess: (data, variables) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ 
        queryKey: attendanceKeys.user(currentUser?.id) 
      });
      
      // Show success toast
      toast.success(
        `${variables.mealType.charAt(0).toUpperCase() + variables.mealType.slice(1)} attendance marked successfully!`,
        {
          position: "top-right",
          autoClose: 3000,
          style: {
            background: 'rgba(15, 15, 15, 0.9)',
            border: '1px solid rgba(0, 255, 136, 0.3)',
            color: '#ffffff',
            backdropFilter: 'blur(10px)',
          },
        }
      );
    },
    onError: (error, variables) => {
      toast.error(
        `Failed to mark ${variables.mealType} attendance: ${error.message}`,
        {
          position: "top-right",
          autoClose: 3000,
          style: {
            background: 'rgba(15, 15, 15, 0.9)',
            border: '1px solid rgba(255, 0, 73, 0.3)',
            color: '#ffffff',
            backdropFilter: 'blur(10px)',
          },
        }
      );
    },
  });
};

// Utility hook to check if meal time is active
export const useMealTimeUtils = () => {
  const getCurrentMealTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    
    if (currentHour >= 6 && currentHour < 10) {
      return 'breakfast';
    } else if (currentHour >= 12 && currentHour < 15) {
      return 'lunch';
    } else if (currentHour >= 19 && currentHour < 22) {
      return 'dinner';
    }
    return null;
  };

  const isMealTimeActive = (mealType) => {
    const now = new Date();
    const currentHour = now.getHours();
    
    switch (mealType) {
      case 'breakfast':
        return currentHour >= 6 && currentHour < 10;
      case 'lunch':
        return currentHour >= 12 && currentHour < 15;
      case 'dinner':
        return currentHour >= 19 && currentHour < 22;
      default:
        return false;
    }
  };

  const getMealTimeRange = (mealType) => {
    switch (mealType) {
      case 'breakfast':
        return '6:00 AM - 10:00 AM';
      case 'lunch':
        return '12:00 PM - 3:00 PM';
      case 'dinner':
        return '7:00 PM - 10:00 PM';
      default:
        return '';
    }
  };

  const getMealInfo = (mealType) => {
    switch (mealType) {
      case 'breakfast':
        return {
          color: 'orange',
          bgColor: 'bg-orange-500/10',
          borderColor: 'border-orange-500/20',
          textColor: 'text-orange-400',
          hoverColor: 'hover:bg-orange-500/80',
          buttonColor: 'bg-orange-500'
        };
      case 'lunch':
        return {
          color: 'green',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          textColor: 'text-green-400',
          hoverColor: 'hover:bg-green-500/80',
          buttonColor: 'bg-green-500'
        };
      case 'dinner':
        return {
          color: 'blue',
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/20',
          textColor: 'text-blue-400',
          hoverColor: 'hover:bg-blue-500/80',
          buttonColor: 'bg-blue-500'
        };
      default:
        return {};
    }
  };

  return {
    getCurrentMealTime,
    isMealTimeActive,
    getMealTimeRange,
    getMealInfo,
  };
};
