import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';

export const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login if the user is not authenticated
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  // Only render the layout if the user is logged in
  if (!isLoggedIn) {
    return null; // Prevent rendering protected components if not logged in
  }

  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};
