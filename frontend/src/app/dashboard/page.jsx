"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  DollarSign, 
  Users, 
  Activity, 
  ChartNoAxesCombined, 
  Eye, 
  Clock, 
  UtensilsCrossed, 
  Calendar, 
  User,
  CalendarCheck,
  CreditCard,
  ChefHat,
  Bell,
  TrendingUp,
  Loader,
  AlertCircle,
  CheckCircle,
  IndianRupee,
  Star,
  CalendarDays,
  PlusCircle,
  BarChart3,
  Target,
  Award,
  ShoppingCart
} from "lucide-react";
import { DashboardCharts } from "@/components/dashboard/dashboardCharts";
import { DashboardDataTable } from "@/components/dashboard/dashboardDataTable";
import withAuth from "@/components/withAuth";
import { useEffect, useState } from "react";
import { authService } from "@/utils/authService";
import { MENU_BASE } from "@/utils/menuBaseURL";
import { USERPLAN_BASE } from "@/utils/userplanBaseURL";
import { PLAN_BASE } from "@/utils/planBaseURL";
import { BASE } from "@/utils/baseURL";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [todayMenu, setTodayMenu] = useState(null);
  const [weeklyMenus, setWeeklyMenus] = useState([]);
  const [userPlan, setUserPlan] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);
  const [allPlans, setAllPlans] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [userStats, setUserStats] = useState({
    totalAttendance: 0,
    planDaysRemaining: 0,
    planProgress: 0,
    lastAttendance: null,
    attendancePercentage: 0,
    totalSpent: 0,
    totalPlanDuration: 0
  });
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubscribeDialogOpen, setIsSubscribeDialogOpen] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      if (currentUser.role === 2) {
        router.push('/dashboard/admin');
        return;
      }
    }
  }, [router]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getTodayDate = () => {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[today.getDay()];
  };

  const fetchAllMenus = async () => {
    try {
      console.log("Fetching menus from:", MENU_BASE);
      const response = await fetch(`${MENU_BASE}`);
      const data = await response.json();
      
      console.log("Menu response:", data);
      if (data.success && Array.isArray(data.data)) {
        setWeeklyMenus(data.data);
        const today = getTodayDate();
        const todayMenuData = data.data.find(menu => menu.menu_day === today);
        setTodayMenu(todayMenuData);
        console.log("Today's menu:", todayMenuData);
      }
    } catch (error) {
      console.error("Error fetching menus:", error);
      toast.error("Failed to load menu data", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    }
  };

  const fetchAllPlans = async () => {
    try {
      console.log("Fetching plans from:", `${PLAN_BASE}/plans`);
      const response = await fetch(`${PLAN_BASE}/plans`);
      const data = await response.json();
      
      console.log("Plans response:", data);
      if (Array.isArray(data)) {
        setAllPlans(data);
        console.log("Fetched plans:", data);
      } else {
        console.error("Plans data is not an array:", data);
        setAllPlans([]);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to load plans data", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
      setAllPlans([]);
    }
  };


  const fetchUserPlan = async () => {
    try {
      if (!user || !user.userId) return;

      console.log("Fetching user plan for user:", user.userId);
      const response = await fetch(`${USERPLAN_BASE}`);
      const data = await response.json();
      
      console.log("User plan response:", data);
      if (data.success && Array.isArray(data.data)) {

        const userPlanData = data.data.find(plan => 
          plan.userId === user.userId || 
          plan.user_id === user.userId
        );
        
        console.log("Found user plan:", userPlanData);
        setUserPlan(userPlanData);
        
        if (userPlanData && allPlans.length > 0) {

          const planDetail = allPlans.find(plan => plan.planId === userPlanData.planId);
          
          console.log("Found plan details:", planDetail);
          console.log("Looking for plan with ID:", userPlanData.planId);
          console.log("Available plans:", allPlans.map(p => ({ planId: p.planId, _id: p._id, type: p.plan_type })));
          setPlanDetails(planDetail);

          if (planDetail && (userPlanData.start_date || userPlanData.startDate)) {
            calculateUserStats(userPlanData, planDetail);
          }
        }
      } else if (Array.isArray(data)) {

        const userPlanData = data.find(plan => 
          plan.userId === user.userId || 
          plan.user_id === user.userId
        );
        
        console.log("Found user plan (direct array):", userPlanData);
        setUserPlan(userPlanData);
        
        if (userPlanData && allPlans.length > 0) {
          const planDetail = allPlans.find(plan => plan.planId === userPlanData.planId);
          
          console.log("Found plan details (direct array):", planDetail);
          setPlanDetails(planDetail);
          
          if (planDetail && (userPlanData.start_date || userPlanData.startDate)) {
            calculateUserStats(userPlanData, planDetail);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user plan:", error);
      toast.error("Failed to load user plan data", {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    }
  };

  const calculateUserStats = (userPlanData, planDetail) => {
    const startDate = new Date(userPlanData.start_date || userPlanData.startDate);
    const endDate = new Date(userPlanData.end_date || userPlanData.endDate);
    const today = new Date();

    const timeDiff = endDate.getTime() - today.getTime();
    const daysRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));

    const totalDuration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysElapsed = totalDuration - daysRemaining;
    const progress = totalDuration > 0 ? Math.min(100, (daysElapsed / totalDuration) * 100) : 0;

    const mockAttendance = Math.floor(Math.random() * daysElapsed) + Math.floor(daysElapsed * 0.75);
    const attendancePercentage = daysElapsed > 0 ? (mockAttendance / daysElapsed) * 100 : 0;
    
    setUserStats({
      totalAttendance: Math.max(0, mockAttendance),
      planDaysRemaining: daysRemaining,
      planProgress: progress,
      lastAttendance: today.toLocaleDateString(),
      attendancePercentage: Math.min(100, attendancePercentage),
      totalSpent: parseFloat(planDetail.plan_price) || 0,
      totalPlanDuration: totalDuration
    });

    const mockAttendanceData = [];
    for (let i = 0; i < daysElapsed && i < Math.max(0, mockAttendance); i++) {
      const attendanceDate = new Date(startDate);
      attendanceDate.setDate(startDate.getDate() + i);
      mockAttendanceData.push({
        date: attendanceDate.toDateString(),
        status: 'present',
        timestamp: '12:30 PM'
      });
    }
    setAttendanceData(mockAttendanceData);
  };

  const subscribeToPlan = async (plan) => {
    try {
      if (!user || !user.userId) {
        toast.error("User not found", {
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

      const subscriptionData = {
        userId: user.userId,
        planId: plan.planId,
        startDate: new Date().toISOString(),
        status: 'active'
      };

      console.log("Subscribing with data:", subscriptionData);
      const response = await fetch(`${USERPLAN_BASE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriptionData),
      });

      const data = await response.json();
      console.log("Subscription response:", data);
      
      if (response.ok && (data.success || data.message?.includes("created"))) {
        toast.success(`Successfully subscribed to ${plan.plan_type} plan!`, {
          position: "top-right",
          autoClose: 3000,
          style: {
            background: 'rgba(15, 15, 15, 0.9)',
            border: '1px solid rgba(255, 0, 73, 0.3)',
            color: '#ffffff',
            backdropFilter: 'blur(10px)',
          },
        });
        setIsSubscribeDialogOpen(false);
        setSelectedPlan(null);

        setTimeout(() => {
          fetchUserPlan();
        }, 500);
      } else {
        throw new Error(data.message || 'Subscription failed');
      }
    } catch (error) {
      console.error("Error subscribing to plan:", error);
      toast.error(`Failed to subscribe: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    }
  };

  const getPlanTypeColor = (type) => {
    switch (type) {
      case "Daily": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Weekly": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Monthly": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setGreeting(getGreeting());
    console.log("Current user:", currentUser);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (user) {
        console.log("Loading data for user:", user);
        setLoading(true);
        try {
          await fetchAllMenus();
          await fetchAllPlans();
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadData();
  }, [user]);

  useEffect(() => {
    if (user && allPlans.length > 0) {
      console.log("Plans loaded, fetching user plan...");
      fetchUserPlan();
    }
  }, [allPlans, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (user?.role === 2) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Redirecting to admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold mb-4 mt-3 ml-6 text-[rgba(255,255,255,.6)]">
          {`${greeting}, ${user?.name || 'User'}!`}
        </h1>
        <Separator
          orientation="vertical"
          className="ml-9 data-[orientation=vertical]:h-18"
        />
      </div>
      <Separator
        orientation="horizontal"
        className="mr-3 mb-9 data-[orientation=vertical]:h-9"
      /><div className="mx-2 sm:mx-4 space-y-4 sm:space-y-6"><div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20">
            <CardContent className="p-3 sm:p-4 text-center">
              <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Attendance</p>
              <p className="text-lg sm:text-xl font-bold text-blue-400">
                {userStats.attendancePercentage.toFixed(0)}%
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20">
            <CardContent className="p-3 sm:p-4 text-center">
              <Target className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Days Left</p>
              <p className="text-lg sm:text-xl font-bold text-green-400">
                {userStats.planDaysRemaining}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20">
            <CardContent className="p-3 sm:p-4 text-center">
              <Award className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 mx-auto mb-1" />
              <p className="text-xs text-gray-400">Plan Duration</p>
              <p className="text-lg sm:text-xl font-bold text-purple-400">
                {userStats.totalPlanDuration || 0} days
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-[#FF0049]/10 to-[#FF336F]/5 border border-[#FF0049]/20">
            <CardContent className="p-3 sm:p-4 text-center">
              <IndianRupee className="h-5 w-5 sm:h-6 sm:w-6 text-[#FF0049] mx-auto mb-1" />
              <p className="text-xs text-gray-400">Total Spent</p>
              <p className="text-lg sm:text-xl font-bold text-[#FF0049]">
                ₹{userStats.totalSpent}
              </p>
            </CardContent>
          </Card>
        </div><div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{userPlan && planDetails ? (
            <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)]">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-[#FF0049] text-lg">
                  <CreditCard className="h-5 w-5" />
                  Active Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <Badge className={getPlanTypeColor(planDetails.plan_type)}>
                    {planDetails.plan_type}
                  </Badge>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-400">₹{planDetails.plan_price}</p>
                    <p className="text-xs text-gray-400">Started: {new Date(userPlan.start_date || userPlan.startDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(userStats.planProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#FF0049] to-[#FF336F] h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${userStats.planProgress}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-xs text-gray-400">{planDetails.plan_desc}</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-orange-400 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-orange-400 text-sm">No Active Plan</h3>
                    <p className="text-gray-300 text-xs mb-2">Subscribe to access mess services</p>
                    <Button 
                      size="sm"
                      className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white text-xs"
                      onClick={() => setIsSubscribeDialogOpen(true)}
                    >
                      Browse Plans
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}<Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)]">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-[#FF0049] text-lg">
                <UtensilsCrossed className="h-5 w-5" />
                Today's Menu - {getTodayDate()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayMenu ? (
                <>
                  {todayMenu?.special_menu && (
                    <div className="mb-3 p-2 bg-gradient-to-r from-[#FF0049]/20 to-[#FF0049]/10 border border-[#FF0049]/30 rounded-lg">
                      <p className="text-xs text-[#FF0049] font-semibold">Special: {todayMenu.special_menu}</p>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="p-2 bg-gradient-to-br from-orange-500/10 to-orange-600/5 rounded border border-orange-500/20">
                      <h4 className="text-xs font-semibold text-orange-400 mb-1">Breakfast</h4>
                      <div className="space-y-1">
                        {todayMenu.menu_breakfast?.slice(0, 2).map((item, index) => (
                          <p key={index} className="text-xs text-gray-300">• {item}</p>
                        ))}
                        {todayMenu.menu_breakfast?.length > 2 && (
                          <p className="text-xs text-gray-500">+{todayMenu.menu_breakfast.length - 2} more</p>
                        )}
                      </div>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded border border-green-500/20">
                      <h4 className="text-xs font-semibold text-green-400 mb-1">Lunch</h4>
                      <div className="space-y-1">
                        {todayMenu.menu_lunch?.slice(0, 2).map((item, index) => (
                          <p key={index} className="text-xs text-gray-300">• {item}</p>
                        ))}
                        {todayMenu.menu_lunch?.length > 2 && (
                          <p className="text-xs text-gray-500">+{todayMenu.menu_lunch.length - 2} more</p>
                        )}
                      </div>
                    </div>
                    <div className="p-2 bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded border border-purple-500/20">
                      <h4 className="text-xs font-semibold text-purple-400 mb-1">Dinner</h4>
                      <div className="space-y-1">
                        {todayMenu.menu_dinner?.slice(0, 2).map((item, index) => (
                          <p key={index} className="text-xs text-gray-300">• {item}</p>
                        ))}
                        {todayMenu.menu_dinner?.length > 2 && (
                          <p className="text-xs text-gray-500">+{todayMenu.menu_dinner.length - 2} more</p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-4">
                  <UtensilsCrossed className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">No menu available for {getTodayDate()}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>{!userPlan && allPlans.length > 0 && (
          <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)]">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-[#FF0049] text-lg">
                <CreditCard className="h-5 w-5" />
                Available Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {allPlans.slice(0, 3).map((plan) => (
                  <div key={plan._id || plan.planId} className="p-3 bg-[#2a2a2a]/30 border border-[#ffffff0f] rounded-lg">
                    <div className="text-center">
                      <Badge className={getPlanTypeColor(plan.plan_type)} variant="outline">
                        {plan.plan_type}
                      </Badge>
                      <div className="mt-2 mb-2">
                        <div className="flex items-center justify-center gap-1 text-xl font-bold text-green-400">
                          <IndianRupee className="h-4 w-4" />
                          {plan.plan_price}
                        </div>
                      </div>
                      <p className="text-xs text-gray-300 mb-2">{plan.plan_desc}</p>
                      <Button 
                        size="sm"
                        className="w-full bg-[#FF0049] hover:bg-[#FF0049]/80 text-white text-xs"
                        onClick={() => {
                          setSelectedPlan(plan);
                          setIsSubscribeDialogOpen(true);
                        }}
                      >
                        Subscribe
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div><Dialog open={isSubscribeDialogOpen} onOpenChange={setIsSubscribeDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-[#1a1a1a]/95 border-[#ffffff0f] backdrop-blur-xl text-white">
          <DialogHeader>
            <DialogTitle className="text-[#FF0049] flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              {selectedPlan ? `Subscribe to ${selectedPlan.plan_type} Plan` : 'Choose a Plan'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {selectedPlan ? (
              <div className="text-center">
                <div className="p-6 bg-[rgba(255,255,255,.04)] rounded-lg border border-[#ffffff0f]">
                  <Badge className={getPlanTypeColor(selectedPlan.plan_type)} variant="outline">
                    {selectedPlan.plan_type}
                  </Badge>
                  <div className="mt-4 mb-4">
                    <div className="flex items-center justify-center gap-1 text-3xl font-bold text-green-400">
                      <IndianRupee className="h-6 w-6" />
                      {selectedPlan.plan_price}
                    </div>
                    <p className="text-sm text-gray-400 mt-1">per {selectedPlan.plan_type.toLowerCase()}</p>
                  </div>
                  <p className="text-gray-300 text-sm">{selectedPlan.plan_desc}</p>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Are you sure you want to subscribe to this plan?
                </p>
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {allPlans.map((plan) => (
                  <div
                    key={plan._id || plan.planId}
                    className="p-4 bg-[rgba(255,255,255,.04)] rounded-lg border border-[#ffffff0f] cursor-pointer hover:border-[#FF0049]/30 transition-colors"
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <Badge className={getPlanTypeColor(plan.plan_type)} variant="outline">
                          {plan.plan_type}
                        </Badge>
                        <p className="text-sm text-gray-300 mt-1">{plan.plan_desc}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-lg font-bold text-green-400">
                          <IndianRupee className="h-4 w-4" />
                          {plan.plan_price}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <DialogFooter className="border-t border-[#ffffff0f] pt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsSubscribeDialogOpen(false);
                setSelectedPlan(null);
              }}
              className="bg-[#1a1a1a]/50 border-[#ffffff0f] text-white hover:bg-[#2a2a2a]/50"
            >
              Cancel
            </Button>
            {selectedPlan && (
              <Button 
                onClick={() => subscribeToPlan(selectedPlan)}
                className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white"
              >
                Subscribe Now
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>   
  );
}

export default withAuth(DashboardPage);
