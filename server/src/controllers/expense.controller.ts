import { Request, Response } from "express";
import { prisma } from "../server";

const createExpense = async (req: Request, res: Response) => {
  try {
    const {
      expenseGroupId,
      name,
      description,
      categoryId,
      amount,
      createdBy,
      receiptURL,
      receiptThumbnailURL,
    } = req.body;

    const newExpense = await prisma.expense.create({
      data: {
        expenseGroupId: parseInt(expenseGroupId),
        name,
        description,
        categoryId: parseInt(categoryId),
        amount: parseInt(amount),
        createdBy: parseInt(createdBy),
        receiptURL,
        receiptThumbnailURL,
      },
    });
    res.status(201).json(newExpense);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getExpenseById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const expense = await prisma.expense.findUnique({
      where: {
        id: id,
      },
    });
    if (expense) {
      res.status(200).json(expense);
    } else {
      res.status(404).json({ error: "Expense with this id can not be found." });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getExpenses = async (req: Request, res: Response) => {
  try {
    const filterExpenseGroupId = req.query["expense-group-id"];

    const expenses = await prisma.expense.findMany({
      where: filterExpenseGroupId // if this query param is not in URL, all records will be returned
        ? {
            expenseGroupId: { equals: Number(filterExpenseGroupId) },
          }
        : {},
    });

    res.status(200).json(expenses);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateExpense = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const {
      expenseGroupId,
      name,
      description,
      categoryId,
      amount,
      createdBy,
      receiptURL,
      receiptThumbnailURL,
    } = req.body;

    const updatedExpense = await prisma.expense.update({
      where: {
        id: id,
      },
      data: {
        expenseGroupId: parseInt(expenseGroupId),
        name,
        description,
        categoryId: parseInt(categoryId),
        amount: parseFloat(amount),
        createdBy: parseInt(createdBy),
        receiptURL,
        receiptThumbnailURL,
      },
    });
    res.status(200).json(updatedExpense);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteExpense = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deletedExpense = await prisma.expense.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(deletedExpense);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createExpense,
  getExpenseById,
  getExpenses,
  updateExpense,
  deleteExpense,
};
