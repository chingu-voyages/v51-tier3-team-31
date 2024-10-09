import { Expense } from '@/types/expense';
import { DollarSign, Image } from 'lucide-react';
import { Card, CardContent } from './ui/card';

interface PhotosProps {
  expenses: Expense[] | undefined;
}

const Photos = ({ expenses }: PhotosProps) => {
  let hasExpenses = expenses && expenses.length > 0;

  console.log(expenses);

  if (!expenses) {
    return 'no expenses';
  }
  return (
    <div className="flex flex-col items-center justify-center text-center gap-5 min-h-[50vh]">
      {!hasExpenses ? <EmptyState /> : <ExpensePhotos expenses={expenses} />}
    </div>
  );
};

const EmptyState = () => (
  <>
    <div className="relative">
      <Image
        className="opacity-50 text-gray-400"
        size={50}
        aria-hidden="true"
      />
    </div>
    <h2 className="text-lg font-semibold">No receipts uploaded</h2>
  </>
);

interface ExpensePhotosProps {
  expenses: Expense[];
}

const formatAmount = (amount: string | number | undefined): string => {
  if (amount === undefined || amount === '') return '$0.00';

  // Convert string to number if necessary
  const numericAmount =
    typeof amount === 'string' ? parseFloat(amount) : amount;

  // Check if the conversion resulted in a valid number
  if (isNaN(numericAmount)) return '$0.00';

  return `$${numericAmount.toFixed(2)}`;
};

const ExpensePhotos = ({ expenses }: ExpensePhotosProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {expenses.map((expense) => (
      <Card
        key={expense.id}
        className="overflow-hidden"
      >
        <div className="relative aspect-[4/3]">
          {expense.receiptURL ? (
            <img
              src={expense.receiptURL}
              alt={`Receipt for ${expense.name}`}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100">
              <DollarSign className="w-12 h-12 text-gray-400" />
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 text-sm font-semibold bg-black/50 text-white rounded-full">
              {formatAmount(expense.amount)}
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 truncate">
            {expense.name}
          </h3>
          {expense.description && (
            <p className="text-sm text-gray-500 line-clamp-2">
              {expense.description}
            </p>
          )}
        </CardContent>
      </Card>
    ))}
  </div>
);

export default Photos;
