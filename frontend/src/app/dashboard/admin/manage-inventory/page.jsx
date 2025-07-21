"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import withAuth from "@/components/withAuth";
import { 
  useInventory, 
  useInventoryStats, 
  useCreateInventory, 
  useUpdateInventory, 
  useDeleteInventory 
} from "@/hooks/useInventory";
import { InventoryStats } from "@/components/inventory/InventoryStats";
import { CreateInventoryDialog } from "@/components/inventory/CreateInventoryDialog";
import { EditInventoryDialog } from "@/components/inventory/EditInventoryDialog";
import { InventoryTabs } from "@/components/inventory/InventoryTabs";


function ManageInventory() {
  const { data: inventory = [], isLoading, error } = useInventory();
  const { data: stats, isLoading: statsLoading } = useInventoryStats();
  const createMutation = useCreateInventory();
  const updateMutation = useUpdateInventory();
  const deleteMutation = useDeleteInventory();

  const [activeTab, setActiveTab] = useState("all");
  const [editingItem, setEditingItem] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (inventoryId) => {
    if (window.confirm("Are you sure you want to delete this inventory item?")) {
      deleteMutation.mutate(inventoryId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading inventory...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-400 mb-4">Error loading inventory</p>
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
          <h1 className="text-4xl font-bold text-[#FF0049] mb-2">Manage Inventory</h1>
          <p className="text-gray-400">Track and manage inventory items across all stores</p>
        </div>
        <CreateInventoryDialog createMutation={createMutation} />
      </div>

      {/* Stats */}
      <InventoryStats stats={stats} isLoading={statsLoading} />

      {/* Inventory Tabs */}
      <InventoryTabs
        inventory={inventory}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isDeleting={deleteMutation.isPending}
      />

      {/* Edit Dialog */}
      <EditInventoryDialog
        item={editingItem}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEdit}
        updateMutation={updateMutation}
      />
    </div>
  );
}

export default withAuth(ManageInventory);
