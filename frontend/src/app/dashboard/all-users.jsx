"use client";

import { Card } from "@/components/ui/card";
import { useUsers } from "@/hooks/useUsers";
import UserTable from "@/components/users/UserTable";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AllUsersPage() {
  const { data: users, isLoading, error, refetch } = useUsers();

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF0049] to-[#FF336F] bg-clip-text text-transparent">
              All Users
            </h1>
            <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </div>
          
          <Card className="bg-[#1a1a1a] border-red-500/30 p-8">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle className="h-6 w-6" />
              <div>
                <h3 className="font-medium">Error loading users</h3>
                <p className="text-sm text-gray-400 mt-1">{error.message}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#FF0049] to-[#FF336F] bg-clip-text text-transparent">
            All Users
          </h1>
          <Button onClick={handleRefresh} variant="outline" className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
        
        <Card className="bg-[#1a1a1a] border-gray-700 p-6">
          <UserTable 
            users={users} 
            loading={isLoading}
            onView={(user) => console.log('View user:', user)}
            onEdit={(user) => console.log('Edit user:', user)}
            onDelete={(user) => console.log('Delete user:', user)}
          />
        </Card>
      </div>
    </div>
  );
} 