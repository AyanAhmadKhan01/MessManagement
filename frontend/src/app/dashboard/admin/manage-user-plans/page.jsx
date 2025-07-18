"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import withAuth from "@/components/withAuth";
import { 
  useUserPlans, 
  useUserPlanStats, 
  useCreateUserPlan, 
  useUpdateUserPlan, 
  useDeleteUserPlan 
} from "@/hooks/useUserPlans";
import { usePlans } from "@/hooks/usePlans";
import { useUsers } from "@/hooks/useUsers";
import { UserPlanStats } from "@/components/userplans/UserPlanStats";
import { CreateUserPlanDialog } from "@/components/userplans/CreateUserPlanDialog";
import { EditUserPlanDialog } from "@/components/userplans/EditUserPlanDialog";
import { UserPlanCard } from "@/components/userplans/UserPlanCard";

function ManageUserPlans() {
  const { data: userPlans = [], isLoading, error } = useUserPlans();
  const { data: stats, isLoading: statsLoading } = useUserPlanStats();
  const { data: users = [] } = useUsers();
  const { data: plans = [] } = usePlans();
  
  const createMutation = useCreateUserPlan();
  const updateMutation = useUpdateUserPlan();
  const deleteMutation = useDeleteUserPlan();

  const [editingUserPlan, setEditingUserPlan] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (userPlan) => {
    setEditingUserPlan(userPlan);
    setIsEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditDialogOpen(false);
    setEditingUserPlan(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user plan?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading user plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-400 mb-4">Error loading user plans</p>
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
          <h1 className="text-4xl font-bold text-[#FF0049] mb-2">Manage User Plans</h1>
          <p className="text-gray-400">Assign and manage meal plans for users</p>
        </div>
        <CreateUserPlanDialog 
          createMutation={createMutation} 
          users={users}
          plans={plans}
        />
      </div>

      {/* Stats */}
      <UserPlanStats stats={stats} isLoading={statsLoading} />

      {/* User Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPlans.map((userPlan) => (
          <UserPlanCard
            key={userPlan._id}
            userPlan={userPlan}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDeleting={deleteMutation.isPending}
            users={users}
            plans={plans}
          />
        ))}
      </div>

      {/* Empty State */}
      {userPlans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">No user plans found</p>
          <p className="text-gray-500 mb-6">Assign your first plan to get started</p>
        </div>
      )}

      {/* Edit Dialog */}
      <EditUserPlanDialog
        userPlan={editingUserPlan}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEdit}
        updateMutation={updateMutation}
        users={users}
        plans={plans}
      />
    </div>
  );
}

export default withAuth(ManageUserPlans);
