import { Request, Response } from "express";
import { prisma } from "../server";

const createUserExpenseGroup = async (req: Request, res: Response) => {
  try {
    const {
      id,
      userId,
      expenseGroupId,
      contributionWeight,
      description,
      locked,
      lockedAt,
    } = req.body;
    const newUserExpenseGroup = await prisma.userExpenseGroup.create({
      data: {
        id,
        userId,
        expenseGroupId,
        contributionWeight,
        description,
        locked,
        lockedAt,
      },
    });
    res.status(201).json(newUserExpenseGroup);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
};

const getUserExpenseGroupById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userExpenseGroup = await prisma.userExpenseGroup.findUnique({
      where: {
        id: id,
      },
    });
    if (userExpenseGroup) {
      res.status(200).json(userExpenseGroup);
    } else {
      res
        .status(404)
        .json({ error: "UserExpenseGroup with this id can not be found." });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getUserExpenseGroups = async (req: Request, res: Response) => {
  try {
    const filterExpenseGroupId = req.query["expense-group-id"];

    const userExpenseGroups = await prisma.userExpenseGroup.findMany({
      where: filterExpenseGroupId // if this query param is not in URL, all records will be returned
        ? {
            expenseGroupId: { equals: Number(filterExpenseGroupId) },
          }
        : {},
    });

    res.status(200).json(userExpenseGroups);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateUserExpenseGroup = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const {
      userId,
      expenseGroupId,
      contributionWeight,
      description,
      locked,
      lockedAt,
    } = req.body;

    const updatedUserExpenseGroup = await prisma.userExpenseGroup.update({
      where: {
        id: id,
      },
      data: {
        userId,
        expenseGroupId,
        contributionWeight,
        description,
        locked,
        lockedAt,
      },
    });
    res.status(200).json(updatedUserExpenseGroup);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteUserExpenseGroup = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deletedUserExpenseGroup = await prisma.userExpenseGroup.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(deletedUserExpenseGroup);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createUserExpenseGroup,
  getUserExpenseGroupById,
  getUserExpenseGroups,
  updateUserExpenseGroup,
  deleteUserExpenseGroup,
};
