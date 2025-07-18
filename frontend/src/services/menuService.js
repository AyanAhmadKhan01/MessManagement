import { apiService } from './apiService';

export const menuService = {
  // Get all menus
  getMenus: async () => {
    return apiService.get('/menu');
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
