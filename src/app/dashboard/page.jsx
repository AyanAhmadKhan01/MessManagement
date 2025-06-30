
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Activity, ChartNoAxesCombined, Eye } from "lucide-react";
import { DashboardCharts } from "@/components/dashboard/dashboardCharts";
import { Badge } from "@/components/ui/badge";
import { DashboardDataTable } from "@/components/dashboard/dashboardDataTable";
import { Separator } from "@/components/ui/separator";


const users = [
  { name: "Jani Jasmin", email: "jani@email.com", status: "Active" },
  { name: "Admin User", email: "admin@email.com", status: "Active" },
  { name: "Test User", email: "test@email.com", status: "Inactive" },
];

export default function DashboardPage() {
  return (
    <>
 <div className="flex items-center">
    <h1 className="text-4xl font-bold mb-4 mt-3 ml-6">Dashboard</h1>
     <Separator
              orientation="vertical"
              className="ml-9 data-[orientation=vertical]:h-18"
            />
            </div>
    <Separator
              orientation="horizontal"
              className="mr-3 mb-9 data-[orientation=vertical]:h-9"
            />
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(330px,_1fr))] gap-2 mx-4">
      <Card>
        <CardHeader className={'flex justify-between'}>
          <CardTitle>Total Revenue</CardTitle>
          <DollarSign  color="#FF0049"/>
           </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-semibold">$45,231.89</h2>
            <p className="text-sm text-[#FF0049]">+20.1% from last month</p>
          </CardContent>
      </Card>
      <Card>
        <CardHeader className={'flex justify-between'}>
          <CardTitle>Subscriptions</CardTitle>
          <Users  color="#FF0049"/>
           </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-semibold">+2350</h2>
            <p className="text-sm text-[#FF0049]">+180.1% from last month</p>
          </CardContent>
      </Card>
      <Card>
        <CardHeader className={'flex justify-between'}>
          <CardTitle>Sales</CardTitle>
          < ChartNoAxesCombined  color="#FF0049"/>
           </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-semibold">+12,234</h2>
            <p className="text-sm text-[#FF0049]">+19% from last month</p>
          </CardContent>
      </Card>
      <Card>
        <CardHeader className={'flex justify-between'}>
          <CardTitle>Active Now</CardTitle>
          <Activity  color="#FF0049"/>
           </CardHeader>
          <CardContent>
            <h2 className="text-2xl font-semibold">+573</h2>
            <p className="text-sm text-[#FF0049]">+201 since last hour</p>
          </CardContent>
      </Card>
      </div>
      <div className="flex flex-wrap xl:flex-nowrap gap-3">
<div className=" lg:w-[50%] w-[95%] bg-[rgba(255,255,255,.04)] border-1 border-[rgba(255,255,255,.09)] p-3 rounded-2xl mt-5 ml-4">
  <div>
    <Badge  variant={'outline'}>
      <Eye className="text-[rgba(255,255,255,1)]"/>
  <h1 className=" text-[rgba(255,255,255,.5)]">Live User Update</h1>
  </Badge>
  </div>
<DashboardCharts />
</div>
<div className="lg:w-[50%] w-[95%] mt-5 ml-4 xl:ml-0 mr-3 mb-10 bg-[rgba(255,255,255,.04)] border-1 border-[rgba(255,255,255,.09)] p-3 rounded-2xl">
<DashboardDataTable />
</div>
</div>
    </>   
  )
} 