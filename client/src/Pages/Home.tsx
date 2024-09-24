// src/Pages/Home.tsx
import axios from "axios";
import { useState, useEffect } from "react";
import AddBtn from '../components/AddBtn'
import NewExpenseGroupFormModal from '../components/NewExpenseGroupFormModal'


const Home = () => {

  const url = "http://localhost:8080/api/v1/expense-groups"
  // const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;

  const [expenseGroups, setExpenseGroups] = useState(null)

  const renderExpGroups = () => {
    useEffect(() => {
      axios.get(url)
      .then(res => {
        setExpenseGroups(res.data)
      })
    }, [])
  }
  renderExpGroups()

  return (
    <div className="flex min-h-screen max-w-sm items-center flex-col bg-indigo-600">
      <div className="flex flex-col gap-3 w-full justify-center items-center p-3">
          {
            expenseGroups && expenseGroups
              .map(expG =>
                // make a component for this data container
                <div key={expG.id} 
                className="h-[50px] w-[290px] shadow-md cursor-pointer text-gray-50 bg-gray-300/50 rounded-md flex justify-center items-center">
                  <p className="px-3.5 py-6 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{expG.name}</p>
                </div>
              )
            }
      </div>
      <NewExpenseGroupFormModal />
      <AddBtn />
    </div>

  );
};

export default Home;
