import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Coffee, Utensils, Moon, CheckCircle, Clock, QrCode, Loader } from "lucide-react";
import { useMealTimeUtils } from "@/hooks/useAttendance";

export function TodayAttendanceCard({ todayAttendance, onMarkAttendance, isMarkingAttendance }) {
  const { isMealTimeActive, getMealTimeRange, getMealInfo } = useMealTimeUtils();

  const mealTypes = ['breakfast', 'lunch', 'dinner'];
  const mealIcons = {
    breakfast: Coffee,
    lunch: Utensils,
    dinner: Moon
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF0049]/5 to-[#FF336F]/5 rounded-xl blur-xl" />
      <Card className="relative bg-gradient-to-r from-[#1a1a1a]/90 to-[#2a2a2a]/90 backdrop-blur-xl border-[#ffffff0f]">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-[#FF0049] text-2xl">
            <CalendarCheck className="h-8 w-8" />
            Today's Meal Attendance - {new Date().toLocaleDateString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mealTypes.map((mealType) => {
              const mealInfo = getMealInfo(mealType);
              const MealIcon = mealIcons[mealType];
              const isActive = isMealTimeActive(mealType);
              const isMarked = todayAttendance?.[mealType]?.status === 'present';
              const isLoading = isMarkingAttendance[mealType];

              return (
                <div key={mealType} className={`p-6 rounded-lg border ${mealInfo.bgColor} ${mealInfo.borderColor}`}>
                  <div className="text-center">
                    <MealIcon className={`h-12 w-12 mx-auto mb-3 ${mealInfo.textColor}`} />
                    <h3 className={`text-xl font-semibold ${mealInfo.textColor} mb-2 capitalize`}>
                      {mealType}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4">
                      {getMealTimeRange(mealType)}
                    </p>

                    {isMarked ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className={`h-6 w-6 ${mealInfo.textColor}`} />
                          <span className={`font-semibold ${mealInfo.textColor}`}>Marked!</span>
                        </div>
                        <p className="text-xs text-gray-400">
                          at {todayAttendance[mealType].timestamp}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Button
                          onClick={() => onMarkAttendance(mealType)}
                          disabled={!isActive || isLoading}
                          className={`w-full ${mealInfo.buttonColor} ${mealInfo.hoverColor} text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isLoading ? (
                            <>
                              <Loader className="animate-spin h-4 w-4 mr-2" />
                              Marking...
                            </>
                          ) : isActive ? (
                            <>
                              <QrCode className="h-4 w-4 mr-2" />
                              Mark Attendance
                            </>
                          ) : (
                            <>
                              <Clock className="h-4 w-4 mr-2" />
                              Not Available
                            </>
                          )}
                        </Button>
                        {!isActive && (
                          <p className="text-xs text-gray-500">
                            Available during {getMealTimeRange(mealType)}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
