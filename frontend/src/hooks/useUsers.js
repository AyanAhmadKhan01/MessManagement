import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@/services/userService';
import { toast } from 'react-toastify';

// Query keys
export const userKeys = {
  all: ['users'],
  lists: () => [...userKeys.all, 'list'],
  list: (filters) => [...userKeys.lists(), { filters }],
  details: () => [...userKeys.all, 'detail'],
  detail: (id) => [...userKeys.details(), id],
};

// Get all users
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: userService.getUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get user by email
export const useUserByEmail = (email) => {
  return useQuery({
    queryKey: userKeys.detail(email),
    queryFn: () => userService.getUserByEmail(email),
    enabled: !!email,
  });
};

// Create user mutation
export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success('User created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create user');
    },
  });
};

// Update user mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, userData }) => userService.updateUser(userId, userData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success('User updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update user');
    },
  });
};

// Delete user mutation
export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      toast.success('User deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete user');
    },
  });
};
