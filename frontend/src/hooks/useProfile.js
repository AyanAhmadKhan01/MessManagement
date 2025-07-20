import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '@/services/profileService';
import { authService } from '@/utils/authService';
import { toast } from 'react-toastify';

// Query keys
export const profileKeys = {
  all: ['profile'],
  user: (userId) => [...profileKeys.all, 'user', userId],
  details: (userId) => [...profileKeys.user(userId), 'details'],
  notifications: (userId) => [...profileKeys.user(userId), 'notifications'],
};

// Get current user profile
export const useProfile = () => {
  const currentUser = authService.getCurrentUser();
  
  return useQuery({
    queryKey: profileKeys.details(currentUser?.id),
    queryFn: profileService.getProfile,
    enabled: !!currentUser?.userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (data) => data || currentUser || {},
  });
};

// Update profile mutation
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const currentUser = authService.getCurrentUser();

  return useMutation({
    mutationFn: profileService.updateProfile,
    onSuccess: (response) => {
      // Update localStorage with new data
      if (response?.data) {
        authService.updateCurrentUser(response.data);
      }
      
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: profileKeys.user(currentUser?.id) });
      
      toast.success('Profile updated successfully!', {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    },
    onError: (error) => {
      console.error('Profile update error:', error);
      
      toast.error(error.message || 'Failed to update profile', {
        position: "top-right",
        autoClose: 3000,
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

// Change password mutation
export const useChangePassword = () => {
  return useMutation({
    mutationFn: profileService.changePassword,
    onSuccess: () => {
      toast.success('Password changed successfully!', {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    },
    onError: (error) => {
      console.error('Password change error:', error);
      
      toast.error(error.message || 'Failed to change password', {
        position: "top-right",
        autoClose: 3000,
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

// Update notifications mutation
export const useUpdateNotifications = () => {
  return useMutation({
    mutationFn: profileService.updateNotifications,
    onSuccess: () => {
      toast.success('Notification preferences saved!', {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    },
    onError: (error) => {
      console.error('Notification update error:', error);
      
      toast.error(error.message || 'Failed to save preferences', {
        position: "top-right",
        autoClose: 3000,
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

// Upload profile picture mutation
export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient();
  const currentUser = authService.getCurrentUser();

  return useMutation({
    mutationFn: async (file) => {
      // For now, simulate upload since backend endpoint doesn't exist yet
      // In production, this would call profileService.uploadProfilePicture
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a fake URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      
      // Update user in localStorage
      const updatedUser = { ...currentUser, profilePicture: imageUrl };
      authService.updateCurrentUser(updatedUser);
      
      return { data: { imageUrl } };
    },
    onSuccess: () => {
      // Invalidate profile data to trigger refetch
      queryClient.invalidateQueries({ queryKey: profileKeys.user(currentUser?.id) });
      
      toast.success('Profile picture uploaded successfully!', {
        position: "top-right",
        autoClose: 3000,
        style: {
          background: 'rgba(15, 15, 15, 0.9)',
          border: '1px solid rgba(255, 0, 73, 0.3)',
          color: '#ffffff',
          backdropFilter: 'blur(10px)',
        },
      });
    },
    onError: (error) => {
      console.error('Profile picture upload error:', error);
      
      toast.error(error.message || 'Failed to upload profile picture', {
        position: "top-right",
        autoClose: 3000,
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
