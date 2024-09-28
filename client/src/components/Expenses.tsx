import { Binoculars } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddBtn from './AddBtn';
import { Expense } from '@/types/expense';
import NewExpenseFormModal from './NewExpenseFormModal';
import { Category } from '@/types/category';
import { serverBaseUrl } from '@/config';
import axios from 'axios';
import ExpenseCard from './ExpenseCard';

interface ExpensesProps {
  expenses: Expense[] | undefined;
  expenseGroupId: number | undefined;
  updateData: () => void;
}

const Expenses = ({ expenses, expenseGroupId, updateData }: ExpensesProps) => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategoriesUrl = `${serverBaseUrl}/api/v1/categories`;

  const toggleModal = () => setIsAddExpenseModalOpen(!isAddExpenseModalOpen);

  const getExpenses = () => {
    updateData();
  };

  // get categories on mount
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(getCategoriesUrl);
        setCategories(res.data);
        console.log(res.data);
      } catch (error) {
        console.error('Could not get expense categories: ', error);
      }
    };
    getCategories();
  }, [getCategoriesUrl]);

  if (expenses && expenses.length > 0) {
    return (
      <>
        <div className="flex flex-col gap-3 mt-5">
          {expenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              categories={categories}
              expense={expense}
            />
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
        {isAddExpenseModalOpen && (
          <NewExpenseFormModal
            categories={categories}
            getExpenses={getExpenses}
            expenseGroupId={expenseGroupId}
            toggleModal={toggleModal}
          />
        )}
      </>
    );
  }

  return (
    <>
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
      {isAddExpenseModalOpen && (
        <NewExpenseFormModal
          categories={categories}
          getExpenses={getExpenses}
          expenseGroupId={expenseGroupId}
          toggleModal={toggleModal}
        />
      )}
    </>
  );
};

export default Expenses;
