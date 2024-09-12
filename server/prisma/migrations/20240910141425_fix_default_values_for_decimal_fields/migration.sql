-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "amount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "ExpenseGroup" ALTER COLUMN "budget" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "UserExpenseGroup" ALTER COLUMN "contributionWeight" SET DEFAULT 0;
