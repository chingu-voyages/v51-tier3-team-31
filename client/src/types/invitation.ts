export interface Invitation {
  id: number;
  expenseGroupId: number;
  sentBy: number;
  invitedEmail: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  createdAt: string; 
  updatedAt: string; 
}
