"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/utils/authService';

export default function withAuth(WrappedComponent, requiredRoles = []) {
  return function AuthenticatedComponent(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const checkAuth = () => {
        const authenticated = authService.isAuthenticated();
        const user = authService.getCurrentUser();

        if (!authenticated) {
          router.push('/login');
          return;
        }

        // Check role permissions if required
        if (requiredRoles.length > 0 && user) {
          if (!requiredRoles.includes(user.role)) {
            // Redirect to appropriate dashboard based on user role
            const dashboardRoute = authService.getDashboardRoute();
            router.push(dashboardRoute);
            return;
          }
        }

        setIsAuthenticated(true);
        setIsLoading(false);
      };

      checkAuth();
    }, [router]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
