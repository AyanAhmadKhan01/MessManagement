import { BASE } from './baseURL.js';

// Auth service for handling authentication
export const authService = {
    // Login user
    async login(credentials) {
        try {
            const response = await fetch(`${BASE}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (data.success) {
                // Store token in localStorage
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                return { success: true, data };
            } else {
                return { success: false, error: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error occurred' };
        }
    },

    // Register user
    async register(userData) {
        try {
            const response = await fetch(`${BASE}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (data.success) {
                // Store token in localStorage
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                return { success: true, data };
            } else {
                return { success: false, error: data.message };
            }
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, error: 'Network error occurred' };
        }
    },

    // Logout user
    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
    },

    // Get current user from localStorage
    getCurrentUser() {
        try {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error parsing user from localStorage:', error);
            return null;
        }
    },

    // Get auth token
    getToken() {
        return localStorage.getItem('authToken');
    },

    // Check if user is authenticated
    isAuthenticated() {
        const token = this.getToken();
        const user = this.getCurrentUser();
        return !!(token && user);
    },

    // Check if user is admin (role 2)
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 2;
    },

    // Check if user is employee (role 1)
    isEmployee() {
        const user = this.getCurrentUser();
        return user && user.role === 1;
    },

    // Check if user is student (role 0)
    isStudent() {
        const user = this.getCurrentUser();
        return user && user.role === 0;
    },

    // Get role name
    getRoleName() {
        const user = this.getCurrentUser();
        if (!user) return null;
        
        switch (user.role) {
            case 2: return 'Admin';
            case 1: return 'Employee';
            case 0: return 'Student';
            default: return 'Unknown';
        }
    },

    // Get user dashboard route based on role
    getDashboardRoute() {
        const user = this.getCurrentUser();
        if (!user) return '/login';
        
        switch (user.role) {
            case 2: return '/dashboard/admin';
            case 1: return '/dashboard';
            case 0: return '/dashboard';
            default: return '/dashboard';
        }
    },

    // Make authenticated API requests
    async authenticatedFetch(url, options = {}) {
        const token = this.getToken();
        
        if (!token) {
            throw new Error('No authentication token available');
        }

        const defaultHeaders = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };

        const config = {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            
            // If token is expired or invalid, logout user
            if (response.status === 401 || response.status === 403) {
                this.logout();
                window.location.href = '/login';
                return null;
            }

            return response;
        } catch (error) {
            console.error('Authenticated fetch error:', error);
            throw error;
        }
    },

    // Update current user data
    updateCurrentUser(updatedUser) {
        try {
            localStorage.setItem('user', JSON.stringify(updatedUser));
            return true;
        } catch (error) {
            console.error('Error updating user data:', error);
            return false;
        }
    }
};
