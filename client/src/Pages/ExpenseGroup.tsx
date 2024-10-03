import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { serverBaseUrl } from '@/config';
import { ExpenseGroup as ExpenseGroupType } from '../types/expenseGroup';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Expenses from '@/components/Expenses';
import Balances from '@/components/Balances';
import Photos from '@/components/Photos';
import InviteUserBtn from '@/components/InviteUserBtn';
import InviteUserFormModal from '@/components/InviteUserFormModal';

const ExpenseGroup = () => {
  const { id } = useParams<{ id: string }>();
  const [expenseGroup, setExpenseGroup] = useState<ExpenseGroupType | null>(
    null
  );
  const [isInviteUserModalOpen, setIsInviteUserModalOpen] = useState(false);

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

  const participants = expenseGroup?.userExpenseGroups

  return (
    <>
      <div className="flex flex-col items-center justify-center p-1 md:p-10 max-w-xl mx-auto">
        <div className="flex w-full justify-center max-w-xl relative mt-3">
          <h1 className="text-xl mb-3 font-semibold">{expenseGroup?.name}</h1>
          <div
            className="absolute right-2"
            onClick={() => setIsInviteUserModalOpen(true)}
          >
            <InviteUserBtn />
          </div>
        </div>
          <div className="flex w-full justify-center flex-wrap gap-1 my-5">
            {participants?.map((participant) => (
              <div
                className="px-2 py-1 text-[12px] border-r-[1px] border-black/10 rounded-full shadow-sm"
                key={participant.id}
              >
                {participant.user.email}
              </div>
            ))}
          </div>
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
      {isInviteUserModalOpen && (
        <InviteUserFormModal
          closeModal={() => setIsInviteUserModalOpen(false)}
          expenseGroupId={expenseGroup?.id}
        />
      )}
    </>
  );
};

export default ExpenseGroup;
