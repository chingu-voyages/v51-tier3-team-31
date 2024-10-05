// src/Pages/Home.tsx

import { useState } from 'react';
import AddBtn from '../components/AddBtn';
import { useAuth } from '../hooks/useAuth';
import NewExpenseGroupFormModal from '../components/NewExpenseGroupsFormModal';
import ExpenseGroupCard from '../components/ExpenseGroupCard';
import useExpenseGroups from '@/hooks/useExpenseGroups';

const Home = () => {
  const { user } = useAuth();
  const [isAddExpenseGroupModalOpen, setIsAddExpenseGroupModalOpen] =
    useState(false);
  
  const userId = user?.id ? Number(user.id) : undefined;
  const { data: expenseGroups = [] } = useExpenseGroups(userId);

  return (
    <div className="flex min-h-screen items-center flex-col">
      <div className="flex flex-col gap-3 w-full justify-center items-center p-3">
        {expenseGroups?.length > 0 &&
          expenseGroups.map((expenseGroup) => (
            <ExpenseGroupCard
              key={expenseGroup.id}
              expenseGroup={expenseGroup}
            />
          ))}
      </div>
      {isAddExpenseGroupModalOpen && (
        <NewExpenseGroupFormModal
          toggleModal={() =>
            setIsAddExpenseGroupModalOpen(!isAddExpenseGroupModalOpen)
          }
        />
      )}
      <div>
        {!isAddExpenseGroupModalOpen && (
          <AddBtn
            text="Add an expense group"
            toggleModal={() =>
              setIsAddExpenseGroupModalOpen(!isAddExpenseGroupModalOpen)
            }
          />
        )}
      </div>
    </div>
  );
};

export default Home;
