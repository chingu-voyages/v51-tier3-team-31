export interface Balance {
  userId: number;
  userName: string;
  userEmail: string;
  balance: number | null;
  amountPaid: number;
}

export interface Balances {
  expenseGroupId: number;
  totalExpenses: number;
  numOfParticipants: number;
  individualContribution: number;
  totalExpensesByUser: Record<string, number>;
  balances: Balance[];
}
