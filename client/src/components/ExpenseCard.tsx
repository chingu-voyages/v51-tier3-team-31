import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Category } from '@/types/category';
import { Expense } from '@/types/expense';

interface ExpenseProps {
  expense: Expense | undefined;
  categories: Category[] | undefined;
}

const ExpenseCard = ({ categories, expense }: ExpenseProps) => {
  const getCategoryName = (categoryId: number): string => {
    const category = categories?.find((cat) => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  if (!expense) {
    return '';
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-64 shadow-md mx-auto px-3 py-2 text-center rounded-md border-none "
    >
      <AccordionItem
        value="item-1"
        className="border-none "
      >
        <AccordionTrigger className="hover:no-underline">
          <div className="flex w-full justify-between font-semibold px-3">
            <p>{getCategoryName(expense.categoryId)}</p>
            <p>{expense.amount} $</p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <p className="w-full flex text-left px-3 text-wrap ">{expense.description}</p>
          <p className="w-full text-left px-3 opacity-60 mt-3">
            {formatDate(expense.createdAt)}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ExpenseCard;
