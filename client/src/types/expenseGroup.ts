// src/types/expenseGroup.ts

import { User } from './user.ts';

export interface UserExpenseGroup {
  id: number;
  userId: number;
  expenseGroupId: number;
  contributionWeight: number;
  description: string;
  locked: boolean;
  lockedAt: string;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface ExpenseGroup {
  id: number;
  name: string;
  description: string;
  budget: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  userExpenseGroups: UserExpenseGroup[];
  expenses: any[]; // Adjust this based on the structure of expenses
}
