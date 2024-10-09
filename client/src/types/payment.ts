export interface Payment {
  fromUserId: number;
  fromUserName: string;
  fromUserEmail: string;
  toUserId: number;
  toUserName: string;
  toUserEmail: string;
  amountToPay: number;
}

export interface ExpenseGroupPayments {
  expenseGroupId: number;
  totalExpenses: number;
  numOfParticipants: number;
  individualContribution: number;
  payments: Payment[];
}
