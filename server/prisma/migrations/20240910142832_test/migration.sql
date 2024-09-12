/*
  Warnings:

  - You are about to drop the `ExpenseGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ExpenseGroup";

-- CreateTable
CREATE TABLE "expensegroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "budget" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "expensegroup_pkey" PRIMARY KEY ("id")
);
