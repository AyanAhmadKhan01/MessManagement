import { apiService } from './apiService';

export const attendanceService = {
  // Get user attendance data
  async getUserAttendance(userId, days = 30) {
    // For now, simulate API call with mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = generateMockAttendanceData(userId, days);
        resolve({ success: true, data });
      }, 500);
    });
  },

  // Mark meal attendance
  async markMealAttendance(userId, mealType, date = new Date()) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        resolve({
          success: true,
          data: {
            userId,
            mealType,
            date: date.toDateString(),
            timestamp,
            status: 'present'
          }
        });
      }, 1000);
    });
  },

  // Get today's attendance
  async getTodayAttendance(userId) {
    const today = new Date().toDateString();
    const attendanceData = await this.getUserAttendance(userId, 1);
    const todayData = attendanceData.data.find(d => d.date === today);
    
    return {
      success: true,
      data: todayData || {
        date: today,
        userId,
        breakfast: null,
        lunch: null,
        dinner: null
      }
    };
  },

  // Get attendance statistics
  async getAttendanceStats(userId, days = 30) {
    const attendanceData = await this.getUserAttendance(userId, days);
    const stats = calculateAttendanceStats(attendanceData.data);
    
    return {
      success: true,
      data: stats
    };
  },
};

// Helper function to generate mock attendance data
function generateMockAttendanceData(userId, days = 30) {
  const data = [];
  const today = new Date();
  const startDate = new Date();
  startDate.setDate(today.getDate() - days);

  const userSeed = userId ? parseInt(userId.replace(/\D/g, '')) || 1 : 1;

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const dateSeed = date.getTime() + userSeed;
    const breakfastRandom = ((dateSeed * 9301 + 49297) % 233280) / 233280;
    const lunchRandom = ((dateSeed * 9307 + 49313) % 233280) / 233280;
    const dinnerRandom = ((dateSeed * 9311 + 49331) % 233280) / 233280;

    const breakfastPresent = breakfastRandom > 0.3;
    const lunchPresent = lunchRandom > 0.3;
    const dinnerPresent = dinnerRandom > 0.3;

    data.push({
      date: date.toDateString(),
      userId: userId,
      breakfast: breakfastPresent ? {
        status: 'present',
        timestamp: `${6 + Math.floor(breakfastRandom * 3)}:${Math.floor(breakfastRandom * 60).toString().padStart(2, '0')} AM`
      } : { status: 'absent', timestamp: null },
      lunch: lunchPresent ? {
        status: 'present',
        timestamp: `${12 + Math.floor(lunchRandom * 2)}:${Math.floor(lunchRandom * 60).toString().padStart(2, '0')} PM`
      } : { status: 'absent', timestamp: null },
      dinner: dinnerPresent ? {
        status: 'present',
        timestamp: `${7 + Math.floor(dinnerRandom * 2)}:${Math.floor(dinnerRandom * 60).toString().padStart(2, '0')} PM`
      } : { status: 'absent', timestamp: null }
    });
  }

  return data;
}

// Helper function to calculate attendance statistics
function calculateAttendanceStats(data) {
  const totalDays = data.length;
  let totalMeals = 0;
  let presentMeals = 0;
  let breakfastTotal = 0, breakfastPresent = 0;
  let lunchTotal = 0, lunchPresent = 0;
  let dinnerTotal = 0, dinnerPresent = 0;

  data.forEach(d => {
    if (d.breakfast) {
      breakfastTotal++;
      totalMeals++;
      if (d.breakfast.status === 'present') {
        breakfastPresent++;
        presentMeals++;
      }
    }

    if (d.lunch) {
      lunchTotal++;
      totalMeals++;
      if (d.lunch.status === 'present') {
        lunchPresent++;
        presentMeals++;
      }
    }

    if (d.dinner) {
      dinnerTotal++;
      totalMeals++;
      if (d.dinner.status === 'present') {
        dinnerPresent++;
        presentMeals++;
      }
    }
  });

  const attendancePercentage = totalMeals > 0 ? (presentMeals / totalMeals) * 100 : 0;

  // Calculate current streak
  let currentStreak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    const dayData = data[i];
    if ((dayData.breakfast?.status === 'present') || 
        (dayData.lunch?.status === 'present') || 
        (dayData.dinner?.status === 'present')) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 0;
  data.forEach(d => {
    if ((d.breakfast?.status === 'present') || 
        (d.lunch?.status === 'present') || 
        (d.dinner?.status === 'present')) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  });

  // Calculate this week attendance
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekData = data.filter(d => new Date(d.date) >= oneWeekAgo);
  const thisWeekAttendance = thisWeekData.filter(d => 
    (d.breakfast?.status === 'present') || 
    (d.lunch?.status === 'present') || 
    (d.dinner?.status === 'present')
  ).length;

  // Calculate this month attendance
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
  const thisMonthData = data.filter(d => new Date(d.date) >= oneMonthAgo);
  const thisMonthAttendance = thisMonthData.filter(d => 
    (d.breakfast?.status === 'present') || 
    (d.lunch?.status === 'present') || 
    (d.dinner?.status === 'present')
  ).length;

  return {
    totalDays,
    totalMeals,
    presentMeals,
    attendancePercentage,
    currentStreak,
    longestStreak,
    thisWeekAttendance,
    thisMonthAttendance,
    mealStats: {
      breakfast: { 
        total: breakfastTotal, 
        present: breakfastPresent, 
        percentage: breakfastTotal > 0 ? (breakfastPresent / breakfastTotal) * 100 : 0 
      },
      lunch: { 
        total: lunchTotal, 
        present: lunchPresent, 
        percentage: lunchTotal > 0 ? (lunchPresent / lunchTotal) * 100 : 0 
      },
      dinner: { 
        total: dinnerTotal, 
        present: dinnerPresent, 
        percentage: dinnerTotal > 0 ? (dinnerPresent / dinnerTotal) * 100 : 0 
      }
    }
  };
}
