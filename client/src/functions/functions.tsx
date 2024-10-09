// client/src/functions/functions.tsx

import { serverBaseUrl } from '@/config';
import { ExpenseGroup } from '../types/expenseGroup';
import { Invitation } from '@/types/invitation';
import { Balances } from '@/types/balance';
import { Category } from '@/types/category';
import { ExpenseGroupPayments } from '@/types/payment';

export async function getExpenseGroups(
  userId: number
): Promise<ExpenseGroup[]> {
  const url = `${serverBaseUrl}/api/v1/expense-groups?user-id=${userId}`;
  const response = await fetch(url);
  return response.json();
}

export async function getInvitations(email: string): Promise<Invitation[]> {
  const url = `${serverBaseUrl}/api/v1/expense-groups/pending-invitations?user-email=${email}`;
  const response = await fetch(url);
  return response.json();
}

export async function getBalances(expenseGroupId: string): Promise<Balances> {
  const url = `${serverBaseUrl}/api/v1/expense-groups/${expenseGroupId}/balances`;
  const response = await fetch(url);
  return response.json();
}

export async function getExpenseGroup(id: string): Promise<ExpenseGroup> {
  const url = `${serverBaseUrl}/api/v1/expense-groups/${id}`;
  const response = await fetch(url);
  return response.json();
}

export async function getPayments(expenseGroupId: string): Promise<ExpenseGroupPayments> {
  const url = `${serverBaseUrl}/api/v1/expense-groups/${expenseGroupId}/payments`;
  const response = await fetch(url);
  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const url = `${serverBaseUrl}/api/v1/categories`;
  const response = await fetch(url);
  return response.json();
}
