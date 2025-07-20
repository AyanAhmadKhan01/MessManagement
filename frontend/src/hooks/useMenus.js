import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { menuService } from '@/services/menuService';
import { toast } from 'react-toastify';

// Query keys
export const MENU_KEYS = {
  all: ['menus'],
  lists: () => [...MENU_KEYS.all, 'list'],
  list: (filters) => [...MENU_KEYS.lists(), { filters }],
  details: () => [...MENU_KEYS.all, 'detail'],
  detail: (id) => [...MENU_KEYS.details(), id],
  today: () => [...MENU_KEYS.all, 'today'],
};

// Get all menus
export const useMenus = () => {
  return useQuery({
    queryKey: MENU_KEYS.lists(),
    queryFn: async () => {
      const response = await menuService.getMenus();
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

// Get single menu
export const useMenu = (menuId) => {
  return useQuery({
    queryKey: MENU_KEYS.detail(menuId),
    queryFn: () => menuService.getMenuById(menuId),
    enabled: !!menuId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
};

// Get today's menu
export const useTodayMenu = () => {
  return useQuery({
    queryKey: MENU_KEYS.today(),
    queryFn: menuService.getTodayMenu,
    staleTime: 2 * 60 * 1000, // 2 minutes (refresh more frequently for today's menu)
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Create menu mutation
export const useCreateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: menuService.createMenu,
    onSuccess: (data) => {
      // Invalidate and refetch menus list
      queryClient.invalidateQueries({ queryKey: MENU_KEYS.lists() });
      
      // Invalidate today's menu
      queryClient.invalidateQueries({ queryKey: MENU_KEYS.today() });
      
      // Also invalidate dashboard stats
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      
      toast.success('Menu created successfully!', {
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
      toast.error(`Failed to create menu: ${error.message}`, {
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

// Update menu mutation
export const useUpdateMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ menuId, menuData }) => menuService.updateMenu(menuId, menuData),
    onSuccess: (data, variables) => {
      // Invalidate and refetch menus list
      queryClient.invalidateQueries({ queryKey: MENU_KEYS.lists() });
      
      // Invalidate specific menu detail
      queryClient.invalidateQueries({ queryKey: MENU_KEYS.detail(variables.menuId) });
      
      // Invalidate today's menu
      queryClient.invalidateQueries({ queryKey: MENU_KEYS.today() });
      
      // Also invalidate dashboard stats
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      
      toast.success('Menu updated successfully!', {
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
      toast.error(`Failed to update menu: ${error.message}`, {
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

// Delete menu mutation
export const useDeleteMenu = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: menuService.deleteMenu,
    onSuccess: (data, menuId) => {
      // Invalidate and refetch menus list
      queryClient.invalidateQueries({ queryKey: MENU_KEYS.lists() });
      
      // Remove specific menu from cache
      queryClient.removeQueries({ queryKey: MENU_KEYS.detail(menuId) });
      
      // Invalidate today's menu
      queryClient.invalidateQueries({ queryKey: MENU_KEYS.today() });
      
      // Also invalidate dashboard stats
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      
      toast.success('Menu deleted successfully!', {
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
      toast.error(`Failed to delete menu: ${error.message}`, {
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
