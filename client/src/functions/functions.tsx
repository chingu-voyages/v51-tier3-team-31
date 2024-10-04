// client/src/functions/functions.tsx

import { serverBaseUrl } from '@/config';
import { ExpenseGroup } from '../types/expenseGroup';

export async function getExpenseGroups(
  userId: number
): Promise<ExpenseGroup[]> {
  const url = `${serverBaseUrl}/api/v1/expense-groups?user-id=${userId}`;
  const response = await fetch(url);
  return response.json();
}

