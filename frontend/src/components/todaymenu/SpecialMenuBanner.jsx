import { ChefHat } from "lucide-react";

export function SpecialMenuBanner({ specialMenu }) {
  if (!specialMenu) return null;

  return (
    <div className="max-w-xl mx-auto bg-gradient-to-r from-[#FF0049]/20 to-[#FF0049]/10 border border-[#FF0049] text-[#FF0049] rounded-lg px-4 py-3 text-center font-medium mb-10 animate-pulse">
      <ChefHat className="inline mr-2" size={20} />
      Today's Special: {specialMenu}
    </div>
  );
}
