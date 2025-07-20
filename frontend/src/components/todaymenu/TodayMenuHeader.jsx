import { CalendarDays } from "lucide-react";

export function TodayMenuHeader() {
  const getTodayDate = () => {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[today.getDay()];
  };

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <CalendarDays className="text-[#FF0049]" size={32} />
        <h1 className="text-4xl font-bold">
          Today's <span className="text-[#FF0049]">Menu</span>
        </h1>
      </div>
      <p className="text-xl text-gray-300">
        {getTodayDate()}, {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
