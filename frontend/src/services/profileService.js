import { apiService } from './apiService';
import { authService } from '@/utils/authService';

export const profileService = {
  // Get current user profile
  async getProfile() {
    // Add current user ID to headers for backend authentication
    const currentUser = authService.getCurrentUser();
    if (!currentUser?.userId) {
      throw new Error('User authentication required');
    }

    const config = {
      headers: {
        'user-id': currentUser.userId
      }
    };

    return apiService.get('/users/profile', config);
  },

  // Update profile information
  async updateProfile(profileData) {
    const currentUser = authService.getCurrentUser();
    if (!currentUser?.userId) {
      throw new Error('User authentication required');
    }

    const config = {
      headers: {
        'user-id': currentUser.userId
      }
    };

    return apiService.patch('/users/profile', profileData, config);
  },

  // Change password
  async changePassword(passwordData) {
    const currentUser = authService.getCurrentUser();
    if (!currentUser?.userId) {
      throw new Error('User authentication required');
    }

    const config = {
      headers: {
        'user-id': currentUser.userId
      }
    };

    return apiService.patch('/users/change-password', passwordData, config);
  },

  // Update notification preferences
  async updateNotifications(notificationData) {
    const currentUser = authService.getCurrentUser();
    if (!currentUser?.userId) {
      throw new Error('User authentication required');
    }

    const config = {
      headers: {
        'user-id': currentUser.userId
      }
    };

    return apiService.patch('/users/notifications', notificationData, config);
  },

  // Upload profile picture
  async uploadProfilePicture(formData) {
    const currentUser = authService.getCurrentUser();
    if (!currentUser?.userId) {
      throw new Error('User authentication required');
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        'user-id': currentUser.userId
      }
    };

    return apiService.post('/users/profile/picture', formData, config);
  },

  // Delete profile picture
  async deleteProfilePicture() {
    const currentUser = authService.getCurrentUser();
    if (!currentUser?.userId) {
      throw new Error('User authentication required');
    }

    const config = {
      headers: {
        'user-id': currentUser.userId
      }
    };

    return apiService.delete('/users/profile/picture', config);
  },
};
