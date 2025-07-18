import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuCard } from "./MenuCard";

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const MenuTabs = ({ menus, onEdit, onDelete, isDeleting }) => {
  // Group menus by day
  const menusByDay = daysOfWeek.reduce((acc, day) => {
    acc[day] = menus.filter(menu => menu.menu_day === day);
    return acc;
  }, {});

  return (
    <Tabs defaultValue="all" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-[#1a1a1a] border border-[#333]">
        <TabsTrigger value="all" className="data-[state=active]:bg-[#FF0049] data-[state=active]:text-white text-gray-400">
          All
        </TabsTrigger>
        {daysOfWeek.map(day => (
          <TabsTrigger 
            key={day} 
            value={day.toLowerCase()} 
            className="data-[state=active]:bg-[#FF0049] data-[state=active]:text-white text-gray-400"
          >
            {day.slice(0, 3)}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="all" className="mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {menus.map((menu) => (
            <MenuCard
              key={menu._id}
              menu={menu}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          ))}
        </div>
        {menus.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg mb-4">No menus found</p>
            <p className="text-gray-500">Create your first menu to get started</p>
          </div>
        )}
      </TabsContent>

      {daysOfWeek.map(day => (
        <TabsContent key={day} value={day.toLowerCase()} className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {menusByDay[day].map((menu) => (
              <MenuCard
                key={menu._id}
                menu={menu}
                onEdit={onEdit}
                onDelete={onDelete}
                isDeleting={isDeleting}
              />
            ))}
          </div>
          {menusByDay[day].length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No menu for {day}</p>
              <p className="text-gray-500">Create a {day} menu to get started</p>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};
