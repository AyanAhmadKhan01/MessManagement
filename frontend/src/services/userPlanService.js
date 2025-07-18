import { USERPLAN_BASE } from "@/utils/userplanBaseURL";
import { BASE } from "@/utils/baseURL";

// API Service for User Plan Management
export const userPlanService = {
  // Get all user plans
  getAllUserPlans: async () => {
    const response = await fetch(`${USERPLAN_BASE}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch user plans');
    }
    
    return data.data || [];
  },

  // Get user plan by ID
  getUserPlanById: async (id) => {
    const response = await fetch(`${USERPLAN_BASE}/${id}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch user plan');
    }
    
    return data.data;
  },

  // Get users list (for dropdown)
  getUsers: async () => {
    const response = await fetch(`${BASE}/users`);
    const data = await response.json();
    
    // Backend returns users directly, not in {success, data} format
    return data || [];
  },

  // Get plans list (for dropdown)
  getPlans: async () => {
    const response = await fetch(`${BASE}/plan/plans`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch plans');
    }
    
    return data.data || [];
  },

  // Create new user plan
  createUserPlan: async (userPlanData) => {
    const response = await fetch(`${USERPLAN_BASE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userPlanData),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to create user plan');
    }
    
    return data.data;
  },

  // Update user plan
  updateUserPlan: async ({ id, userPlanData }) => {
    const response = await fetch(`${USERPLAN_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userPlanData),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to update user plan');
    }
    
    return data.data;
  },

  // Delete user plan
  deleteUserPlan: async (id) => {
    const response = await fetch(`${USERPLAN_BASE}/${id}`, {
      method: 'DELETE',
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to delete user plan');
    }
    
    return data.data;
  },

  // Get user plan statistics
  getUserPlanStats: async () => {
    const userPlans = await userPlanService.getAllUserPlans();
    
    const stats = {
      totalUserPlans: userPlans.length,
      activeUserPlans: userPlans.filter(up => {
        const endDate = new Date(up.end_date);
        return endDate >= new Date();
      }).length,
      expiredUserPlans: userPlans.filter(up => {
        const endDate = new Date(up.end_date);
        return endDate < new Date();
      }).length,
      recentUserPlans: userPlans.filter(up => {
        const startDate = new Date(up.start_date);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return startDate >= weekAgo;
      }).length,
      averageDuration: userPlans.length > 0 
        ? Math.round(userPlans.reduce((sum, up) => {
            const start = new Date(up.start_date);
            const end = new Date(up.end_date);
            return sum + (end - start) / (1000 * 60 * 60 * 24);
          }, 0) / userPlans.length)
        : 0,
    };
    
    return stats;
  }
};
