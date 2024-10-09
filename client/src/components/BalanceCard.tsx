import { Balance } from '@/types/balance';
import { Euro, User, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface BalanceCardProps {
  balance: Balance | undefined;
  email: string | undefined;
}

const BalanceCard = ({ email, balance }: BalanceCardProps) => {
  // Early return if balance or email is not available
  if (!balance || !email) {
    return <p>There is no balance or category</p>;
  }

  const { userEmail, balance: userBalance, amountPaid } = balance;

  // Handle the null case explicitly
  const balanceAmount = userBalance ?? 0; // Use nullish coalescing
  const balanceDisplay = balanceAmount.toFixed(2);
  const amountPaidDisplay = amountPaid.toFixed(2);
  const isPositiveBalance = balanceAmount >= 0;

  return (
    <Card className="rounded-md">
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <p className="font-medium text-gray-600 truncate max-w-[200px]">
                {userEmail}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-sm">
              <div className="flex items-center space-x-2">
                {isPositiveBalance ? (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-500" />
                )}
                <span className="text-sm font-medium text-gray-500">
                  Current Balance
                </span>
              </div>
              <span
                className={`font-semibold ${
                  isPositiveBalance ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {balanceDisplay} €
              </span>
            </div>

            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <Euro className="w-5 h-5 text-gray-500" />
                <span className="text-sm font-medium text-gray-500">
                  Total Paid
                </span>
              </div>
              <span className="font-semibold text-gray-700">
                {amountPaidDisplay} €
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceCard;
