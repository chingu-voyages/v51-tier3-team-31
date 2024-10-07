import { Balance } from '@/types/balance';

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

  // Display balance value or a default message
  const balanceDisplay =
    userBalance !== null ? `${userBalance} $` : 'No balance';

  return (
    <div className="w-64 shadow-md mx-auto px-3 py-2 text-center rounded-md border-none">
      <div className="flex w-full flex-col gap-3 justify-between items-start font-semibold px-3">
        <p>{userEmail}</p>
        <div className="flex justify-between w-full text-md font-normal">
          <div>
            Balance:{' '}
            <span
              className={`${
                userBalance !== null && userBalance > 0
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}
            >
              {balanceDisplay}
            </span>
          </div>

          <p>Paid: {amountPaid} $</p>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
