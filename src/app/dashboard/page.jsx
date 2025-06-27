import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

import { MdPeople, MdAttachMoney, MdCheckCircle } from "react-icons/md";

const stats = [
  {
    label: "Total Users",
    value: "1,245",
    change: "+5.2%",
    icon: <MdPeople className="text-blue-600" size={28} />,
  },
  {
    label: "Profit (₹)",
    value: "₹32,500",
    change: "+2.1%",
    icon: <MdAttachMoney className="text-green-600" size={28} />,
  },
  {
    label: "Attendance",
    value: "98.7%",
    change: "+0.3%",
    icon: <MdCheckCircle className="text-emerald-600" size={28} />,
  },
];

const users = [
  { name: "Jani Jasmin", email: "jani@email.com", status: "Active" },
  { name: "Admin User", email: "admin@email.com", status: "Active" },
  { name: "Test User", email: "test@email.com", status: "Inactive" },
];

export default function DashboardPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
        <p className="text-gray-500">Quick overview & recent activity</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 flex  flex-col gap-2 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              {stat.icon}
              <span className="text-lg font-semibold text-gray-700">{stat.label}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-green-600 font-medium">{stat.change}</div>
          </Card>
        ))}
      </div>
      <Card className="p-6 shadow-sm ">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Recent Users</h2>
         <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={'border-1 border-[rgba(0,0,0,.07)]'}>Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className={''}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user.email} className="border-b last:border-0">
                  <td className="py-2 px-4 font-medium text-gray-800 flex items-center gap-2">
                    <Skeleton className="w-8 h-8 rounded-full bg-gray-200" />
                    {user.name}
                  </td>
                  <td className="py-2 px-4 text-gray-600">{user.email}</td>
                  <td className="py-2 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>{user.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 