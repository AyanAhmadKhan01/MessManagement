import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2, Eye } from "lucide-react";

const UserTableSkeleton = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-20" />
      </div>
    ))}
  </div>
);

const UserTable = ({ users, loading, onEdit, onDelete, onView }) => {
  if (loading) {
    return <UserTableSkeleton />;
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No users found</p>
      </div>
    );
  }

  const getRoleName = (role) => {
    switch (role) {
      case 2: return 'Admin';
      case 1: return 'Employee';
      case 0: return 'User';
      default: return 'Unknown';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 2: return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 1: return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 0: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="py-3 px-4 text-gray-300 font-medium">Name</th>
            <th className="py-3 px-4 text-gray-300 font-medium">Email</th>
            <th className="py-3 px-4 text-gray-300 font-medium">Mobile</th>
            <th className="py-3 px-4 text-gray-300 font-medium">Role</th>
            <th className="py-3 px-4 text-gray-300 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
              <td className="py-3 px-4 text-white">{user.name}</td>
              <td className="py-3 px-4 text-gray-300">{user.email}</td>
              <td className="py-3 px-4 text-gray-300">{user.mobileno}</td>
              <td className="py-3 px-4">
                <Badge className={getRoleColor(user.role)}>
                  {getRoleName(user.role)}
                </Badge>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView?.(user)}
                    className="hover:bg-blue-500/20 hover:text-blue-400"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit?.(user)}
                    className="hover:bg-yellow-500/20 hover:text-yellow-400"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete?.(user)}
                    className="hover:bg-red-500/20 hover:text-red-400"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
