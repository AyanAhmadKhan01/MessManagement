"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import withAuth from "@/components/withAuth";
import { useUsers, useCreateUser, useUpdateUser, useDeleteUser } from "@/hooks/useUsers";
import { UserStats } from "@/components/users/UserStats";
import { CreateUserDialog } from "@/components/users/CreateUserDialog";
import { EditUserDialog } from "@/components/users/EditUserDialog";
import { UserCard } from "@/components/users/UserCard";

function ManageUsers() {
  const { data: users = [], isLoading, error } = useUsers();
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();

  const [editingUser, setEditingUser] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditDialogOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-400 mb-4">Error loading users</p>
          <p className="text-gray-400">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-[#FF0049] mb-2">Manage Users</h1>
          <p className="text-gray-400">Create and manage user accounts</p>
        </div>
        <CreateUserDialog createMutation={createUserMutation} />
      </div>

      {/* Stats */}
      <UserStats users={users} isLoading={isLoading} />

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard
            key={user.userId}
            user={user}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            isDeleting={deleteUserMutation.isPending}
          />
        ))}
      </div>

      {/* Empty State */}
      {users.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">No users found</p>
          <p className="text-gray-500 mb-6">Create your first user to get started</p>
        </div>
      )}

      {/* Edit Dialog */}
      <EditUserDialog
        user={editingUser}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEdit}
        updateMutation={updateUserMutation}
      />
    </div>
  );
}

export default withAuth(ManageUsers);
