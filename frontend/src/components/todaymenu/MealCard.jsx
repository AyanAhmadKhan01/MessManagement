import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed } from "lucide-react";

export function MealCard({ meal }) {
  const { name, icon, time, gradient, items } = meal;

  return (
    <Card
      className={`bg-gradient-to-br ${gradient} border border-[#ffffff0f] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,0,73,0.3)] hover:border-[#FF0049]/30`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center gap-3">
          {icon} 
          <span>{name}</span>
        </CardTitle>
        <p className="text-sm text-gray-400 mt-2">Timing: {time}</p>
      </CardHeader>
      <CardContent>
        {items && items.length > 0 ? (
          <div className="space-y-2">
            {items.map((item, index) => (
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
  );
}
