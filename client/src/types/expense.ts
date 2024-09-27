export interface Expense {
    id: number;
    expenseGroupId: number;
    name: string;
    description: string;
    categoryId: number;
    amount: string; // This could be 'number' if the amount should be a numerical value.
    createdBy: number;
    receiptURL: string;
    createdAt: string; // Can be 'Date' if parsed as a Date object
    updatedAt: string; // Can be 'Date' if parsed as a Date object
  }