import { Card, CardContent } from "@/components/ui/card";
import { UtensilsCrossed } from "lucide-react";

export function NoMenuAvailable() {
  const getTodayDate = () => {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[today.getDay()];
  };

  return (
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
  );
}
