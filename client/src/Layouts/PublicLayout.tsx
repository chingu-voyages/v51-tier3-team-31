// src/Layouts/HomeLayout.tsx

import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const PublicLayout = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div>
      <nav className="bg-black text-white flex  justify-between items-center px-2 py-1">
        <Link to="/">
          <div className="bg-black text-white py-1 px-3 rounded-l-sm border-r-2">
            Splitit
          </div>
        </Link>
        <div className="flex gap-3">
          {isLoggedIn && <Link to="/home">Dasboard</Link>}
          {!isLoggedIn && <Link to="/login">Login</Link>}
        </div>
      </nav>
      <Outlet />
    </div>
  );
};
