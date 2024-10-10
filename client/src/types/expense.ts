export interface Expense {
  id: number;
  expenseGroupId: number;
  name: string;
  description: string;
  categoryId: number;
  amount: string;
  createdBy: number;
  receiptURL: string;
  createdAt: string;
  updatedAt: string;
  receiptThumbnailURL: string;
}
