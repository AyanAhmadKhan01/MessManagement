"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Sun, UtensilsCrossed, Moon, Loader, ChefHat } from "lucide-react";
import { useEffect, useState } from "react";
import { MENU_BASE } from "@/utils/menuBaseURL";
import { toast } from 'react-toastify';
import withAuth from "@/components/withAuth";

function TodayMenuPage() {
  const [todayMenu, setTodayMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const getTodayDate = () => {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[today.getDay()];
  };
  const fetchTodayMenu = async () => {
    try {
      setLoading(true);
      const today = getTodayDate();
      const response = await fetch(`${MENU_BASE}`);
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        const todayMenuData = data.data.find(menu => menu.menu_day === today);
        if (todayMenuData) {
          setTodayMenu(todayMenuData);
        } else {
          toast.error(`No menu found for ${today}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style: {
              background: 'rgba(15, 15, 15, 0.9)',
              border: '1px solid rgba(255, 0, 73, 0.3)',
              color: '#ffffff',
              backdropFilter: 'blur(10px)',
            },
          });
        }
      } else {
        throw new Error('Failed to fetch menu data');
      }
    } catch (error) {
      console.error("Error fetching today's menu:", error);
      toast.error("Failed to load today's menu", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodayMenu();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading today's menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white px-4 py-10">
      <div className="flex items-center justify-center gap-3 mb-8">
        <CalendarDays className="text-[#FF0049]" size={32} />
        <h1 className="text-4xl font-bold text-center">
          Today's <span className="text-[#FF0049]">Menu</span>
        </h1>
      </div>

      <div className="text-center mb-6">
        <p className="text-xl text-gray-300">{getTodayDate()}, {new Date().toLocaleDateString()}</p>
      </div>{todayMenu?.special_menu && (
        <div className="max-w-xl mx-auto bg-gradient-to-r from-[#FF0049]/20 to-[#FF0049]/10 border border-[#FF0049] text-[#FF0049] rounded-lg px-4 py-3 text-center font-medium mb-10 animate-pulse">
          <ChefHat className="inline mr-2" size={20} />
          Today's Special: {todayMenu.special_menu}
        </div>
      )}

      {todayMenu ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {mealData.map((meal, i) => (
            <Card
              key={i}
              className={`bg-gradient-to-br ${meal.gradient} border border-[#ffffff0f] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,0,73,0.3)] hover:border-[#FF0049]/30`}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl flex items-center gap-3">
                  {meal.icon} 
                  <span>{meal.name}</span>
                </CardTitle>
                <p className="text-sm text-gray-400 mt-2">Timing: {meal.time}</p>
              </CardHeader>
              <CardContent>
                {meal.items && meal.items.length > 0 ? (
                  <div className="space-y-2">
                    {meal.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#FF0049] rounded-full flex-shrink-0"></div>
                        <span className="text-sm text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <UtensilsCrossed className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No items available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Card className="max-w-md mx-auto bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)]">
            <CardContent className="py-12">
              <UtensilsCrossed className="h-16 w-16 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No Menu Available</h3>
              <p className="text-gray-400">Menu for {getTodayDate()} is not yet available.</p>
              <p className="text-sm text-gray-500 mt-2">Please check back later or contact the mess administration.</p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="text-center mt-12 text-sm text-gray-400 max-w-2xl mx-auto">
        <div className="bg-[rgba(255,255,255,.02)] border border-[rgba(255,255,255,.05)] rounded-lg p-4">
          <p className="font-medium text-gray-300 mb-2">📋 Mess Guidelines</p>
          <p>* Please follow all rules of the mess and enjoy your food.</p>
          <p>* Timings are subject to change. Please check for updates.</p>
        </div>
      </div>
    </div>
  );
}

export default withAuth(TodayMenuPage);
