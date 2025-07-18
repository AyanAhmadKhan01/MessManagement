import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { inventoryService } from '@/services/inventoryService';
import { toast } from 'react-toastify';

// Custom hooks for Inventory Management

// Get all inventory items
export const useInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: inventoryService.getAllInventory,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get inventory by store type
export const useInventoryByStore = (storeType) => {
  return useQuery({
    queryKey: ['inventory', 'store', storeType],
    queryFn: () => inventoryService.getInventoryByStore(storeType),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!storeType,
  });
};

// Get inventory by ID
export const useInventoryById = (inventoryId) => {
  return useQuery({
    queryKey: ['inventory', inventoryId],
    queryFn: () => inventoryService.getInventoryById(inventoryId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!inventoryId,
  });
};

// Get inventory statistics
export const useInventoryStats = () => {
  return useQuery({
    queryKey: ['inventory-stats'],
    queryFn: inventoryService.getInventoryStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create inventory item
export const useCreateInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inventoryService.createInventory,
    onSuccess: () => {
      // Invalidate and refetch inventory queries
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['inventory-stats'] });
      toast.success('Inventory item created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create inventory item');
    },
  });
};

// Update inventory item
export const useUpdateInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inventoryService.updateInventory,
    onSuccess: () => {
      // Invalidate and refetch inventory queries
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['inventory-stats'] });
      toast.success('Inventory item updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update inventory item');
    },
  });
};

// Delete inventory item
export const useDeleteInventory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: inventoryService.deleteInventory,
    onSuccess: () => {
      // Invalidate and refetch inventory queries
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['inventory-stats'] });
      toast.success('Inventory item deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete inventory item');
    },
  });
};
