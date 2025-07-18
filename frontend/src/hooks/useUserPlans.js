import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userPlanService } from '@/services/userPlanService';
import { toast } from 'react-toastify';

// Custom hooks for User Plan Management

// Get all user plans
export const useUserPlans = () => {
  return useQuery({
    queryKey: ['userPlans'],
    queryFn: userPlanService.getAllUserPlans,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get user plan by ID
export const useUserPlanById = (id) => {
  return useQuery({
    queryKey: ['userPlan', id],
    queryFn: () => userPlanService.getUserPlanById(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: !!id,
  });
};

// Get users for dropdown
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userPlanService.getUsers,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get plans for dropdown
export const usePlans = () => {
  return useQuery({
    queryKey: ['plans'],
    queryFn: userPlanService.getPlans,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get user plan statistics
export const useUserPlanStats = () => {
  return useQuery({
    queryKey: ['userPlan-stats'],
    queryFn: userPlanService.getUserPlanStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Create user plan
export const useCreateUserPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userPlanService.createUserPlan,
    onSuccess: () => {
      // Invalidate and refetch user plan queries
      queryClient.invalidateQueries({ queryKey: ['userPlans'] });
      queryClient.invalidateQueries({ queryKey: ['userPlan-stats'] });
      toast.success('User plan created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create user plan');
    },
  });
};

// Update user plan
export const useUpdateUserPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userPlanService.updateUserPlan,
    onSuccess: () => {
      // Invalidate and refetch user plan queries
      queryClient.invalidateQueries({ queryKey: ['userPlans'] });
      queryClient.invalidateQueries({ queryKey: ['userPlan-stats'] });
      toast.success('User plan updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update user plan');
    },
  });
};

// Delete user plan
export const useDeleteUserPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userPlanService.deleteUserPlan,
    onSuccess: () => {
      // Invalidate and refetch user plan queries
      queryClient.invalidateQueries({ queryKey: ['userPlans'] });
      queryClient.invalidateQueries({ queryKey: ['userPlan-stats'] });
      toast.success('User plan deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete user plan');
    },
  });
};
