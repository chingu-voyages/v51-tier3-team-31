import { ExpenseGroup, UserExpenseGroup } from '../types/expenseGroup';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UsersRound } from 'lucide-react';
import { Badge } from './ui/badge';

interface ExpenseGroupCardProps {
  expenseGroup: ExpenseGroup;
}

const ExpenseGroupCard = ({ expenseGroup }: ExpenseGroupCardProps) => {
  const participants: UserExpenseGroup[] = expenseGroup.userExpenseGroups;

  return (
    <div className="flex items-stretch h-full">
      <div className="py-3 text-left px-3 flex gap-1 w-[290px] shadow-md cursor-pointer text-neutral-800 rounded-l-md justify-center items-center">
        <p className="text-lg w-full font-semibold">{expenseGroup.name}</p>
        <div className="relative">
          <Badge className="rounded-full absolute right-0 top-0 bg-white/30 px-2 text-primary z-10">
            {participants.length}
          </Badge>
          <UsersRound className="my-3 mx-3 z-1 relative" />
        </div>
      </div>
      <Link
        to={`/expense-groups/${expenseGroup.id}`}
        className="min-w-11 cursor-pointer hover:bg-gray-200 shadow-md bg-gray-100 rounded-r-md px-2 flex flex-col items-center justify-center"
      >
        <ChevronRight />
      </Link>
    </div>
  );
};

export default ExpenseGroupCard;
