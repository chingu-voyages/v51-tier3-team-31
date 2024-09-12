-- AddForeignKey
ALTER TABLE "user_expensegroup" ADD CONSTRAINT "user_expensegroup_expense_group_id_fkey" FOREIGN KEY ("expense_group_id") REFERENCES "expense_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_expense_group_id_fkey" FOREIGN KEY ("expense_group_id") REFERENCES "expense_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
