// src/Pages/Home.tsx
import axios from 'axios';
import { useState, useEffect } from 'react';
import AddBtn from '../components/AddBtn';
import { useAuth } from '../hooks/useAuth';

interface ExpenseGroup {
  id: number;
  name: string;
}

const Home = () => {
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const url = `${serverBaseUrl}/api/v1/expense-groups`;

  const [expenseGroups, setExpenseGroups] = useState<ExpenseGroup[]>([]);

  const { user } = useAuth();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setExpenseGroups(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [url]);

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
              <p className="px-3.5 py-6 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {expG.name}
              </p>
            </div>
          ))}
      </div>
      <AddBtn />
    </div>
  );
};

export default Home;
