import { Request, Response } from "express";
import { prisma } from "../server";

const createExpenseGroup = async (req: Request, res: Response) => {
  try {
    const { id, name, description, budget, createdBy } = req.body;
    const newExpenseGroup = await prisma.expenseGroup.create({
      data: {
        id,
        name,
        description: description || null,
        budget: parseFloat(budget),
        createdBy,
      },
    });

    // create the first Participant for this EXpenseGroup - the User that just created it
    const newParticipant = await prisma.userExpenseGroup.create({
      data: {
        userId: createdBy,
        expenseGroupId : newExpenseGroup.id,
        contributionWeight: 0,
        description: "This Expense Group was created by this User.",
        locked: false,
        lockedAt: "2000-01-01T00:00:00.001Z", // not relevant when locked = false; just to avoid the not null validation
      },
    });

    // IMPORTANT - ToDo: Creating new ExpenseGroup and new Participant should be om the same DB Transaction, ensuring the database remains consistent and reliable

    res.status(201).json(newExpenseGroup);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getExpenseGroupById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const expenseGroup = await prisma.expenseGroup.findUnique({
      include: { userExpenseGroups: true, expenses: true },
      where: { id },
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
    const filterUserId = req.query["user-id"];

    const expenseGroups = await prisma.expenseGroup.findMany({
      include: { userExpenseGroups: true, expenses: true },
      where: filterUserId // if this query param is not in URL, all records will be returned
        ? {
            userExpenseGroups: {
              some: { userId: Number(filterUserId) },
            },
          }
        : {},
    });

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
      where: { id },
      data: {
        name,
        description: description || null,
        budget: parseFloat(budget),
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
      where: { id },
    });
    res.status(200).json(deletedExpenseGroup);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const inviteParticipant = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id); // the Expense Group Id
    const { expenseGroupId, userEmail } = req.body; // the user email that is being invited

    // Verify if user exists, and get it
    const invitedUser = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    let invitedUserId = 0;
    if (invitedUser) {
      // If exists get the Id
      invitedUserId = invitedUser.id;
    } else {
      // if not, create a new one, and get the Id
      const newUser = await prisma.user.create({
        data: {
          name: "",
          googleId: userEmail,
          email: userEmail,
        },
      });
      invitedUserId = newUser.id;
    }

    // Create the new participant
    const newParticipant = await prisma.userExpenseGroup.create({
      data: {
        userId: invitedUserId,
        expenseGroupId,
        contributionWeight: 0,
        description: "",
        locked: false,
        lockedAt: "2024-09-10T17:43:02.424Z",
      },
    });

    // IMPORTANT: TODO: create new User (when needed) and create new Participant - should be on same DB Transaction!!

    res.status(200).json(newParticipant);
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
  inviteParticipant,
};
