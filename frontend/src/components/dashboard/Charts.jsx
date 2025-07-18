import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { BarChart3, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MenuAnalyticsChart = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)]">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  // Generate menu coverage data
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const menuCoverage = daysOfWeek.map(day => {
    const dayMenu = data.menus.find(menu => menu.menu_day === day);
    return {
      day: day.slice(0, 3),
      hasMenu: dayMenu ? 1 : 0,
      breakfast: dayMenu?.menu_breakfast?.length || 0,
      lunch: dayMenu?.menu_lunch?.length || 0,
      dinner: dayMenu?.menu_dinner?.length || 0,
    };
  });

  return (
    <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF0049]/3 to-[#FF336F]/3 opacity-60" />
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="flex items-center gap-2 text-[#FF0049] text-base">
          <BarChart3 className="h-5 w-5" />
          Weekly Menu Analytics
        </CardTitle>
        <p className="text-xs text-gray-400">Menu coverage across the week</p>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={menuCoverage} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#8A8A8A' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: '#8A8A8A' }}
                width={25}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 15, 15, 0.95)', 
                  border: '1px solid rgba(255, 0, 73, 0.4)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '12px'
                }}
                cursor={{ fill: 'rgba(200, 200, 200, 0.08)' }}
              />
              <Bar dataKey="breakfast" stackId="a" fill="#FF0049" name="Breakfast" radius={[2, 2, 0, 0]} />
              <Bar dataKey="lunch" stackId="a" fill="#FF336F" name="Lunch" />
              <Bar dataKey="dinner" stackId="a" fill="#FF6095" name="Dinner" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const RevenueOverview = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)]">
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-40 w-full" />
          <div className="grid grid-cols-2 gap-2 mt-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Calculate revenue data
  const userPlanStats = data.plans.map((plan, index) => {
    const chartColors = ["#FF0049", "#FF1A5C", "#FF336F", "#FF4D82", "#FF6095"];
    const activePlans = data.userPlans.filter(up => up.planId === plan.planId);
    return {
      planType: plan.plan_type,
      activeUsers: activePlans.length,
      revenue: activePlans.length * (plan.plan_price || 0),
      color: chartColors[index % chartColors.length],
    };
  }).filter(item => item.activeUsers > 0);

  const totalRevenue = userPlanStats.reduce((sum, stat) => sum + stat.revenue, 0);
  const totalUsers = userPlanStats.reduce((sum, stat) => sum + stat.activeUsers, 0);

  if (userPlanStats.length === 0) {
    return (
      <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)]">
        <CardHeader>
          <CardTitle className="text-[#FF0049] text-base">Revenue Overview</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <div className="text-center">
            <AlertCircle className="h-8 w-8 text-gray-500 mx-auto mb-2" />
            <h4 className="text-sm font-medium text-gray-300 mb-1">No Revenue Data</h4>
            <p className="text-xs text-gray-400 mb-2">Assign plans to generate revenue</p>
            <Link href="/dashboard/admin/manage-user-plans">
              <Button size="sm" className="bg-[#FF0049] hover:bg-[#FF0049]/80 text-white text-xs">
                Assign Plans
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF0049]/5 to-[#FF336F]/5 opacity-50" />
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="text-[#FF0049] text-base">Revenue Overview</CardTitle>
        <p className="text-xs text-gray-400">Active plan subscriptions and revenue</p>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userPlanStats}>
              <XAxis 
                dataKey="planType" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#B0B0B0' }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 9, fill: '#8A8A8A' }}
                width={25}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 15, 15, 0.95)', 
                  border: '1px solid rgba(255, 0, 73, 0.4)',
                  borderRadius: '8px',
                  color: '#ffffff',
                  fontSize: '12px'
                }}
                formatter={(value) => [`${value} users`, 'Active Users']}
              />
              <Bar 
                dataKey="activeUsers" 
                fill="#FF0049" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="p-2 bg-gradient-to-r from-[#FF0049]/15 to-[#FF336F]/10 rounded-lg border border-[#FF0049]/20">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-1.5 h-1.5 bg-[#FF0049] rounded-full" />
              <span className="text-xs text-gray-400">Revenue</span>
            </div>
            <p className="text-sm font-bold text-[#FF0049]">
              ₹{totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="p-2 bg-gradient-to-r from-[#FF336F]/15 to-[#FF4D82]/10 rounded-lg border border-[#FF336F]/20">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-1.5 h-1.5 bg-[#FF336F] rounded-full" />
              <span className="text-xs text-gray-400">Users</span>
            </div>
            <p className="text-sm font-bold text-[#FF336F]">
              {totalUsers}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { MenuAnalyticsChart, RevenueOverview };
