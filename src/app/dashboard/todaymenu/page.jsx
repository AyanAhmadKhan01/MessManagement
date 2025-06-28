"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Sun, UtensilsCrossed, Moon } from "lucide-react";

const meals = [
  {
    name: "Breakfast",
    icon: <Sun className="text-yellow-400" size={24} />,
    time: "7:30 AM - 9:30 AM",
    gradient: "from-[#1a1a1a] to-[#2a2a2a]",
    items: ["Poha", "Boiled Eggs", "Bread Butter", "Tea"]
  },
  {
    name: "Lunch",
    icon: <UtensilsCrossed className="text-green-400" size={24} />,
    time: "12:30 PM - 2:00 PM",
    gradient: "from-[#1f1f1f] to-[#3a3a3a]",
    items: ["Dal Fry", "Jeera Rice", "Chapati", "Mixed Veg", "Salad"]
  },
  {
    name: "Dinner",
    icon: <Moon className="text-blue-400" size={24} />,
    time: "7:00 PM - 8:30 PM",
    gradient: "from-[#1a1a1a] to-[#282828]",
    items: ["Paneer Butter Masala", "Naan", "Fried Rice", "Gulab Jamun"]
  },
];

export default function TodayMenuPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Today’s <span className="text-[#FF0049]">Menu</span>
      </h1>

      {/* Special Bar */}
      <div className="max-w-xl mx-auto bg-[#1c1c1c] border border-[#FF0049] text-[#FF0049] rounded-lg px-4 py-2 text-center font-medium mb-10 animate-pulse">
        🍨 Today’s Special: Ice Cream
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {meals.map((meal, i) => (
          <Card
            key={i}
            className={`bg-gradient-to-br ${meal.gradient} border border-[#ffffff0f] transition-transform hover:scale-[1.01] hover:shadow-[0_0_10px_#FF0049]`}
          >
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                {meal.icon} {meal.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300 mb-2">Timing: {meal.time}</p>
              <ul className="text-sm text-gray-400 list-disc list-inside space-y-1">
                {meal.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12 text-sm text-gray-400">
        * Please follow all rules of the mess and enjoy your food.
      </div>
    </div>
  );
} 