import { ClipboardList, IndianRupee, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PlanStats = ({ plans, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)]">
            <CardContent className="p-4">
              <Skeleton className="h-4 w-20 mb-2 bg-gray-600" />
              <Skeleton className="h-8 w-12 bg-gray-600" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const stats = {
    totalPlans: plans?.length || 0,
    dailyPlans: plans?.filter(p => p.plan_type === 'Daily').length || 0,
    weeklyPlans: plans?.filter(p => p.plan_type === 'Weekly').length || 0,
    monthlyPlans: plans?.filter(p => p.plan_type === 'Monthly').length || 0,
    averagePrice: plans?.length > 0 
      ? Math.round(plans.reduce((sum, p) => sum + p.plan_price, 0) / plans.length)
      : 0,
  };

  const statCards = [
    {
      title: "Total Plans",
      value: stats.totalPlans,
      icon: ClipboardList,
      color: "text-blue-400",
    },
    {
      title: "Daily Plans",
      value: stats.dailyPlans,
      icon: Calendar,
      color: "text-green-400",
    },
    {
      title: "Weekly Plans", 
      value: stats.weeklyPlans,
      icon: Calendar,
      color: "text-yellow-400",
    },
    {
      title: "Monthly Plans",
      value: stats.monthlyPlans,
      icon: Calendar,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)] hover:border-[#FF0049]/40 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
