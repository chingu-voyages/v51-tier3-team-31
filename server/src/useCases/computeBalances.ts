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

// The Balance for an User on an Expense Group
export type Balance = {
  userId: number;
  userName?: string;
  userEmail?: string;
  amountPaid: number;
  balance: number;
};

export const computeBalances = async (
  expenseGroup: ExpenseGroupWithReferences
) => {
  try {
    // Compute Balances - 4 Steps

    // Step 1/4 - Sum all expenses
    const totalExpenses: number = expenseGroup.expenses.reduce(
      (totalExpenses, current) => totalExpenses + current.amount.toNumber(),
      0
    );

    // Step 2/4 - Compute individual contribution (Equally Divided)
    const numOfParticipants: number = expenseGroup.userExpenseGroups.length;
    const individualContribution: number = parseFloat(
      (totalExpenses / numOfParticipants).toFixed(2)
    );

    // Step 3/4 - Computed individual amount paid

    // IMPORTANT - ToDo: totals of expense amount should be grouped by participantId (to be created) and not by createdBy

    const totalExpensesByUser = expenseGroup.expenses.reduce<{
      [key: number]: number;
    }>((balances, expense) => {
      balances[expense.createdBy] =
        (balances[expense.createdBy] || 0) + expense.amount.toNumber(); // Accumulate the total
      return balances; // Return the accumulator for the next iteration
    }, {});

    // Step 4/4 - Compute individual Balance

    const balances: Balance[] = expenseGroup.userExpenseGroups.map(
      (participant) => {
        return <Balance>{
          userId: participant.userId,
          userName: participant.user.name,
          userEmail: participant.user.email,
          amountPaid: totalExpensesByUser[participant.userId] || 0,
          balance: parseFloat(
            (
              (totalExpensesByUser[participant.userId] || 0) -
              individualContribution
            ).toFixed(2)
          ),
        };
      }
    );

    return {
      expenseGroupId: expenseGroup.id,
      totalExpenses: totalExpenses,
      numOfParticipants: numOfParticipants,
      individualContribution: individualContribution,
      totalExpensesByUser: totalExpensesByUser,
      balances: balances,
    };
  } catch (e) {
    throw new Error("Error computing Balances");
  }
};
