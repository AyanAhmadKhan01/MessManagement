import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useMealTimeUtils } from "@/hooks/useAttendance";

export function RecentAttendance({ attendanceData }) {
  const { getMealInfo } = useMealTimeUtils();

  // Get last 10 records and reverse to show most recent first
  const recentData = attendanceData?.slice(-10).reverse() || [];

  return (
    <Card className="bg-[rgba(255,255,255,.04)] border-[rgba(255,255,255,.09)] backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-[#FF0049]">
          <Clock className="h-6 w-6" />
          Recent Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {recentData.map((attendance, index) => (
            <div
              key={index}
              className="p-3 bg-[rgba(255,255,255,.02)] rounded-lg border border-[#ffffff0f]"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-white">
                  {new Date(attendance.date).toLocaleDateString()}
                </p>
                <div className="flex gap-1">
                  {attendance.breakfast?.status === 'present' && (
                    <div className="w-2 h-2 bg-orange-500 rounded-full" title="Breakfast" />
                  )}
                  {attendance.lunch?.status === 'present' && (
                    <div className="w-2 h-2 bg-green-500 rounded-full" title="Lunch" />
                  )}
                  {attendance.dinner?.status === 'present' && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full" title="Dinner" />
                  )}
                </div>
              </div>
              <div className="space-y-1">
                {['breakfast', 'lunch', 'dinner'].map((mealType) => {
                  const mealData = attendance[mealType];
                  const mealInfo = getMealInfo(mealType);
                  
                  if (mealData?.status === 'present') {
                    return (
                      <div key={mealType} className="flex items-center gap-2 text-xs">
                        <span className={`capitalize ${mealInfo.textColor}`}>{mealType}:</span>
                        <span className="text-gray-400">{mealData.timestamp}</span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
          
          {recentData.length === 0 && (
            <div className="text-center py-8">
              <Clock className="h-8 w-8 text-gray-500 mx-auto mb-2" />
              <p className="text-gray-400">No attendance data available</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
