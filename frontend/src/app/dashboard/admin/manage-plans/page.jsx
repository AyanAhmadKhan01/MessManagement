"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import withAuth from "@/components/withAuth";
import { usePlans, useCreatePlan, useUpdatePlan, useDeletePlan } from "@/hooks/usePlans";
import { PlanStats } from "@/components/plans/PlanStats";
import { CreatePlanDialog } from "@/components/plans/CreatePlanDialog";
import { EditPlanDialog } from "@/components/plans/EditPlanDialog";
import { PlanCard } from "@/components/plans/PlanCard";

function ManagePlans() {
  const { data: plans = [], isLoading, error } = usePlans();
  const createPlanMutation = useCreatePlan();
  const updatePlanMutation = useUpdatePlan();
  const deletePlanMutation = useDeletePlan();

  const [editingPlan, setEditingPlan] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setIsEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditDialogOpen(false);
    setEditingPlan(null);
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      deletePlanMutation.mutate(planId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading plans...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-400 mb-4">Error loading plans</p>
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
          <h1 className="text-4xl font-bold text-[#FF0049] mb-2">Manage Plans</h1>
          <p className="text-gray-400">Create and manage meal plans</p>
        </div>
        <CreatePlanDialog createMutation={createPlanMutation} />
      </div>

      {/* Stats */}
      <PlanStats plans={plans} isLoading={isLoading} />

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <PlanCard
            key={plan.planId}
            plan={plan}
            onEdit={handleEditPlan}
            onDelete={handleDeletePlan}
            isDeleting={deletePlanMutation.isPending}
          />
        ))}
      </div>

      {/* Empty State */}
      {plans.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg mb-4">No plans found</p>
          <p className="text-gray-500 mb-6">Create your first meal plan to get started</p>
        </div>
      )}

      {/* Edit Dialog */}
      <EditPlanDialog
        plan={editingPlan}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEdit}
        updateMutation={updatePlanMutation}
      />
    </div>
  );
}

export default withAuth(ManagePlans);
