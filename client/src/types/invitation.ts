import { ExpenseGroup } from './expenseGroup';
import { User } from './user';

export interface Invitation {
  id: number;
  expenseGroupId: number;
  sentBy: number;
  invitedEmail: string;
  status: string;
  createdAt: string; // Use Date if you parse these strings into actual Date objects
  updatedAt: string;
  sender: User;
  expenseGroup: ExpenseGroup;
}
