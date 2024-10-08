import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Expenses from '@/components/Expenses';
import Balances from '@/components/Balances';
import Photos from '@/components/Photos';
import InviteUserBtn from '@/components/InviteUserBtn';
import InviteUserFormModal from '@/components/InviteUserFormModal';
import { useAuth } from '@/hooks/useAuth';
import useExpenseGroup from '@/hooks/useExpenseGroup';

const ExpenseGroup = () => {
  const { user } = useAuth();

  const [isInviteUserModalOpen, setIsInviteUserModalOpen] = useState(false);

  const userId = user?.id ? user.id.toString() : undefined;
  const { data: expenseGroup } = useExpenseGroup(userId);

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
              expenseGroupId={expenseGroup?.id}
              expenses={expenseGroup?.expenses}
            />
          </TabsContent>
          <TabsContent value="balances">
            <Balances expenseGroupId={expenseGroup?.id} />
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
