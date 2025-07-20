import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, TrendingUp, Award, Calendar as CalendarIcon } from "lucide-react";

export function AttendanceStats({ stats }) {
  const statCards = [
    {
      title: "Overall Rate",
      value: `${stats.attendancePercentage?.toFixed(0) || 0}%`,
      subtitle: `${stats.presentMeals || 0}/${stats.totalMeals || 0} meals`,
      icon: BarChart3,
      color: "text-blue-400"
    },
    {
      title: "Current Streak",
      value: stats.currentStreak || 0,
      subtitle: "consecutive days",
      icon: TrendingUp,
      color: "text-green-400"
    },
    {
      title: "Best Streak",
      value: stats.longestStreak || 0,
      subtitle: "days record",
      icon: Award,
      color: "text-purple-400"
    },
    {
      title: "This Week",
      value: stats.thisWeekAttendance || 0,
      subtitle: "days present",
      icon: CalendarIcon,
      color: "text-[#FF0049]"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
            <CardContent className="p-6 text-center">
              <IconComponent className={`h-10 w-10 ${stat.color} mx-auto mb-3`} />
              <h3 className={`text-lg font-semibold ${stat.color} mb-2`}>{stat.title}</h3>
              <p className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-400">
                {stat.subtitle}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
