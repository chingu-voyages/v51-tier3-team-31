-- AddForeignKey
ALTER TABLE "user_expensegroup" ADD CONSTRAINT "user_expensegroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
