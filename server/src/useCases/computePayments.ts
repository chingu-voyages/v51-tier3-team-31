import { ExpenseGroup, Prisma } from "@prisma/client";
import ExpenseGroupController from "../controllers/expense-group.controller";
import { Balance, computeBalances } from "./computeBalances";

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
  fromUserName?: string;
  fromUserEmail?: string;

  toUserId: number;
  toUserName?: string;
  toUserEmail?: string;

  amountToPay: number;
};

export const computePayments = async (
  expenseGroup: ExpenseGroupWithReferences
) => {
  try {
    const computedBalances = await computeBalances(expenseGroup);

    const initialBalances = computedBalances.balances;



    const maxIterationNumber = 5 * computedBalances.numOfParticipants; // assumed as a convention, to avoid Stack Overflow Error
    let currentIterationNumber = 0;

    let endOfIterations = false;
    let payments: Payment[] = [];

    // clone initialBalances
    let currentBalances: Balance[] = [];
    initialBalances.forEach((val) =>
      currentBalances.push(Object.assign({}, val))
    );

    if (verifyAllBalancesZero(currentBalances)) {
      // particular case where all balances are already zero - no payments needed
      endOfIterations = true;
    }

    console.log("Initial Balances: " + JSON.stringify(currentBalances));

    // iterate until all balances are set to zero
    while (!endOfIterations) {
      currentIterationNumber++;

      console.log("--------- START Iteration#" + currentIterationNumber);

      currentBalances = currentBalances
        .filter((balanceItem) => balanceItem.balance !== 0) // eliminate the balances thar are already zero
        .sort((a, b) => a.balance - b.balance); // Sort balances Ascending, negatives first

      // try to match the biggest positive with   the biggest negative
      const topNegativePosition = 0;
      const topPositivePosition = currentBalances.length - 1;
      const topNegativeBalance = currentBalances[topNegativePosition];
      const topPositiveBalance = currentBalances[topPositivePosition];

      let paymentAmount = 0;
      if (
        Math.abs(topNegativeBalance.balance) <=
        Math.abs(topPositiveBalance.balance)
      ) {
        // all debt from this user will be fulfilled with this payment
        paymentAmount = Math.abs(topNegativeBalance.balance);
        // update balances considering this payment
        currentBalances[topNegativePosition].balance = 0;
        currentBalances[topPositivePosition].balance -= paymentAmount;
      } else {
        // more payments will be needed to fulfill the debt from this user
        // all debt from this user will be fulfilled with this payment
        paymentAmount = topPositiveBalance.balance;
        // update balances considering this payment
        currentBalances[topNegativePosition].balance += paymentAmount;
        currentBalances[topPositivePosition].balance = 0;
      }

      // Create a new Payment
      const newPayment: Payment = {
        fromUserId: topNegativeBalance.userId,
        fromUserName: topNegativeBalance.userName,
        fromUserEmail: topNegativeBalance.userEmail,

        toUserId: topPositiveBalance.userId,
        toUserName: topPositiveBalance.userName,
        toUserEmail: topPositiveBalance.userEmail,

        amountToPay: paymentAmount,
      };
      payments.push(newPayment);

      console.log("New Payment: " + JSON.stringify(newPayment));

      const areAllBalancesZero = verifyAllBalancesZero(currentBalances);

      // evaluate if this is the last iteration
      if (currentIterationNumber >= maxIterationNumber || areAllBalancesZero) {
        endOfIterations = true;
      }

      console.log("currentIterationNumber: " + currentIterationNumber);
      console.log("areAllBalancesZero " + areAllBalancesZero);

      console.log("--------- END Iteration#" + currentIterationNumber + "\n");
    }

    return {
      initialBalances: initialBalances,
      finalBalances: currentBalances,
      payments: payments,

      // -------
      //     expenseGroupId: expenseGroup.id,
      //   totalExpenses: 0,
      //   numOfParticipants: 0,
      //   individualContribution: 0,
      //   payments: payments,
      //   ------
    };
  } catch (e) {
    throw new Error("Error computing Payments.");
  }
};

// #region "Auxiliary functions"
const verifyAllBalancesZero = (balances: Balance[]): boolean => {
  // if balances array is empty -> all balances are already zero
  if (balances.length === 0) {
    return true;
  }

  // Sum ABS of Balances, to verify if are all zeros
  const sumAbsBalances = balances.reduce((accumulator, currentValue) => {
    return accumulator + Math.abs(currentValue.balance);
  }, 0);

  if (sumAbsBalances === 0) {
    return true;
  } else {
    return false;
  }
};
// #endregion "Auxiliary functions"
