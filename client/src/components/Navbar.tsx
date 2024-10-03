import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Bell } from 'lucide-react';
import { Badge } from './ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

interface NavbarProps {
  isLoggedIn: boolean;
}

const Navbar = ({ isLoggedIn }: NavbarProps) => {
  const { logout } = useAuth();

  return (
    <nav className="text-primary border-b-[1px] py-2 z-20 flex justify-between items-center px-3 backdrop-blur-xl sticky top-0 w-full">
      <Link to="/">
        <div className="py-1 px-3 rounded-l-sm border-r-2 font-bold">
          <span className="font-bold text-xl text-blue-600">/</span> Splitit
        </div>
      </Link>
      <div className="flex gap-0 md:gap-3 items-center">
        {isLoggedIn && (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <div className="relative">
                    <Bell
                      size={23}
                      className="opacity-50 my-2 mx-2"
                    />

                    <Badge className="bg-red-600 text-white hover:bg-red-600 absolute px-[6px] py-[0px] bottom-0 rounded-full left-0">
                      <span>1</span>
                    </Badge>
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex w-56 flex-col bg-white px-2 py-2 ">
                    <div className="flex flex-col border-b-[1px] py-3 border-gray-200">
                      <p className="text-base font-normal text-center text-gray-600 border-gray-100 p-3">
                        <span className="font-medium">HARCODED</span> has
                        invited you into the expense group{' '}
                        <span className="font-medium">Travel</span>
                      </p>
                      <div className="flex  w-full text-center text-sm">
                        <div className="w-1/2 border-[1px] py-1 border-r-0  border-gray-100 cursor-pointer hover:bg-blue-600 hover:text-white">
                          Accept
                        </div>
                        <div className="w-1/2 border-[1px] py-1 cursor-pointer border-gray-100 hover:bg-gray-100">
                          Decline
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="relative"></TooltipTrigger>
            <TooltipContent></TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu
              size={26}
              className="rotate-90"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mx-3">
            {isLoggedIn ? (
              <>
                <DropdownMenuItem asChild>
                  <Link to="/home">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem asChild>
                  <Link to="/login">Login</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register">Register</Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
