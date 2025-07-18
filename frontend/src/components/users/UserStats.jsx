"use client";

import { User, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function UserStats({ users, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)]">
            <CardContent className="p-4">
              <div className="animate-pulse flex items-center gap-3">
                <div className="p-2 bg-gray-700 rounded-lg h-9 w-9"></div>
                <div>
                  <div className="h-8 bg-gray-700 rounded w-12 mb-1"></div>
                  <div className="h-4 bg-gray-700 rounded w-20"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalUsers = users.length;
  const adminUsers = users.filter(u => Number(u.role) === 2).length;
  const regularUsers = users.filter(u => Number(u.role) === 0 || Number(u.role) === 1).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)]">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FF0049]/10 rounded-lg">
              <User className="h-5 w-5 text-[#FF0049]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{totalUsers}</p>
              <p className="text-gray-400 text-sm">Total Users</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)]">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg">
              <Shield className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{adminUsers}</p>
              <p className="text-gray-400 text-sm">Admins</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)]">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <User className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{regularUsers}</p>
              <p className="text-gray-400 text-sm">Regular Users</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
