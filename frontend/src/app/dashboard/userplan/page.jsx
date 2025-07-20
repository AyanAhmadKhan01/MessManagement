"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  Calendar, 
  IndianRupee, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Loader,
  TrendingUp,
  Target,
  Award,
  CalendarDays,
  BarChart3,
  User,
  AlertCircle,
  ShoppingCart,
  Star,
  Activity
} from "lucide-react";
import { authService } from "@/utils/authService";
import { USERPLAN_BASE } from "@/utils/userplanBaseURL";
import { PLAN_BASE } from "@/utils/planBaseURL";
import { toast } from 'react-toastify';
import withAuth from "@/components/withAuth";

function UserPlanPage() {
  const [user, setUser] = useState(null);
  const [userPlan, setUserPlan] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);
  const [allPlans, setAllPlans] = useState([]);
  const [planHistory, setPlanHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    totalAttendance: 0,
    planDaysRemaining: 0,
    planProgress: 0,
    attendancePercentage: 0,
    totalSpent: 0,
    planStatus: 'inactive'
  });

  const getPlanTypeColor = (type) => {
    switch (type) {
      case "Daily": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Weekly": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Monthly": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const fetchAllPlans = async () => {
    try {
      const response = await fetch(`${PLAN_BASE}/plans`);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setAllPlans(data);
        console.log("Fetched plans:", data);
      } else {
        console.error("Plans data is not an array:", data);
        setAllPlans([]);
      }
    } catch (error) {
      console.error("Error fetching plans:", error);
      toast.error("Failed to load available plans", {
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
      const currentUser = authService.getCurrentUser();
      if (!currentUser || !currentUser.userId) return;

      const response = await fetch(`${USERPLAN_BASE}`);
      const data = await response.json();
      
      console.log("User plan response:", data);
      
      if (data.success && Array.isArray(data.data)) {

        const userPlanData = data.data.find(plan => 
          plan.userId === currentUser.userId || 
          plan.user_id === currentUser.userId
        );
        
        console.log("Found user plan:", userPlanData);
        setUserPlan(userPlanData);

        const userPlans = data.data.filter(plan => 
          plan.userId === currentUser.userId || 
          plan.user_id === currentUser.userId
        );
        setPlanHistory(userPlans);
        
        if (userPlanData && allPlans.length > 0) {

          const planDetail = allPlans.find(plan => plan.planId === userPlanData.planId);
          
          console.log("Found plan details:", planDetail);
          setPlanDetails(planDetail);

          if (planDetail && (userPlanData.start_date || userPlanData.startDate)) {
            calculateUserStats(userPlanData, planDetail);
          }
        }
      } else if (Array.isArray(data)) {

        const userPlanData = data.find(plan => 
          plan.userId === currentUser.userId || 
          plan.user_id === currentUser.userId
        );
        setUserPlan(userPlanData);
        
        if (userPlanData && allPlans.length > 0) {
          const planDetail = allPlans.find(plan => plan.planId === userPlanData.planId);
          setPlanDetails(planDetail);
          
          if (planDetail && (userPlanData.start_date || userPlanData.startDate)) {
            calculateUserStats(userPlanData, planDetail);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching user plan:", error);
      toast.error("Failed to load your plan data", {
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
    try {
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
        attendancePercentage: Math.min(100, attendancePercentage),
        totalSpent: parseFloat(planDetail.plan_price) || 0,
        planStatus: daysRemaining > 0 ? 'active' : 'expired'
      });
    } catch (error) {
      console.error("Error calculating user stats:", error);

      setUserStats({
        totalAttendance: 0,
        planDaysRemaining: 0,
        planProgress: 0,
        attendancePercentage: 0,
        totalSpent: parseFloat(planDetail?.plan_price) || 0,
        planStatus: 'expired'
      });
    }
  };

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (user) {
      const loadData = async () => {
        setLoading(true);
        try {
          await fetchAllPlans();
        } finally {
          setLoading(false);
        }
      };
      loadData();
    }
  }, [user]);

  useEffect(() => {
    if (allPlans.length > 0 && user) {
      fetchUserPlan();
    }
  }, [allPlans, user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading your plan details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <div className="container mx-auto px-4 py-8 space-y-8"><div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[rgba(255,255,255,.6)] mb-4">My Plan</h1>
          <p className="text-gray-400">
            {user?.name ? `Manage your meal plan, ${user.name}` : 'View your current plan and available options'}
          </p>
        </div>
        
        <Separator className="bg-[rgba(255,255,255,.1)]" />

        {userPlan && planDetails ? (
          <div className="space-y-8"><div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#FF0049]/5 to-[#FF336F]/5 rounded-xl blur-xl" />
              <Card className="relative bg-gradient-to-r from-[#1a1a1a]/90 to-[#2a2a2a]/90 backdrop-blur-xl border-[#ffffff0f]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-[#FF0049] text-2xl">
                    <CreditCard className="h-8 w-8" />
                    Your Current Plan
                    <Badge className={userStats.planStatus === 'active' ? 
                      "bg-green-500/20 text-green-400 border-green-500/30" : 
                      "bg-red-500/20 text-red-400 border-red-500/30"
                    }>
                      {userStats.planStatus === 'active' ? (
                        <><CheckCircle className="w-3 h-3 mr-1" />Active</>
                      ) : (
                        <><XCircle className="w-3 h-3 mr-1" />Expired</>
                      )}
                    </Badge>
                  </CardTitle>
                  <p className="text-gray-400">Plan assigned by admin</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Plan Type</p>
                      <Badge className={getPlanTypeColor(planDetails.plan_type)} variant="outline">
                        {planDetails.plan_type}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Plan Price</p>
                      <div className="flex items-center gap-1 text-xl font-bold text-green-400">
                        <IndianRupee className="h-5 w-5" />
                        {planDetails.plan_price}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Days Remaining</p>
                      <div className="text-2xl font-bold text-[#FF0049]">
                        {userStats.planDaysRemaining}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-400">Started On</p>
                      <p className="font-semibold text-white">
                        {new Date(userPlan.startDate || userPlan.start_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div><div className="space-y-2">
                    <p className="text-sm text-gray-400">Plan Description</p>
                    <p className="text-gray-300 bg-[rgba(255,255,255,.02)] p-4 rounded-lg border border-[rgba(255,255,255,.05)]">
                      {planDetails.plan_desc || 'No description available'}
                    </p>
                  </div><div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Plan Progress</span>
                      <span>{Math.round(userStats.planProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#FF0049] to-[#FF336F] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${userStats.planProgress}%` }}
                      />
                    </div>
                  </div><div className="bg-[rgba(255,165,0,.1)] border border-[rgba(255,165,0,.2)] rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-orange-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-orange-400 mb-1">Want to change your plan?</h4>
                        <p className="text-sm text-gray-300">
                          Your plan is managed by the administrator. To change or upgrade your plan, 
                          please contact the admin or mess management.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Calendar className="h-10 w-10 text-[#FF0049] mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-[#FF0049] mb-2">Days Left</h3>
                  <p className="text-3xl font-bold text-white">
                    {userStats.planDaysRemaining}
                  </p>
                  <p className="text-sm text-gray-400">until expiry</p>
                </CardContent>
              </Card>

              <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <IndianRupee className="h-10 w-10 text-green-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Plan Cost</h3>
                  <p className="text-3xl font-bold text-white">
                    ₹{userStats.totalSpent}
                  </p>
                  <p className="text-sm text-gray-400">total paid</p>
                </CardContent>
              </Card>

              <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Activity className="h-10 w-10 text-blue-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">Attendance</h3>
                  <p className="text-3xl font-bold text-white">
                    {Math.round(userStats.attendancePercentage)}%
                  </p>
                  <p className="text-sm text-gray-400">this plan</p>
                </CardContent>
              </Card>

              <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
                <CardContent className="p-6 text-center">
                  <Target className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-purple-400 mb-2">Progress</h3>
                  <p className="text-3xl font-bold text-white">
                    {Math.round(userStats.planProgress)}%
                  </p>
                  <p className="text-sm text-gray-400">completed</p>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
       
          <div className="text-center py-12">
            <Card className="max-w-md mx-auto bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)]">
              <CardContent className="py-12">
                <AlertCircle className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No Active Plan</h3>
                <p className="text-gray-400 mb-4">You don't have an active meal plan assigned yet.</p>
                <p className="text-sm text-gray-500">Please contact the administrator to get a plan assigned.</p>
              </CardContent>
            </Card>
          </div>
        )}<div className="space-y-6">
          <div className="flex items-center gap-3">
            <ShoppingCart className="h-6 w-6 text-[#FF0049]" />
            <h2 className="text-2xl font-bold text-white">Available Plans</h2>
          </div>
          
          {allPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPlans.map((plan) => {
                const isCurrentPlan = planDetails && (
                  plan._id === planDetails._id || 
                  plan.planId === planDetails.planId
                );
                
                return (
                  <Card 
                    key={plan._id || plan.planId || Math.random()} 
                    className={`bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${
                      isCurrentPlan ? 'ring-2 ring-[#FF0049] bg-[#FF0049]/5' : 'hover:border-[#FF0049]/30'
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl text-white">{plan.plan_type} Plan</CardTitle>
                        {isCurrentPlan && (
                          <Badge className="bg-[#FF0049] text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Current
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-2xl font-bold text-green-400">
                        <IndianRupee className="h-6 w-6" />
                        {plan.plan_price}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-300 mb-4">
                        {plan.plan_desc || 'No description available'}
                      </p>
                      <Badge className={getPlanTypeColor(plan.plan_type)} variant="outline">
                        {plan.plan_type}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
              <CardContent className="py-12 text-center">
                <ShoppingCart className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No Plans Available</h3>
                <p className="text-gray-400">No meal plans are currently available.</p>
              </CardContent>
            </Card>
          )}
        </div>{planHistory.length > 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Clock className="h-6 w-6 text-[#FF0049]" />
              <h2 className="text-2xl font-bold text-white">Plan History</h2>
            </div>
            
            <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {planHistory.slice(0, 5).map((historyPlan, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-[rgba(255,255,255,.02)] rounded-lg border border-[rgba(255,255,255,.05)]">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-[#FF0049] rounded-full"></div>
                        <div>
                          <p className="font-semibold text-white">
                            {allPlans.find(p => p._id === historyPlan.planId || p._id === historyPlan.plan_id)?.plan_type || 'Unknown'} Plan
                          </p>
                          <p className="text-sm text-gray-400">
                            Started: {new Date(historyPlan.startDate || historyPlan.start_date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-green-400">
                          ₹{allPlans.find(p => p._id === historyPlan.planId || p._id === historyPlan.plan_id)?.plan_price || '0'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(UserPlanPage);
