/*
  Warnings:

  - Added the required column `created_by` to the `expense_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expense_groups" ADD COLUMN     "created_by" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "expense_groups" ADD CONSTRAINT "expense_groups_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
