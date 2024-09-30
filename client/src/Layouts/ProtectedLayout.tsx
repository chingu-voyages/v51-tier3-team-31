// src/Layouts/ProtectedLayout.tsx

import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';

export const ProtectedLayout = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet />
      <Toaster />
    </div>
  );
};
