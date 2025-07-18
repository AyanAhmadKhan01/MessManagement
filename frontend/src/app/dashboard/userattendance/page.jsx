"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  CalendarCheck, 
  Clock, 
  TrendingUp, 
  Award, 
  BarChart3,
  CheckCircle,
  XCircle,
  Calendar as CalendarIcon,
  User,
  MapPin,
  Loader,
  QrCode,
  Coffee,
  Utensils,
  Moon
} from "lucide-react";
import withAuth from "@/components/withAuth";
import { useEffect, useState } from "react";
import { authService } from "@/utils/authService";
import { toast } from 'react-toastify';

function UserAttendancePage() {
  const [user, setUser] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState({
    totalDays: 0,
    totalMeals: 0,
    presentMeals: 0,
    attendancePercentage: 0,
    currentStreak: 0,
    longestStreak: 0,
    thisWeekAttendance: 0,
    thisMonthAttendance: 0,
    mealStats: {
      breakfast: { total: 0, present: 0, percentage: 0 },
      lunch: { total: 0, present: 0, percentage: 0 },
      dinner: { total: 0, present: 0, percentage: 0 }
    }
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [todayAttendance, setTodayAttendance] = useState({
    breakfast: null,
    lunch: null,
    dinner: null
  });
  const [loading, setLoading] = useState(true);
  const [markingAttendance, setMarkingAttendance] = useState({
    breakfast: false,
    lunch: false,
    dinner: false
  });

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
          icon: Coffee,
          color: 'orange',
          bgColor: 'bg-orange-500/10',
          borderColor: 'border-orange-500/20',
          textColor: 'text-orange-400',
          hoverColor: 'hover:bg-orange-500/80',
          buttonColor: 'bg-orange-500'
        };
      case 'lunch':
        return {
          icon: Utensils,
          color: 'green',
          bgColor: 'bg-green-500/10',
          borderColor: 'border-green-500/20',
          textColor: 'text-green-400',
          hoverColor: 'hover:bg-green-500/80',
          buttonColor: 'bg-green-500'
        };
      case 'dinner':
        return {
          icon: Moon,
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

  const getTodayDateString = () => {
    return new Date().toDateString();
  };

  const generateMockAttendanceData = (userId) => {
    const data = [];
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - 30);

    const userSeed = userId ? parseInt(userId.replace(/\D/g, '')) || 1 : 1;

    for (let i = 0; i < 30; i++) {
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
  };

  const calculateStats = (data) => {
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

    const presentDays = data.filter(d => 
      (d.breakfast?.status === 'present') || 
      (d.lunch?.status === 'present') || 
      (d.dinner?.status === 'present')
    ).length;

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

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

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const thisWeekData = data.filter(d => new Date(d.date) >= oneWeekAgo);
    const thisWeekAttendance = thisWeekData.filter(d => 
      (d.breakfast?.status === 'present') || 
      (d.lunch?.status === 'present') || 
      (d.dinner?.status === 'present')
    ).length;

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
  };

  const markMealAttendance = async (mealType) => {
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

      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const today = getTodayDateString();
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const updatedTodayAttendance = {
        ...todayAttendance,
        [mealType]: {
          status: 'present',
          timestamp: timestamp
        }
      };
      setTodayAttendance(updatedTodayAttendance);

      const updatedData = attendanceData.map(d => 
        d.date === today ? { ...d, [mealType]: { status: 'present', timestamp } } : d
      );

      if (!attendanceData.find(d => d.date === today)) {
        updatedData.push({
          date: today,
          userId: user?.id,
          breakfast: mealType === 'breakfast' ? { status: 'present', timestamp } : null,
          lunch: mealType === 'lunch' ? { status: 'present', timestamp } : null,
          dinner: mealType === 'dinner' ? { status: 'present', timestamp } : null
        });
      }

      setAttendanceData(updatedData);
      setAttendanceStats(calculateStats(updatedData));

      toast.success(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)} attendance marked successfully!`, {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    } catch (error) {
      toast.error(`Failed to mark ${mealType} attendance`, {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    } finally {
      setMarkingAttendance(prev => ({ ...prev, [mealType]: false }));
    }
  };

  const getAttendanceForDate = (date) => {
    return attendanceData.find(d => d.date === date.toDateString());
  };

  const hasAttendance = (date) => {
    const attendance = getAttendanceForDate(date);
    return attendance && (
      attendance.breakfast?.status === 'present' ||
      attendance.lunch?.status === 'present' ||
      attendance.dinner?.status === 'present'
    );
  };

  const getMealDots = (date) => {
    const attendance = getAttendanceForDate(date);
    if (!attendance) return null;

    const dots = [];
    if (attendance.breakfast?.status === 'present') {
      dots.push({ color: '#f97316', meal: 'breakfast' });
    }
    if (attendance.lunch?.status === 'present') {
      dots.push({ color: '#22c55e', meal: 'lunch' });
    }
    if (attendance.dinner?.status === 'present') {
      dots.push({ color: '#3b82f6', meal: 'dinner' });
    }
    return dots;
  };

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    const mockData = generateMockAttendanceData(currentUser?.id);
    setAttendanceData(mockData);
    setAttendanceStats(calculateStats(mockData));

    const today = getTodayDateString();
    const todayData = mockData.find(d => d.date === today);
    if (todayData) {
      setTodayAttendance({
        breakfast: todayData.breakfast,
        lunch: todayData.lunch,
        dinner: todayData.dinner
      });
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8"><div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-[rgba(255,255,255,.6)]">
            My Meal Attendance
          </h1>
          <p className="text-gray-400">
            {user?.name ? `Track your daily mess attendance, ${user.name}` : 'Track your daily mess attendance'}
          </p>
        </div><div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0049]/5 to-[#FF336F]/5 rounded-xl blur-xl" />
          <Card className="relative bg-gradient-to-r from-[#1a1a1a]/90 to-[#2a2a2a]/90 backdrop-blur-xl border-[#ffffff0f]">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#FF0049] text-2xl">
                <CalendarCheck className="h-8 w-8" />
                Today's Meal Attendance - {new Date().toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                  const mealInfo = getMealInfo(mealType);
                  const MealIcon = mealInfo.icon;
                  const isActive = isMealTimeActive(mealType);
                  const isMarked = todayAttendance[mealType]?.status === 'present';
                  const isLoading = markingAttendance[mealType];

                  return (
                    <div key={mealType} className={`p-6 rounded-lg border ${mealInfo.bgColor} ${mealInfo.borderColor}`}>
                      <div className="text-center">
                        <MealIcon className={`h-12 w-12 mx-auto mb-3 ${mealInfo.textColor}`} />
                        <h3 className={`text-xl font-semibold ${mealInfo.textColor} mb-2 capitalize`}>
                          {mealType}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                          {getMealTimeRange(mealType)}
                        </p>

                        {isMarked ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-center gap-2">
                              <CheckCircle className={`h-6 w-6 ${mealInfo.textColor}`} />
                              <span className={`font-semibold ${mealInfo.textColor}`}>Marked!</span>
                            </div>
                            <p className="text-xs text-gray-400">
                              at {todayAttendance[mealType].timestamp}
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Button
                              onClick={() => markMealAttendance(mealType)}
                              disabled={!isActive || isLoading}
                              className={`w-full ${mealInfo.buttonColor} ${mealInfo.hoverColor} text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              {isLoading ? (
                                <>
                                  <Loader className="animate-spin h-4 w-4 mr-2" />
                                  Marking...
                                </>
                              ) : isActive ? (
                                <>
                                  <QrCode className="h-4 w-4 mr-2" />
                                  Mark Attendance
                                </>
                              ) : (
                                <>
                                  <Clock className="h-4 w-4 mr-2" />
                                  Not Available
                                </>
                              )}
                            </Button>
                            {!isActive && (
                              <p className="text-xs text-gray-500">
                                Available during {getMealTimeRange(mealType)}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-10 w-10 text-blue-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Overall Rate</h3>
              <p className="text-3xl font-bold text-white mb-1">
                {attendanceStats.attendancePercentage.toFixed(0)}%
              </p>
              <p className="text-sm text-gray-400">
                {attendanceStats.presentMeals}/{attendanceStats.totalMeals} meals
              </p>
            </CardContent>
          </Card>

          <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-10 w-10 text-green-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-green-400 mb-2">Current Streak</h3>
              <p className="text-3xl font-bold text-white mb-1">
                {attendanceStats.currentStreak}
              </p>
              <p className="text-sm text-gray-400">consecutive days</p>
            </CardContent>
          </Card>

          <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
            <CardContent className="p-6 text-center">
              <Award className="h-10 w-10 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-purple-400 mb-2">Best Streak</h3>
              <p className="text-3xl font-bold text-white mb-1">
                {attendanceStats.longestStreak}
              </p>
              <p className="text-sm text-gray-400">days record</p>
            </CardContent>
          </Card>

          <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
            <CardContent className="p-6 text-center">
              <CalendarIcon className="h-10 w-10 text-[#FF0049] mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-[#FF0049] mb-2">This Week</h3>
              <p className="text-3xl font-bold text-white mb-1">
                {attendanceStats.thisWeekAttendance}
              </p>
              <p className="text-sm text-gray-400">days present</p>
            </CardContent>
          </Card>
        </div><div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['breakfast', 'lunch', 'dinner'].map((mealType) => {
            const mealInfo = getMealInfo(mealType);
            const MealIcon = mealInfo.icon;
            const stats = attendanceStats.mealStats[mealType];

            return (
              <Card key={mealType} className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <MealIcon className={`h-10 w-10 mx-auto mb-3 ${mealInfo.textColor}`} />
                  <h3 className={`text-lg font-semibold ${mealInfo.textColor} mb-2 capitalize`}>
                    {mealType} Stats
                  </h3>
                  <p className="text-3xl font-bold text-white mb-1">
                    {stats.percentage.toFixed(0)}%
                  </p>
                  <p className="text-sm text-gray-400">
                    {stats.present}/{stats.total} attended
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div><div className="grid grid-cols-1 lg:grid-cols-2 gap-8"><Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#FF0049]">
                <CalendarIcon className="h-6 w-6" />
                Attendance Calendar
              </CardTitle>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>Breakfast</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Lunch</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Dinner</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="relative">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border border-[#ffffff0f] scale-110 transform"
                    modifiers={{
                      hasBreakfast: (date) => {
                        const attendance = getAttendanceForDate(date);
                        return attendance?.breakfast?.status === 'present';
                      },
                      hasLunch: (date) => {
                        const attendance = getAttendanceForDate(date);
                        return attendance?.lunch?.status === 'present';
                      },
                      hasDinner: (date) => {
                        const attendance = getAttendanceForDate(date);
                        return attendance?.dinner?.status === 'present';
                      }
                    }}
                    modifiersStyles={{
                      hasBreakfast: {
                        position: 'relative'
                      },
                      hasLunch: {
                        position: 'relative'
                      },
                      hasDinner: {
                        position: 'relative'
                      }
                    }}
                  /><div className="absolute inset-0 pointer-events-none">
                    {attendanceData.map((attendance, index) => {
                      const date = new Date(attendance.date);
                      const dots = getMealDots(date);
                      if (!dots || dots.length === 0) return null;

                      return null;
                    })}
                  </div>
                </div>
              </div>
              {selectedDate && (
                <div className="mt-4 p-4 bg-[rgba(255,255,255,.02)] rounded-lg border border-[#ffffff0f]">
                  <h4 className="font-semibold text-white mb-3">
                    {selectedDate.toLocaleDateString()}
                  </h4>
                  {(() => {
                    const dayAttendance = getAttendanceForDate(selectedDate);
                    return dayAttendance ? (
                      <div className="space-y-2">
                        {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                          const mealData = dayAttendance[mealType];
                          const mealInfo = getMealInfo(mealType);
                          const MealIcon = mealInfo.icon;
                          
                          return (
                            <div key={mealType} className="flex items-center gap-3">
                              <MealIcon className={`h-4 w-4 ${mealInfo.textColor}`} />
                              <span className="capitalize text-gray-300 min-w-[80px]">{mealType}:</span>
                              {mealData?.status === 'present' ? (
                                <div className="flex items-center gap-2">
                                  <CheckCircle className={`h-4 w-4 ${mealInfo.textColor}`} />
                                  <span className={mealInfo.textColor}>Present</span>
                                  {mealData.timestamp && (
                                    <span className="text-gray-400 text-sm">
                                      at {mealData.timestamp}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <XCircle className="h-4 w-4 text-red-400" />
                                  <span className="text-red-400">Absent</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-gray-400" />
                        <span className="text-gray-400">No data available</span>
                      </div>
                    );
                  })()}
                </div>
              )}
            </CardContent>
          </Card><Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-[#FF0049]">
                <Clock className="h-6 w-6" />
                Recent Attendance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {attendanceData.slice(-10).reverse().map((attendance, index) => (
                  <div
                    key={index}
                    className="p-3 bg-[rgba(255,255,255,.02)] rounded-lg border border-[#ffffff0f]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-white">
                        {new Date(attendance.date).toLocaleDateString()}
                      </p>
                      <div className="flex gap-1">
                        {attendance.breakfast?.status === 'present' && (
                          <div className="w-2 h-2 bg-orange-500 rounded-full" title="Breakfast" />
                        )}
                        {attendance.lunch?.status === 'present' && (
                          <div className="w-2 h-2 bg-green-500 rounded-full" title="Lunch" />
                        )}
                        {attendance.dinner?.status === 'present' && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" title="Dinner" />
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                        const mealData = attendance[mealType];
                        const mealInfo = getMealInfo(mealType);
                        
                        if (mealData?.status === 'present') {
                          return (
                            <div key={mealType} className="flex items-center gap-2 text-xs">
                              <span className={`capitalize ${mealInfo.textColor}`}>{mealType}:</span>
                              <span className="text-gray-400">{mealData.timestamp}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default withAuth(UserAttendancePage);
