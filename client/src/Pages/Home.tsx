// src/Pages/Home.tsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddBtn from '../components/AddBtn';
import { useAuth } from '../hooks/useAuth';
import NewExpenseGroupFormModal from '../components/NewExpenseGroupsFormModal';
import { serverBaseUrl } from '../config';
import ExpenseGroupCard from '../components/ExpenseGroupCard';

interface ExpenseGroup {
  id: number;
  name: string;
  userExpenseGroups: [];
}

const Home = () => {
  const { user } = useAuth();

  const [expenseGroups, setExpenseGroups] = useState<ExpenseGroup[]>([]);
  const [isAddExpenseGroupModalOpen, setIsAddExpenseGroupModalOpen] =
    useState(false);

  function getExpenseGroups() {
    if (user?.id) {
      const url = `${serverBaseUrl}/api/v1/expense-groups?user-id=${user.id}`;
      axios
        .get(url)
        .then((res) => {
          setExpenseGroups(res.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }

  console.log(expenseGroups);

  useEffect(() => {
    if (user?.id) {
      getExpenseGroups();
    }
  }, [user?.id]);

  console.log(expenseGroups);

  return (
    <div className="flex min-h-screen items-center flex-col">
      <div className="flex flex-col gap-3 w-full justify-center items-center p-3">
        {expenseGroups.length > 0 &&
          expenseGroups.map((expenseGroup) => (
            <ExpenseGroupCard expenseGroup={expenseGroup} />
          ))}
      </div>
      {isAddExpenseGroupModalOpen && (
        <NewExpenseGroupFormModal
          getExpenseGroups={getExpenseGroups}
          toggleModal={() =>
            setIsAddExpenseGroupModalOpen(!isAddExpenseGroupModalOpen)
          }
        />
      )}
      <div>
        {!isAddExpenseGroupModalOpen && (
          <AddBtn
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
