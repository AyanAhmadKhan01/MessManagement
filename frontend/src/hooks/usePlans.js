import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { planService } from '@/services/planService';
import { toast } from 'react-toastify';

// Query keys
export const PLAN_KEYS = {
  all: ['plans'],
  lists: () => [...PLAN_KEYS.all, 'list'],
  list: (filters) => [...PLAN_KEYS.lists(), { filters }],
  details: () => [...PLAN_KEYS.all, 'detail'],
  detail: (id) => [...PLAN_KEYS.details(), id],
};

// Get all plans
export const usePlans = () => {
  return useQuery({
    queryKey: PLAN_KEYS.lists(),
    queryFn: async () => {
      const response = await planService.getPlans();
      // Handle different response structures
      if (response.success && Array.isArray(response.data)) {
        return response.data;
      } else if (Array.isArray(response)) {
        return response;
      } else {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Get single plan
export const usePlan = (planId) => {
  return useQuery({
    queryKey: PLAN_KEYS.detail(planId),
    queryFn: () => planService.getPlanById(planId),
    enabled: !!planId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

// Create plan mutation
export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: planService.createPlan,
    onSuccess: (data) => {
      // Invalidate and refetch plans list
      queryClient.invalidateQueries({ queryKey: PLAN_KEYS.lists() });
      
      // Also invalidate dashboard stats
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      
      toast.success('Plan created successfully!', {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(0, 255, 136, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    },
    onError: (error) => {
      toast.error(`Failed to create plan: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    },
  });
};

// Update plan mutation
export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ planId, planData }) => planService.updatePlan(planId, planData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch plans list
      queryClient.invalidateQueries({ queryKey: PLAN_KEYS.lists() });
      
      // Invalidate specific plan detail
      queryClient.invalidateQueries({ queryKey: PLAN_KEYS.detail(variables.planId) });
      
      // Also invalidate dashboard stats
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      
      toast.success('Plan updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(0, 255, 136, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    },
    onError: (error) => {
      toast.error(`Failed to update plan: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    },
  });
};

// Delete plan mutation
export const useDeletePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: planService.deletePlan,
    onSuccess: (data, planId) => {
      // Invalidate and refetch plans list
      queryClient.invalidateQueries({ queryKey: PLAN_KEYS.lists() });
      
      // Remove specific plan from cache
      queryClient.removeQueries({ queryKey: PLAN_KEYS.detail(planId) });
      
      // Also invalidate dashboard stats
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      
      toast.success('Plan deleted successfully!', {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(0, 255, 136, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    },
    onError: (error) => {
      toast.error(`Failed to delete plan: ${error.message}`, {
        position: "top-right",
        autoClose: 5000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    },
  });
};
