import { apiService } from './apiService';

export const menuService = {
  // Get all menus
  getMenus: async () => {
    return apiService.get('/menu');
  },

  // Get today's menu
  getTodayMenu: async () => {
    const today = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const todayName = days[today.getDay()];
    
    const response = await apiService.get('/menu');
    
    // Handle different response structures
    let menus = [];
    if (response.success && Array.isArray(response.data)) {
      menus = response.data;
    } else if (Array.isArray(response)) {
      menus = response;
    }
    
    const todayMenu = menus.find(menu => menu.menu_day === todayName);
    return todayMenu || null;
  },

  // Get menu by ID
  getMenuById: async (menuId) => {
    return apiService.get(`/menu/${menuId}`);
  },

  // Create new menu
  createMenu: async (menuData) => {
    return apiService.post('/menu', menuData);
  },

  // Update menu
  updateMenu: async (menuId, menuData) => {
    return apiService.patch(`/menu/${menuId}`, menuData);
  },

  // Delete menu
  deleteMenu: async (menuId) => {
    return apiService.delete(`/menu/${menuId}`);
  },
};
