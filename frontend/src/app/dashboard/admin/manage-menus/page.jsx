"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import withAuth from "@/components/withAuth";
import { useMenus, useCreateMenu, useUpdateMenu, useDeleteMenu } from "@/hooks/useMenus";
import { MenuStats } from "@/components/menus/MenuStats";
import { CreateMenuDialog } from "@/components/menus/CreateMenuDialog";
import { EditMenuDialog } from "@/components/menus/EditMenuDialog";
import { MenuTabs } from "@/components/menus/MenuTabs";

function ManageMenus() {
  const { data: menusData, isLoading, error } = useMenus();
  const createMenuMutation = useCreateMenu();
  const updateMenuMutation = useUpdateMenu();
  const deleteMenuMutation = useDeleteMenu();

  // Ensure menus is always an array
  const menus = Array.isArray(menusData) ? menusData : [];

  const [editingMenu, setEditingMenu] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditMenu = (menu) => {
    setEditingMenu(menu);
    setIsEditDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditDialogOpen(false);
    setEditingMenu(null);
  };

  const handleDeleteMenu = (menuId) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      deleteMenuMutation.mutate(menuId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-12 w-12 text-[#FF0049] mx-auto mb-4" />
          <p className="text-lg text-gray-400">Loading menus...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-400 mb-4">Error loading menus</p>
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
          <h1 className="text-4xl font-bold text-[#FF0049] mb-2">Manage Menus</h1>
          <p className="text-gray-400">Create and manage daily meal menus</p>
        </div>
        <CreateMenuDialog createMutation={createMenuMutation} />
      </div>

      {/* Stats */}
      <MenuStats menus={menus} isLoading={isLoading} />

      {/* Menu Tabs */}
      <MenuTabs 
        menus={menus}
        onEdit={handleEditMenu}
        onDelete={handleDeleteMenu}
        isDeleting={deleteMenuMutation.isPending}
      />

      {/* Edit Dialog */}
      <EditMenuDialog
        menu={editingMenu}
        isOpen={isEditDialogOpen}
        onClose={handleCloseEdit}
        updateMutation={updateMenuMutation}
      />
    </div>
  );
}

export default withAuth(ManageMenus);
