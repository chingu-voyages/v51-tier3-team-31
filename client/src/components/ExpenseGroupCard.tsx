interface ExpenseGroup {
  id: number;
  name: string;
  userExpenseGroups: [];
}

interface ExpenseGroupCardProps {
  expenseGroup: ExpenseGroup;
}

const ExpenseGroupCard = ({ expenseGroup }: ExpenseGroupCardProps) => {
  return (
    <div
      key={expenseGroup.id}
      className="py-3 px-3 flex gap-1 flex-col w-[290px] shadow-md cursor-pointer text-neutral-800 rounded-md justify-center items-center"
    >
      <p className="text-lg text-left w-full">{expenseGroup.name}</p>
      <p className="text-left w-full">
        Number of participants: {expenseGroup.userExpenseGroups.length}
      </p>
    </div>
  );
};

export default ExpenseGroupCard;
