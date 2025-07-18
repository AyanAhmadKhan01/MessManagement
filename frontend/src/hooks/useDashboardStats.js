import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/apiService';

// Fetch all dashboard stats in parallel
const fetchDashboardStats = async () => {
  try {
    const [usersRes, plansRes, menusRes, userPlansRes] = await Promise.allSettled([
      apiService.get('/users/getusers'),
      apiService.get('/plan/plans'),
      apiService.get('/menu'),
      apiService.get('/userplan'),
    ]);

    const users = usersRes.status === 'fulfilled' ? usersRes.value : [];
    const plans = plansRes.status === 'fulfilled' ? 
      (Array.isArray(plansRes.value) ? plansRes.value : []) : [];
    const menus = menusRes.status === 'fulfilled' ? 
      (menusRes.value.success ? menusRes.value.data : []) : [];
    const userPlans = userPlansRes.status === 'fulfilled' ? 
      (userPlansRes.value.success ? userPlansRes.value.data : []) : [];

    return {
      users,
      plans,
      menus,
      userPlans,
      stats: {
        totalUsers: users.length,
        totalPlans: plans.length,
        totalMenus: menus.length,
        totalUserPlans: userPlans.length,
        totalInventoryItems: 0, // Will be added when inventory API is ready
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// Custom hook for dashboard data
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
    staleTime: 2 * 60 * 1000, // 2 minutes
    cacheTime: 5 * 60 * 1000, // 5 minutes
  });
};
