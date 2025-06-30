'use client';

import {
  Sun,
  Drumstick,
  Soup,
  Utensils,
  ChevronDown,
  CircleCheck,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const meals = [
  {
    title: "Breakfast",
    icon: <Sun className="text-[--chart-5]" />,
    time: "8:00 a.m. – 10:00 a.m.",
    items: [
      "Bataka Poha with herbs & lemon",
      "Hot filter coffee",
      "Banana or seasonal fruit",
    ],
  },
  {
    title: "Lunch",
    icon: <Drumstick className="text-[--chart-5]" />,
    time: "12:00 p.m. – 2:00 p.m.",
    items: [
      "Rotli (soft flatbread)",
      "Dal Bhat (lentils & rice)",
      "Chhole Chana (spicy chickpeas)",
      "Aloo Palak curry",
    ],
  },
  {
    title: "Dinner",
    icon: <Soup className="text-[--chart-5]" />,
    time: "7:30 p.m. – 9:30 p.m.",
    items: [
      "Paneer Butter Masala",
      "Tandoori Roti",
      "Jeera Rice",
      "Kheer (sweet dish)",
    ],
  },
];

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white py-6 px-4 font-sans">
      <style>{`
        :root {
          --chart-5: oklch(0.645 0.246 16.439);
        }
      `}</style>

      <div className="flex items-center mb-4 ml-2">
        <Utensils className="text-[--chart-5] w-6 h-6" />
        <h1 className="text-4xl font-bold ml-4">Today's Mess Menu</h1>
        <Separator orientation="vertical" className="ml-6 h-8" />
      </div>

      <Separator orientation="horizontal" className="mb-6 mx-2" />

      <div className="relative max-w-xs mb-10 mx-2">
        <select className="w-full appearance-none bg-[rgba(255,255,255,0.05)] text-white border border-[rgba(255,255,255,0.07)] rounded-lg px-4 py-2 pr-10 backdrop-blur-sm focus:outline-none focus:ring-1 focus:ring-[--chart-5]">
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      <div className="bg-[--chart-5] text-black font-semibold border border-[rgba(255,255,255,0.15)] rounded-xl px-6 py-4 text-center text-lg backdrop-blur-sm mx-2 mb-10">
        🍨 Today's Special: Ice Cream with Mixed Fruit Toppings
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(330px,_1fr))] gap-4 mx-2">
        {meals.map((meal, idx) => (
          <Card
            key={idx}
            className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] rounded-2xl backdrop-blur-md"
          >
            <CardHeader className="flex justify-between items-center">
              <CardTitle className="text-xl text-[--chart-5]">
                {meal.title}
              </CardTitle>
              {meal.icon}
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-4">{meal.time}</p>
              <ul className="space-y-2 text-sm text-white">
                {meal.items.map((item, i) => (
                  <li key={i} className="flex gap-2 items-start">
                    <CircleCheck className="w-4 h-4 text-[--chart-5]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-red-400 text-center mt-6">
                * Please follow all mess rules and enjoy your food!
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
