import { Edit, Trash2, Coffee, Sun, Moon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Helper function to parse menu items (handle both string and array)
const parseMenuItems = (items) => {
  if (!items) return [];
  if (Array.isArray(items)) return items;
  if (typeof items === 'string') {
    return items.split(',').map(item => item.trim()).filter(item => item.length > 0);
  }
  return [];
};

// Helper function to format menu items for display
const formatMenuItems = (items) => {
  const parsed = parseMenuItems(items);
  return parsed.length > 0 ? parsed.join(', ') : 'Not set';
};

// Get meal icon for meal type
const getMealIcon = (mealType) => {
  switch (mealType) {
    case 'breakfast': return <Coffee className="h-4 w-4" />;
    case 'lunch': return <Sun className="h-4 w-4" />;
    case 'dinner': return <Moon className="h-4 w-4" />;
    default: return null;
  }
};

export const MenuCard = ({ menu, onEdit, onDelete, isDeleting }) => {
  const meals = [
    { type: 'breakfast', label: 'Breakfast', items: menu.menu_breakfast, color: 'bg-orange-500/20 text-orange-400' },
    { type: 'lunch', label: 'Lunch', items: menu.menu_lunch, color: 'bg-yellow-500/20 text-yellow-400' },
    { type: 'dinner', label: 'Dinner', items: menu.menu_dinner, color: 'bg-purple-500/20 text-purple-400' }
  ];

  return (
    <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)] hover:border-[#FF0049]/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-[#FF0049] text-lg mb-1">
              {menu.menu_day}
            </CardTitle>
            <Badge className="bg-[#FF0049]/20 text-[#FF0049] border-[#FF0049]/30">
              {menu.menu_day} Menu
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onEdit(menu)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-[#FF0049]"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onDelete(menu._id)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {meals.map((meal) => (
          <div key={meal.type} className="space-y-2">
            <div className="flex items-center gap-2">
              {getMealIcon(meal.type)}
              <Badge className={`${meal.color} text-xs`}>
                {meal.label}
              </Badge>
            </div>
            <div className="text-sm text-gray-300 pl-6">
              {formatMenuItems(meal.items)}
            </div>
          </div>
        ))}
        
        {menu.special_menu && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-pink-500/20 text-pink-400 text-xs">
                Special Menu
              </Badge>
            </div>
            <div className="text-sm text-gray-300">
              {menu.special_menu}
            </div>
          </div>
        )}
        
        <div className="pt-2 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs">
              Created: {new Date(menu.createdAt).toLocaleDateString()}
            </span>
            <span className="text-[#FF0049] font-semibold text-xs">
              ID: {menu._id?.slice(-6)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
