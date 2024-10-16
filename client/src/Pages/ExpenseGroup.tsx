import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Expenses from '@/components/Expenses';
import Balances from '@/components/Balances';
import Photos from '@/components/Photos';
import InviteUserBtn from '@/components/InviteUserBtn';
import InviteUserFormModal from '@/components/InviteUserFormModal';
import useExpenseGroup from '@/hooks/useExpenseGroup';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ExpenseGroup = () => {
  const { id } = useParams<{ id: string }>();
  const [isInviteUserModalOpen, setIsInviteUserModalOpen] = useState(false);

  const { data: expenseGroup } = useExpenseGroup(id);

  const participants = expenseGroup?.userExpenseGroups;

  return (
    <>
      <div className="flex flex-col items-center justify-center p-1 md:p-10 max-w-xl mx-auto">
        <div className="flex w-full justify-between max-w-xl relative mt-3">
          <Link to="/home">
            <Button className="bg-white text-slate-600 hover:bg-white shadow-none transition-colors duration-300">
              <ChevronLeft />
            </Button>
          </Link>
          <h1 className="text-xl mb-3 font-semibold">{expenseGroup?.name}</h1>
          <div onClick={() => setIsInviteUserModalOpen(true)}>
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
            <Photos expenses={expenseGroup?.expenses} />
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
