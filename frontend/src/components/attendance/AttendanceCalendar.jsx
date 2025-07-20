import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, CheckCircle, XCircle, Clock, Coffee, Utensils, Moon } from "lucide-react";
import { useMealTimeUtils } from "@/hooks/useAttendance";

export function AttendanceCalendar({ attendanceData }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { getMealInfo } = useMealTimeUtils();

  const getAttendanceForDate = (date) => {
    return attendanceData?.find(d => d.date === date.toDateString());
  };

  const hasAttendance = (date) => {
    const attendance = getAttendanceForDate(date);
    return attendance && (
      attendance.breakfast?.status === 'present' ||
      attendance.lunch?.status === 'present' ||
      attendance.dinner?.status === 'present'
    );
  };

  const mealIcons = {
    breakfast: Coffee,
    lunch: Utensils,
    dinner: Moon
  };

  return (
    <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-[#FF0049]">
          <CalendarIcon className="h-6 w-6" />
          Attendance Calendar
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Breakfast</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Lunch</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>Dinner</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border border-[#ffffff0f] scale-110 transform"
            modifiers={{
              hasAttendance: (date) => hasAttendance(date)
            }}
          />
        </div>
        
        {selectedDate && (
          <div className="mt-4 p-4 bg-[rgba(255,255,255,.02)] rounded-lg border border-[#ffffff0f]">
            <h4 className="font-semibold text-white mb-3">
              {selectedDate.toLocaleDateString()}
            </h4>
            {(() => {
              const dayAttendance = getAttendanceForDate(selectedDate);
              return dayAttendance ? (
                <div className="space-y-2">
                  {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                    const mealData = dayAttendance[mealType];
                    const mealInfo = getMealInfo(mealType);
                    const MealIcon = mealIcons[mealType];
                    
                    return (
                      <div key={mealType} className="flex items-center gap-3">
                        <MealIcon className={`h-4 w-4 ${mealInfo.textColor}`} />
                        <span className="capitalize text-gray-300 min-w-[80px]">{mealType}:</span>
                        {mealData?.status === 'present' ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle className={`h-4 w-4 ${mealInfo.textColor}`} />
                            <span className={mealInfo.textColor}>Present</span>
                            {mealData.timestamp && (
                              <span className="text-gray-400 text-sm">
                                at {mealData.timestamp}
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-400" />
                            <span className="text-red-400">Absent</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">No data available</span>
                </div>
              );
            })()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
