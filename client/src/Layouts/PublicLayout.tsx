// src/Layouts/HomeLayout.tsx

import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';

export const PublicLayout = () => {

  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};
