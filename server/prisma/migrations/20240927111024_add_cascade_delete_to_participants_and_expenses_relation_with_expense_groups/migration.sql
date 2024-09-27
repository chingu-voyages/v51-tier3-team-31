-- DropForeignKey
ALTER TABLE "expenses" DROP CONSTRAINT "expenses_expense_group_id_fkey";

-- DropForeignKey
ALTER TABLE "user_expensegroup" DROP CONSTRAINT "user_expensegroup_expense_group_id_fkey";

-- AddForeignKey
ALTER TABLE "user_expensegroup" ADD CONSTRAINT "user_expensegroup_expense_group_id_fkey" FOREIGN KEY ("expense_group_id") REFERENCES "expense_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_expense_group_id_fkey" FOREIGN KEY ("expense_group_id") REFERENCES "expense_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
