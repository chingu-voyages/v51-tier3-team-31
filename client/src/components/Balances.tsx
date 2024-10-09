import { useEffect, useState } from 'react';
import useBalances from '@/hooks/useBalances';
import usePayments from '@/hooks/usePayments';
import { Card, CardContent } from './ui/card';
import BalanceCard from './BalanceCard';
import PaymentCard from './PaymentCard';
import { ThumbsUp, Receipt } from 'lucide-react';
import { Balance } from '@/types/balance';
import { Payment } from '@/types/payment';
import { useAuth } from '@/hooks/useAuth';

interface BalancesPropsType {
  expenseGroupId: number | undefined;
}

const Balances = ({ expenseGroupId }: BalancesPropsType) => {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentsOfCurrentUser, setPaymentsOfCurrentUser] = useState<Payment[]>(
    []
  );
  const expenseGroupIdString = expenseGroupId?.toString();
  const { data: balancesObj } = useBalances(expenseGroupIdString!);
  const { data: expenseGroupPayments } = usePayments(expenseGroupIdString!);

  // Temporary mock for user authentication
  const { user } = useAuth();

  // Set balances and payments when the data is fetched
  useEffect(() => {
    if (balancesObj?.balances) {
      setBalances(balancesObj?.balances);
    }
    if (expenseGroupPayments?.payments) {
      setPayments(expenseGroupPayments?.payments);
    }
  }, [balancesObj, expenseGroupPayments]);

  // Filter payments by the current user's ID whenever payments or user change
  useEffect(() => {
    if (user?.id && payments) {
      const filteredPayments = payments.filter((payment) => {
        return (
          payment.fromUserId === Number(user.id) ||
          payment.toUserId === Number(user.id)
        );
      });
      setPaymentsOfCurrentUser(filteredPayments);
    }
  }, [user, payments]);
  
  return (
    <div>
      <div className="flex flex-col gap-3 w-80 mx-auto mt-5">
        {/* Payment card */}
        {paymentsOfCurrentUser.length === 0 && (
          <Card>
            <CardContent className="flex justify-between rounded-md w-full items-center p-2">
              <div className="flex w-1/3 justify-center items-center text-slate-600">
                <ThumbsUp size={35} />
              </div>
              <div className="flex w-full flex-col">
                <h3 className="font-semibold">All good</h3>
                <p className="text-sm">You don't need to balance</p>
              </div>
            </CardContent>
          </Card>
        )}
        {paymentsOfCurrentUser.map((payment) => (
          <PaymentCard
            key={`${payment.fromUserId}-${payment.toUserId}`}
            payment={payment}
          />
        ))}
        {/* Users' balances */}
        {balances.map((balance) => (
          <BalanceCard
            key={balance.userId}
            email={balance.userEmail}
            balance={balance}
          />
        ))}
        {/* Total expense */}
        <Card className="max-w-md bg-gradient-to-br rounded-md">
          <CardContent className="py-3">
            <div className="flex items-center justify-between space-x-4">
              <div className="p-3 text-slate-600">
                <Receipt size={35} />
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500 font-medium">
                  Total Expense
                </p>
                <p className="text-xl font-semibold text-gray-700">
                  {balancesObj?.totalExpenses?.toFixed(2) ?? '0.00'} €
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Balances;
