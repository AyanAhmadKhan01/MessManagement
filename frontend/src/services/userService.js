import { apiService } from './apiService';

export const userService = {
  // Get all users
  async getUsers() {
    return apiService.get('/users/getusers');
  },

  // Get user by email
  async getUserByEmail(email) {
    return apiService.get(`/users/getuser/${email}`);
  },

  // Create new user
  async createUser(userData) {
    return apiService.post('/users/signup', userData);
  },

  // Update user
  async updateUser(userId, userData) {
    return apiService.patch(`/users/update/${userId}`, userData);
  },

  // Delete user
  async deleteUser(email) {
    return apiService.delete(`/users/delete/${email}`);
  },

  // Reset password
  async resetPassword(userData) {
    return apiService.patch('/users/resetpasswd', userData);
  },
};
