import { ExpenseGroup, UserExpenseGroup } from '../types/expenseGroup';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ExpenseGroupCardProps {
  expenseGroup: ExpenseGroup;
}

const ExpenseGroupCard = ({ expenseGroup }: ExpenseGroupCardProps) => {
  const participants: UserExpenseGroup[] = expenseGroup.userExpenseGroups;

  return (
    <div className="flex items-stretch h-full">
      <div
        key={expenseGroup.id}
        className="py-3 text-left px-3 flex gap-1 flex-col w-[290px] shadow-md cursor-pointer text-neutral-800 rounded-l-md justify-center items-center"
      >
        <p className="text-lg  w-full">{expenseGroup.name}</p>
        <p className="w-full">Participants: </p>
        <div className="flex w-full flex-wrap gap-1">
          {participants.map((participant) => (
            <Badge
              className="bg-black/50"
              key={participant.id}
            >
              {participant.user.name}
            </Badge>
          ))}
        </div>
      </div>
      <div className="min-w-11 cursor-pointer hover:bg-gray-200 shadow-md  bg-gray-100 rounded-r-md px-2 flex flex-col items-center justify-center">
        <ChevronRight />
      </div>
    </div>
  );
};

export default ExpenseGroupCard;
