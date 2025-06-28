import React from "react";
import { Card } from "@/components/ui/card";
import Sidebar from "./dashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Card className="w-64 min-h-screen rounded-none shadow-lg bg-white p-6">
        <Sidebar variant="admin" />
      </Card>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
} 