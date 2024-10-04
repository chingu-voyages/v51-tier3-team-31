// src/Pages/Home.tsx

import { useState } from 'react';
import AddBtn from '../components/AddBtn';
import { useAuth } from '../hooks/useAuth';
import NewExpenseGroupFormModal from '../components/NewExpenseGroupsFormModal';
import ExpenseGroupCard from '../components/ExpenseGroupCard';
import { useQuery } from '@tanstack/react-query';
import { getExpenseGroups } from '@/functions/functions';
import { ExpenseGroup } from '@/types/expenseGroup';

const Home = () => {
  const [isAddExpenseGroupModalOpen, setIsAddExpenseGroupModalOpen] =
    useState(false);

  const { user } = useAuth();

  const userId = user?.id ?? null;

  const { data: expenseGroups = [] } = useQuery<ExpenseGroup[]>({
    queryKey: ['expense-groups', userId],
    queryFn: () => getExpenseGroups(Number(userId!)), // This will now run only if userId is not null
    enabled: !!userId, // Only enable the query when userId is available
  });

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
