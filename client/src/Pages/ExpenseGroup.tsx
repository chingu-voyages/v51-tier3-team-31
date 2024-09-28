import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { serverBaseUrl } from '@/config';
import { ExpenseGroup as ExpenseGroupType } from '../types/expenseGroup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Expenses from '@/components/Expenses';
import Balances from '@/components/Balances';
import Photos from '@/components/Photos';

const ExpenseGroup = () => {
  const { id } = useParams<{ id: string }>();
  const [expenseGroup, setExpenseGroup] = useState<ExpenseGroupType | null>(
    null
  );

  useEffect(() => {
    getExpenseGroup();
  }, [id]);

  const getExpenseGroup = () => {
    const url = `${serverBaseUrl}/api/v1/expense-groups/${id}`;
    axios
      .get<ExpenseGroupType>(url)
      .then((res) => {
        setExpenseGroup(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center p-1 md:p-10 ">
      <h1 className="text-xl mb-3 font-semibold">{expenseGroup?.name}</h1>
      <Tabs
        defaultValue="expenses"
        className="w-full max-w-2xl"
      >
        <TabsList className="w-full bg-white">
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="balances">Balances</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses">
          <Expenses
            updateData={getExpenseGroup}
            expenseGroupId={expenseGroup?.id}
            expenses={expenseGroup?.expenses}
          />
        </TabsContent>
        <TabsContent value="balances">
          <Balances />
        </TabsContent>
        <TabsContent value="photos">
          <Photos />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpenseGroup;
