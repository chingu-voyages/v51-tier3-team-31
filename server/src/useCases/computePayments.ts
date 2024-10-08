import { ExpenseGroup, Prisma } from "@prisma/client";
import ExpenseGroupController from "../controllers/expense-group.controller";

// a new type is needed because default Prisma Types do not include model references
const expenseGroupWithReferences =
  Prisma.validator<Prisma.ExpenseGroupDefaultArgs>()({
    include: { expenses: true, userExpenseGroups: { include: { user: true } } },
  });
type ExpenseGroupWithReferences = Prisma.ExpenseGroupGetPayload<
  typeof expenseGroupWithReferences
>;

// The Payment from an User to another User on an final accountability for an Expense Group
type Payment = {
  fromUserId: number;
  fromUserName: string;
  fromUserEmail: string;

  toUserId: number;
  toUserName: string;
  toUserEmail: string;

  amountToPay: number;
};


// Dummy data - TBD
const payments: Payment[] = [
  {
    fromUserId: 1,
    fromUserName: "Jonh Doe",
    fromUserEmail: "jonh.doe@gmail.com",
    toUserId: 2,
    toUserName: "Jane Doe",
    toUserEmail: "jane.doe@gmail.com",
    amountToPay: 1000,
  },
  {
    fromUserId: 3,
    fromUserName: "User Name 0003",
    fromUserEmail: "user003@gmail.com",
    toUserId: 4,
    toUserName: "User Name 0004",
    toUserEmail: "user004@gmail.com",
    amountToPay: 2000,
  },
];


export const computePayments = async (expenseGroup: ExpenseGroupWithReferences) => {
    try {
      
      
      return {
        expenseGroupId: expenseGroup.id,
        totalExpenses: 0,
        numOfParticipants: 0,
        individualContribution: 0,
        payments: payments,
      };
    } catch (e) {
      throw new Error("Error computing Payments.");
    }
  };
  