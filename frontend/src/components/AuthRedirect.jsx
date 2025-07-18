"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/utils/authService';

export default function AuthRedirect({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    if (authService.isAuthenticated()) {
      // Redirect to appropriate dashboard
      const dashboardRoute = authService.getDashboardRoute();
      router.push(dashboardRoute);
    }
  }, [router]);

  return children;
}
