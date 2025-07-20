import { Card, CardContent } from "@/components/ui/card";
import { Coffee, Utensils, Moon } from "lucide-react";
import { useMealTimeUtils } from "@/hooks/useAttendance";

export function MealStats({ mealStats }) {
  const { getMealInfo } = useMealTimeUtils();
  
  const mealTypes = ['breakfast', 'lunch', 'dinner'];
  const mealIcons = {
    breakfast: Coffee,
    lunch: Utensils,
    dinner: Moon
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {mealTypes.map((mealType) => {
        const mealInfo = getMealInfo(mealType);
        const MealIcon = mealIcons[mealType];
        const stats = mealStats?.[mealType] || { percentage: 0, present: 0, total: 0 };

        return (
          <Card key={mealType} className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
            <CardContent className="p-6 text-center">
              <MealIcon className={`h-10 w-10 mx-auto mb-3 ${mealInfo.textColor}`} />
              <h3 className={`text-lg font-semibold ${mealInfo.textColor} mb-2 capitalize`}>
                {mealType} Stats
              </h3>
              <p className="text-3xl font-bold text-white mb-1">
                {stats.percentage?.toFixed(0) || 0}%
              </p>
              <p className="text-sm text-gray-400">
                {stats.present || 0}/{stats.total || 0} attended
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
