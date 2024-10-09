import { Payment } from '@/types/payment';
import { Card, CardContent } from './ui/card';
import { useAuth } from '@/hooks/useAuth';
import { HandCoins, WalletMinimal } from 'lucide-react';

interface PaymentCardProps {
  payment: Payment;
}

const PaymentCard = ({ payment }: PaymentCardProps) => {
  const { user } = useAuth();
  if (!payment || !user || !user.id) {
    return '';
  }

  const isUserOwes: boolean = payment.fromUserId === Number(user.id);

  return (
    <Card className="w-80 mx-auto rounded-md">
      <CardContent className="flex  rounded-md w-full  items-center p-2">
        {isUserOwes ? (
          <>
            <div className="flex w-1/3   justify-center items-center text-slate-600">
              <WalletMinimal size={35} />
            </div>
            <div>
              <h3 className="font-medium">You owe</h3>
              <p className="text-sm">
                {payment.toUserEmail.split('@')[0]} {payment.amountToPay} €
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex w-1/3   justify-center items-center text-slate-600">
              <HandCoins
                size={35}
                className="text-blue-600"
              />
            </div>
            <div>
              <h3 className="font-medium">
                {payment.fromUserEmail.split('@')[0]}{' '}
              </h3>
              <p className="text-sm">owes you {payment.amountToPay} €</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentCard;
