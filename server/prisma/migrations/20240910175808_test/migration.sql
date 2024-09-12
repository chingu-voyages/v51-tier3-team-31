/*
  Warnings:

  - You are about to drop the column `loked` on the `user_expensegroup` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user_expensegroup" DROP COLUMN "loked",
ADD COLUMN     "locked" BOOLEAN NOT NULL DEFAULT false;
