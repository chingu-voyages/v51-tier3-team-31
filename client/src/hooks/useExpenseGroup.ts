import { getExpenseGroup } from '@/functions/functions';
import { ExpenseGroup } from '@/types/expenseGroup';
import { useQuery } from '@tanstack/react-query';

export default function useExpenseGroup(userId?: string) {
  return useQuery<ExpenseGroup>({
    queryKey: ['expense-group', userId],
    queryFn: () => getExpenseGroup(userId!),
    enabled: !!userId,
  });
}
