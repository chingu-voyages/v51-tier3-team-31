import { Expense } from '@/types/expense';
import { DollarSign, Image } from 'lucide-react';
import { Card } from './ui/card';
import ReceiptModal from './ReceiptModal';
import { useState } from 'react';

interface PhotosProps {
  expenses: Expense[] | undefined;
}

const Photos = ({ expenses }: PhotosProps) => {
  let hasExpenses = expenses && expenses.length > 0;

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

const ExpensePhotos = ({ expenses }: ExpensePhotosProps) => {
  const [activeImage, setActiveImage] = useState<null | string>(null);

  function openModal(imageSrc: string): void {
    setActiveImage(imageSrc);
    console.log(imageSrc);
  }

  function closeModal(): void {
    setActiveImage(null);
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {activeImage && (
        <ReceiptModal
          imgUrl={activeImage}
          closeModal={closeModal}
        />
      )}
      {expenses.map((expense) => (
        <Card
          onClick={() => openModal(expense.receiptURL)}
          key={expense.id}
          className="overflow-hidden cursor-pointer hover:bg-gray-50 w-80 transition-colors rounded-md"
        >
          <div className="flex flex-row items-center">
            <div className="w-24 h-full">
              {expense.receiptThumbnailURL ? (
                <img
                  src={expense.receiptThumbnailURL}
                  alt={`Receipt for ${expense.name}`}
                  className="object-cover w-full min-w-24 h-full p-1 rounded-md"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-100">
                  <DollarSign className="w-8 h-8 text-gray-400" />
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col justify-between w-full">
              <div className="flex flex-col">
                <div className="flex justify-between  items-end mb-2">
                  <h3 className="font-semibold text-lg truncate">
                    {expense.name}
                  </h3>
                  <span className="ml-2 px-2 text-sm  font-semibold  text-slate-600 ">
                    {formatAmount(expense.amount)}
                  </span>
                </div>
                {expense.description && (
                  <p className="text-sm text-slate-700 text-left w-full line-clamp-2">
                    {expense.description}
                  </p>
                )}
                <div className="flex mt-2">
                <span className="text-xs  text-slate-500 text-left hover:underline  w-full">
                  {new Date(expense.createdAt).toLocaleDateString()}
                </span>
                <span className="text-xs  text-blue-600 text-left hover:underline  w-full">
                  View Receipt →
                </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Photos;
