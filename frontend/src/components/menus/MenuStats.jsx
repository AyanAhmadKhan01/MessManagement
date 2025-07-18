import { Calendar, Coffee, Sun, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const MenuStats = ({ menus, isLoading }) => {
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
    totalMenus: menus?.length || 0,
    breakfastItems: menus?.filter(m => m.menu_breakfast).length || 0,
    lunchItems: menus?.filter(m => m.menu_lunch).length || 0,
    dinnerItems: menus?.filter(m => m.menu_dinner).length || 0,
  };

  const statCards = [
    {
      title: "Total Menus",
      value: stats.totalMenus,
      icon: Calendar,
      color: "text-blue-400",
    },
    {
      title: "Breakfast",
      value: stats.breakfastItems,
      icon: Coffee,
      color: "text-orange-400",
    },
    {
      title: "Lunch", 
      value: stats.lunchItems,
      icon: Sun,
      color: "text-yellow-400",
    },
    {
      title: "Dinner",
      value: stats.dinnerItems,
      icon: Moon,
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
