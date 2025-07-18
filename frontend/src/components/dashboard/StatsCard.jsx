import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

const StatsCardSkeleton = () => (
  <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)]">
    <CardContent className="p-4">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-6 w-6 rounded-md" />
        <Skeleton className="h-6 w-6 rounded" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-12" />
      </div>
    </CardContent>
  </Card>
);

const StatsCard = ({ title, stat, statLabel, icon: Icon, href, loading }) => {
  if (loading) return <StatsCardSkeleton />;

  return (
    <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)] hover:border-[#FF0049]/40 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF0049]/5 to-transparent opacity-40" />
      <CardContent className="p-4 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="p-1.5 bg-[#FF0049]/10 rounded-md">
            <Icon className="h-5 w-5 text-[#FF0049]" />
          </div>
          <Link href={href}>
            <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-gray-400 hover:text-[#FF0049] transition-colors">
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold text-white">{stat}</p>
          <p className="text-xs text-gray-400 truncate">{statLabel}</p>
          <p className="text-xs font-medium text-[#FF0049]">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
