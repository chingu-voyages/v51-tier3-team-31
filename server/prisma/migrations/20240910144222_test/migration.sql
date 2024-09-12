/*
  Warnings:

  - You are about to drop the column `updatedat` on the `expensegroup` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `expensegroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "expensegroup" DROP COLUMN "updatedat",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
