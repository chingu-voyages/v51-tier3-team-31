import { Binoculars } from 'lucide-react';
import { useState } from 'react';
import AddBtn from './AddBtn';
import { Expense } from '@/types/expense';

interface ExpensesProps {
  expenses: Expense[] | undefined;
}

const Expenses = ({ expenses }: ExpensesProps) => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

  const toggleModal = () => setIsAddExpenseModalOpen(!isAddExpenseModalOpen);

  if (expenses && expenses.length > 0) {
    return (
      <div className="flex-flex-col gap-3 mt-5">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="w-32 bg-black/10 mx-auto p-1 text-center rounded-md"
          >
            {expense.amount} $
          </div>
        ))}
        {!isAddExpenseModalOpen && (
          <div className="mt-5">
            <AddBtn
              text="Add expense"
              toggleModal={toggleModal}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center gap-5 min-h-[50vh]">
      <Binoculars
        className="opacity-50"
        size={50}
      />
      <h2 className="text-lg font-semibold">No expenses yet</h2>
      <p className="text-gray-500 max-w-xs">
        Add an expense by tapping the "+" to start tracking and splitting your
        expenses
      </p>
      {!isAddExpenseModalOpen && (
        <AddBtn
          text="Add expense"
          toggleModal={toggleModal}
        />
      )}
    </div>
  );
};

export default Expenses;
