import { getExpenseGroups } from '@/functions/functions';
import { ExpenseGroup } from '@/types/expenseGroup';
import { useQuery } from '@tanstack/react-query';

export default function useExpenseGroups(userId?: number) {
  return useQuery<ExpenseGroup[]>({
    queryKey: ['expense-groups', userId],
    queryFn: () => getExpenseGroups(Number(userId!)),
    enabled: !!userId,
  });
}
