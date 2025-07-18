import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Activity,
  CheckCircle,
  AlertCircle,
  Settings,
  UserPlus,
  ClipboardList,
  ChefHat,
  CalendarDays
} from "lucide-react";
import Link from "next/link";

const SystemHealth = ({ stats, loading }) => {
  if (loading) {
    return (
      <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)]">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF0049]/3 to-[#00FF88]/2 opacity-30" />
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="flex items-center gap-2 text-[#FF0049] text-sm">
          <div className="p-1.5 bg-[#FF0049]/10 rounded-md">
            <Activity className="h-4 w-4" />
          </div>
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 relative z-10">
        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-gray-300 font-medium">Database</span>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-3 py-1">
            <CheckCircle className="w-3 h-3 mr-1.5" />
            Online
          </Badge>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-gray-300 font-medium">Authentication</span>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs px-3 py-1">
            <CheckCircle className="w-3 h-3 mr-1.5" />
            Active
          </Badge>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-gray-300 font-medium">Menu System</span>
          <Badge className={`${stats.totalMenus >= 7 ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-orange-500/20 text-orange-400 border-orange-500/30'} text-xs px-3 py-1`}>
            {stats.totalMenus >= 7 ? <CheckCircle className="w-3 h-3 mr-1.5" /> : <AlertCircle className="w-3 h-3 mr-1.5" />}
            {stats.totalMenus >= 7 ? 'Complete' : 'Setup'}
          </Badge>
        </div>
        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-gray-300 font-medium">Plans</span>
          <Badge className={`${stats.totalPlans > 0 ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'} text-xs px-3 py-1`}>
            {stats.totalPlans > 0 ? <CheckCircle className="w-3 h-3 mr-1.5" /> : <AlertCircle className="w-3 h-3 mr-1.5" />}
            {stats.totalPlans > 0 ? 'Active' : 'None'}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

const QuickActions = ({ loading }) => {
  if (loading) {
    return (
      <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)]">
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const actions = [
    { href: "/dashboard/admin/manage-users", icon: UserPlus, label: "Add User", color: "from-[#FF0049] to-[#FF1A5C]" },
    { href: "/dashboard/admin/manage-plans", icon: ClipboardList, label: "Add Plan", color: "from-[#FF1A5C] to-[#FF336F]" },
    { href: "/dashboard/admin/manage-menus", icon: ChefHat, label: "Add Menu", color: "from-[#FF336F] to-[#FF4D82]" },
    { href: "/dashboard/admin/manage-user-plans", icon: CalendarDays, label: "Assign Plan", color: "from-[#FF4D82] to-[#FF6095]" },
  ];

  return (
    <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF0049]/3 to-[#FF336F]/3 opacity-40" />
      <CardHeader className="pb-3 relative z-10">
        <CardTitle className="flex items-center gap-2 text-[#FF0049] text-sm">
          <div className="p-1.5 bg-[#FF0049]/10 rounded-md">
            <Settings className="h-4 w-4" />
          </div>
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {actions.map((action, index) => (
            <Link key={index} href={action.href} className="group">
              <Button className={`w-full bg-gradient-to-r ${action.color} hover:opacity-90 text-white text-xs h-10 px-4 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}>
                <action.icon className="w-3.5 h-3.5 mr-2" />
                {action.label}
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export { SystemHealth, QuickActions };
