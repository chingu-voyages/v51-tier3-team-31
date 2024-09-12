import { Request, Response } from "express";
import { prisma } from "../server";

const createExpenseGroup = async (req: Request, res: Response) => {
  try {
    const { id, name, description, budget } = req.body;
    const newExpenseGroup = await prisma.expenseGroup.create({
      data: {
        id,
        name,
        description,
        budget,
      },
    });
    res.status(201).json(newExpenseGroup);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getExpenseGroupById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const expenseGroup = await prisma.expenseGroup.findUnique({
      where: {
        id: id,
      },
    });
    if (expenseGroup) {
      res.status(200).json(expenseGroup);
    } else {
      res
        .status(404)
        .json({ error: "Expense Group with this id can not be found." });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getExpenseGroups = async (req: Request, res: Response) => {
  try {
    const expenseGroups = await prisma.expenseGroup.findMany();
    res.status(200).json(expenseGroups);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateExpenseGroup = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, budget } = req.body;
    const updatedExpenseGroup = await prisma.expenseGroup.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
        budget,
      },
    });
    res.status(200).json(updatedExpenseGroup);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteExpenseGroup = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deletedExpenseGroup = await prisma.expenseGroup.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(deletedExpenseGroup);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createExpenseGroup,
  getExpenseGroupById,
  getExpenseGroups,
  updateExpenseGroup,
  deleteExpenseGroup,
};
