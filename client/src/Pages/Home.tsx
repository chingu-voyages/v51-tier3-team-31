// src/Pages/Home.tsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddBtn from '../components/AddBtn';
import { useAuth } from '../hooks/useAuth';
import NewExpenseGroupFormModal from '../components/NewExpenseGroupsFormModal';
import { serverBaseUrl } from '../config';

interface ExpenseGroup {
  id: number;
  name: string;
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

  useEffect(() => {
    if (user?.id) {
      getExpenseGroups();
    }
  }, [user?.id]);

  console.log(expenseGroups);

  return (
    <div className="flex min-h-screen items-center flex-col bg-indigo-600">
      <p className="text-red-600 text-xl mt-3 mb-2">{user?.email}</p>
      <p className="text-red-600 text-xl">id: {user?.id}</p>
      <div className="flex flex-col gap-3 w-full justify-center items-center p-3">
        {expenseGroups.length > 0 &&
          expenseGroups.map((expG) => (
            // make a component for this data container
            <div
              key={expG.id}
              className="h-[50px] w-[290px] shadow-md cursor-pointer text-gray-50 bg-gray-300/50 rounded-md flex justify-center items-center"
            >
              <p className="px-3.5 py-6 text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {expG.name}
              </p>
            </div>
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
