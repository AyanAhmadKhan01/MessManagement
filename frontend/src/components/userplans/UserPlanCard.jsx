import { Edit, Trash2, User, Calendar, Clock, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const getStatusBadge = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (now < start) {
    return { status: 'Upcoming', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
  } else if (now >= start && now <= end) {
    return { status: 'Active', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
  } else {
    return { status: 'Expired', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
  }
};

const getMealBadges = (isavailable) => {
  if (!isavailable || isavailable.length === 0) return [];
  
  const mealTypes = {
    breakfast: { label: 'Breakfast', color: 'bg-orange-500/20 text-orange-400' },
    lunch: { label: 'Lunch', color: 'bg-yellow-500/20 text-yellow-400' },
    dinner: { label: 'Dinner', color: 'bg-purple-500/20 text-purple-400' }
  };
  
  return isavailable.map(meal => mealTypes[meal]).filter(Boolean);
};

export const UserPlanCard = ({ userPlan, onEdit, onDelete, isDeleting, users, plans }) => {
  const statusInfo = getStatusBadge(userPlan.start_date, userPlan.end_date);
  const mealBadges = getMealBadges(userPlan.isavailable);
  
  // Find user and plan info
  const userInfo = users?.find(u => u.userId === userPlan.userId);
  const planInfo = plans?.find(p => p.planId === userPlan.planId);
  
  const duration = Math.ceil((new Date(userPlan.end_date) - new Date(userPlan.start_date)) / (1000 * 60 * 60 * 24));

  return (
    <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)] hover:border-[#FF0049]/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-[#FF0049] text-lg mb-1">
              {userInfo?.name || `User ${userPlan.userId}`}
            </CardTitle>
            <div className="flex gap-2 mb-2">
              <Badge className={statusInfo.color}>
                {statusInfo.status}
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                {planInfo?.plan_type || `Plan ${userPlan.planId}`}
              </Badge>
            </div>
            <div className="flex gap-1 flex-wrap">
              {mealBadges.map((meal, index) => (
                <Badge key={index} className={`${meal.color} text-xs`}>
                  {meal.label}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onEdit(userPlan)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-[#FF0049]"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onDelete(userPlan._id)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-[#FF0049]" />
            <span className="text-gray-300">{userInfo?.email || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-[#FF0049]" />
            <span className="text-gray-300">₹{planInfo?.plan_price || 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#FF0049]" />
            <span className="text-gray-300">
              {new Date(userPlan.start_date).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#FF0049]" />
            <span className="text-gray-300">{duration} days</span>
          </div>
        </div>
        <div className="pt-2 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">
              Ends: {new Date(userPlan.end_date).toLocaleDateString()}
            </span>
            <span className="text-[#FF0049] font-semibold text-sm">
              ID: {userPlan._id?.slice(-6)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
