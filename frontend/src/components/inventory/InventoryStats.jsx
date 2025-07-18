import { Package, IndianRupee, AlertTriangle, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StatsCard = ({ icon: Icon, title, value, subtitle, className = "" }) => (
  <Card className={`bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)] ${className}`}>
    <CardContent className="p-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-[#FF0049]/10 rounded-lg">
          <Icon className="h-5 w-5 text-[#FF0049]" />
        </div>
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <p className="text-gray-400 text-sm">{title}</p>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </CardContent>
  </Card>
);

export const InventoryStats = ({ stats, isLoading }) => {
  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {[...Array(4)].map((_, i) => (
        <StatsCard key={i} icon={Package} title="Loading..." value="..." />
      ))}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <StatsCard icon={Package} title="Total Items" value={stats?.totalItems || 0} />
      <StatsCard icon={IndianRupee} title="Total Value" value={`₹${stats?.totalValue?.toLocaleString() || 0}`} />
      <StatsCard icon={AlertTriangle} title="Low Stock" value={stats?.lowStock || 0} className="border-yellow-500/20" />
      <StatsCard icon={TrendingUp} title="Categories" value="5" subtitle="store types" />
    </div>
  );
};
