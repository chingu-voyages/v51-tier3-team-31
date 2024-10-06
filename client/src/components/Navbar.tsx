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
import InvitationNotificationCard from './InvitationNotificationCard';
import { Invitation } from '@/types/invitation';
import { useEffect, useState } from 'react';
import useInvitations from '@/hooks/useInvitations';

const Navbar = () => {
  const { logout, isLoggedIn, user } = useAuth();
  const [numberOfInvitations, setNumberOfInvitations] = useState(0);

  const email = user?.email ?? null;
  const { data: invitations = [] } = useInvitations(email!);

  useEffect(() => {
    if (invitations) {
      setNumberOfInvitations(invitations.length);
    }
  }, [invitations]);

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

                    {numberOfInvitations > 0 && (
                      <Badge className="bg-red-600 text-white hover:bg-red-600 absolute px-[6px] py-[0px] bottom-0 rounded-full left-0">
                        <span>{numberOfInvitations}</span>
                      </Badge>
                    )}
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex w-56 flex-col bg-white px-2 py-2 ">
                    {numberOfInvitations === 0 && (
                      <div className="text-center">
                        You have no notifications
                      </div>
                    )}
                    {numberOfInvitations > 0 &&
                      invitations.map((invitation: Invitation) => (
                        <InvitationNotificationCard
                          invitation={invitation}
                          key={invitation.id}
                        />
                      ))}
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
