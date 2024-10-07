import { useQuery } from '@tanstack/react-query';
import { getBalances } from '@/functions/functions';
import { Balances } from '@/types/balance';

export default function useBalances(expenseGroupId: string) {
  return useQuery<Balances>({
    queryKey: ['balances', expenseGroupId],
    queryFn: () => getBalances(expenseGroupId!),
    enabled: !!expenseGroupId,
  });
}
