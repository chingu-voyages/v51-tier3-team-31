import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar = ({ isLoggedIn }: NavbarProps) => {
  const { logout } = useAuth();

  return (
    <>
      <nav className=" text-primary border-b-[1px] py-2 flex  justify-between items-center px-3 backdrop-blur-xl sticky top-0 w-full">
        <Link to="/">
          <div className="py-1 px-3 rounded-l-sm border-r-2 font-bold">
            <span className="font-bold text-xl text-blue-600">/</span> Splitit
          </div>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu size={26} className="rotate-90" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mx-3">
            {isLoggedIn && (
              <Link to="/home">
                <DropdownMenuItem>Dasboard</DropdownMenuItem>
              </Link>
            )}
            {!isLoggedIn && (
              <Link to="/login">
                <DropdownMenuItem>Login</DropdownMenuItem>
              </Link>
            )}
            {!isLoggedIn && (
              <Link to="/login">
                <DropdownMenuItem>Register</DropdownMenuItem>
              </Link>
            )}
            {/*  <DropdownMenuSeparator /> */}
            {isLoggedIn && (
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
};

export default Navbar;
