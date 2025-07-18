import { apiService } from './apiService';

export const planService = {
  // Get all plans
  getPlans: async () => {
    return apiService.get('/plan/plans');
  },

  // Get plan by ID
  getPlanById: async (planId) => {
    return apiService.get(`/plan/plans/${planId}`);
  },

  // Create new plan
  createPlan: async (planData) => {
    return apiService.post('/plan/plans', planData);
  },

  // Update plan
  updatePlan: async (planId, planData) => {
    return apiService.patch(`/plan/plans/${planId}`, planData);
  },

  // Delete plan
  deletePlan: async (planId) => {
    return apiService.delete(`/plan/plans/${planId}`);
  },
};
