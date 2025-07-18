import { Edit, Trash2, IndianRupee } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const PlanCard = ({ plan, onEdit, onDelete, isDeleting }) => {
  const getPlanBadgeColor = (planType) => {
    switch (planType) {
      case 'Daily': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Weekly': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Monthly': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)] hover:border-[#FF0049]/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-[#FF0049] text-lg mb-1">
              {plan.plan_type}
            </CardTitle>
            <Badge className={getPlanBadgeColor(plan.plan_type)}>
              Plan #{plan.planId}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onEdit(plan)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-[#FF0049]"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onDelete(plan.planId)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-gray-300 text-sm leading-relaxed">
          {plan.plan_desc}
        </p>
        <div className="flex items-center gap-2">
          <IndianRupee className="h-4 w-4 text-[#FF0049]" />
          <span className="text-xl font-bold text-white">
            {plan.plan_price}
          </span>
          <span className="text-gray-400 text-sm">
            per {plan.plan_type.toLowerCase()}
          </span>
        </div>
        
        <div className="pt-2 border-t border-gray-700">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs">
              Created: {new Date(plan.createdAt).toLocaleDateString()}
            </span>
            <span className="text-[#FF0049] font-semibold text-xs">
              ID: {plan._id?.slice(-6) || plan.planId}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
