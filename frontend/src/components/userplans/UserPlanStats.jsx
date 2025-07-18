import { Users, Calendar, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const StatCard = ({ icon: Icon, title, value, subtitle, className = "" }) => (
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

export const UserPlanStats = ({ stats, isLoading }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
    <StatCard
      icon={Users}
      title="Total User Plans"
      value={isLoading ? "..." : stats?.totalUserPlans || 0}
    />
    <StatCard
      icon={Calendar}
      title="Active Plans"
      value={isLoading ? "..." : stats?.activeUserPlans || 0}
      className="border-green-500/20"
    />
    <StatCard
      icon={Clock}
      title="Expired Plans"
      value={isLoading ? "..." : stats?.expiredUserPlans || 0}
      className="border-red-500/20"
    />
    <StatCard
      icon={TrendingUp}
      title="Avg Duration"
      value={isLoading ? "..." : `${stats?.averageDuration || 0} days`}
    />
  </div>
);
