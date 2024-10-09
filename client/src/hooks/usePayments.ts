import { useQuery } from '@tanstack/react-query';
import { getPayments } from '@/functions/functions';
import { ExpenseGroupPayments } from '@/types/payment';

export default function usePayments(expenseGroupId: string) {
  return useQuery<ExpenseGroupPayments>({
    queryKey: ['payments', expenseGroupId],
    queryFn: () => getPayments(expenseGroupId!),
    enabled: !!expenseGroupId,
  });
}
