import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'; // Import from 'next/navigation' for app router
import React, { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // Check if user is null or uid is not present
    if (!user || !user.uid) {
      router.push('/'); // Redirect to login page if user is not authenticated
    }
  }, [router, user]);

  // If user is authenticated, render the children; otherwise render nothing
  return <>{user && user.uid ? children : null}</>;
};

export default ProtectedRoute;
