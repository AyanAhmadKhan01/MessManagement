import { Sun, UtensilsCrossed, Moon } from "lucide-react";
import { MealCard } from "./MealCard";

export function MealGrid({ todayMenu }) {
  const mealData = [
    {
      name: "Breakfast",
      icon: <Sun className="text-yellow-400" size={24} />,
      time: "7:30 AM - 9:30 AM",
      gradient: "from-[#1a1a1a] to-[#2a2a2a]",
      items: todayMenu?.menu_breakfast || []
    },
    {
      name: "Lunch",
      icon: <UtensilsCrossed className="text-green-400" size={24} />,
      time: "12:30 PM - 2:00 PM",
      gradient: "from-[#1f1f1f] to-[#3a3a3a]",
      items: todayMenu?.menu_lunch || []
    },
    {
      name: "Dinner",
      icon: <Moon className="text-blue-400" size={24} />,
      time: "7:00 PM - 8:30 PM",
      gradient: "from-[#1a1a1a] to-[#282828]",
      items: todayMenu?.menu_dinner || []
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {mealData.map((meal, i) => (
        <MealCard key={i} meal={meal} />
      ))}
    </div>
  );
}
