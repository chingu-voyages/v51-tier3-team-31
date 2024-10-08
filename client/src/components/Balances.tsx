import useBalances from '@/hooks/useBalances';
import { Balance } from '@/types/balance';
import { useEffect, useState } from 'react';
import BalanceCard from './BalanceCard';
import { Receipt } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface BalancesPropsType {
  expenseGroupId: number | undefined;
}

const Balances = ({ expenseGroupId }: BalancesPropsType) => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const expenseGroupIdString = expenseGroupId?.toString();
  const { data: balancesObj } = useBalances(expenseGroupIdString!);

  // set balances to balances array that is a property on balances object
  useEffect(() => {
    if (balancesObj?.balances) {
      setBalances(balancesObj?.balances);
    }
  }, [balancesObj]);

  return (
    <div>
      <Card className="max-w-md bg-gradient-to-br  w-80 rounded-md mx-auto ">
        <CardContent className="py-3">
          <div className="flex items-center justify-between space-x-4">
            <div className="p-3  text-slate-600">
              <Receipt size={35}  />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 font-medium">Total Expense</p>
              <p className="text-xl font-semibold text-gray-700">
                {balancesObj?.totalExpenses?.toFixed(2) ?? '0.00'} €
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-3 mt-5">
        {balances.map((balance) => (
          <BalanceCard
            key={balance.userId}
            email={balance.userEmail}
            balance={balance}
          />
        ))}
      </div>
    </div>
  );
};

export default Balances;
