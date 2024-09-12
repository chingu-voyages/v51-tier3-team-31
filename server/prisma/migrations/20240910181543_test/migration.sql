/*
  Warnings:

  - You are about to drop the column `loked_at` on the `user_expensegroup` table. All the data in the column will be lost.
  - Added the required column `locked_at` to the `user_expensegroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_expensegroup" DROP COLUMN "loked_at",
ADD COLUMN     "locked_at" TIMESTAMP(3) NOT NULL;
