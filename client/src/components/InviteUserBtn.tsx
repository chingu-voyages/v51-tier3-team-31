import { UserRoundPlus } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const InviteUserBtn = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <UserRoundPlus className="cursor-pointer opacity-50" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Invite user</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InviteUserBtn;
