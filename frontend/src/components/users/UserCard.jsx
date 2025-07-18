"use client";

import { Edit, Trash2, User, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function UserCard({ user, onEdit, onDelete, isDeleting }) {
  const getRoleBadgeColor = (role) => {
    const roleNum = Number(role);
    switch (roleNum) {
      case 2: return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 0:
      case 1: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getRoleText = (role) => {
    const roleNum = Number(role);
    switch (roleNum) {
      case 2: return 'Admin';
      case 0: return 'Student';
      case 1: return 'Employee';
      default: return `Unknown (${role})`;
    }
  };

  return (
    <Card className="bg-[rgba(255,255,255,.06)] border-[rgba(255,255,255,.12)] hover:border-[#FF0049]/40 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-[#FF0049] text-lg mb-1">
              {user.name}
            </CardTitle>
            <Badge className={getRoleBadgeColor(user.role)}>
              {getRoleText(user.role)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onEdit(user)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-[#FF0049]"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={() => onDelete(user.userId)}
              className="h-8 w-8 p-0 text-gray-400 hover:text-red-400"
              disabled={isDeleting}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-[#FF0049]" />
          <span className="text-gray-300 text-sm">{user.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-[#FF0049]" />
          <span className="text-gray-300 text-sm">{user.mobileno}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-[#FF0049]" />
          <span className="text-gray-300 text-sm">User ID: {user.userId}</span>
        </div>
      </CardContent>
    </Card>
  );
}
