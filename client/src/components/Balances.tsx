import useBalances from '@/hooks/useBalances';
import { Balance } from '@/types/balance';
import { useEffect, useState } from 'react';
import BalanceCard from './BalanceCard';

interface BalancesPropsType {
  expenseGroupId: number | undefined;
}

const Balances = ({ expenseGroupId }: BalancesPropsType) => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const expenseGroupIdString = expenseGroupId?.toString();
  const { data } = useBalances(expenseGroupIdString!);

  useEffect(() => {
    if (data?.balances) {
      setBalances(data?.balances);
    }
  }, [data]);

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="text-lg">Total expense: {data?.totalExpenses} $</div>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        {balances.map((balance) => (
          <BalanceCard
            key={balance.userId}
            email={balance.userEmail}
            balance={balance}
          />
        ))}
      </div>
    </>
  );
};

export default Balances;
