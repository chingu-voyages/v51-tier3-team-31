import { Request, Response } from "express";
import { prisma } from "../server";
import { sendEmail } from "../utils/emailUtils"; // Updated import
import { computeBalances } from "../useCases/computeBalances";
import { computePayments } from "../useCases/computePayments";
import dotenv from "dotenv";
import { string } from "zod";

dotenv.config();

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
        expenseGroupId: newExpenseGroup.id,
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
      include: {
        userExpenseGroups: {
          include: {
            user: true,
          },
        },
        expenses: true,
      },
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
      include: {
        userExpenseGroups: {
          include: {
            user: true,
          },
        },
        expenses: true,
      },
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
    const { id, expenseGroupId, sentBy, invitedEmail } = req.body; // the user email that is being invited
    // Create the new invitation, status is "Pending" by default
    const newInvitation = await prisma.invitation.create({
      data: {
        id,
        expenseGroupId,
        sentBy,
        invitedEmail,
      },
    });

    const expenseGroup = await prisma.expenseGroup.findUnique({where: { id: newInvitation.expenseGroupId }});
    const invitingUser = await prisma.user.findUnique({where: { id:newInvitation.sentBy }});

    await sendEmail(
      invitedEmail,
      "You were invited to be part of a SplitIt Expense Group",
      "",
      composeEmailBody(expenseGroup?.name, invitingUser?.name),
    );

    res.status(200).json(newInvitation);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getPendingInvitations = async (req: Request, res: Response) => {
  try {
    const filterUserEmail = req.query["user-email"];

    if (!filterUserEmail) {
      res.status(404).json({ error: "user-email not received on URL" });
      return;
    }
    const pendingInvitations = await prisma.invitation.findMany({
      include: { sender: true, expenseGroup: true },
      where: { invitedEmail: filterUserEmail.toString(), status: "Pending" },
    });

    res.status(200).json(pendingInvitations);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const replyInvitation = async (req: Request, res: Response) => {
  try {
    const { invitationId, reply } = req.body;

    // Verify if invitation exists, and get it
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
    });

    if (!invitation) {
      res
        .status(404)
        .json({ error: "Invitation with this id can not be found." });
      return;
    }

    if (reply !== "Accepted" && reply !== "Declined") {
      res.status(400).json({
        error: "The reply, on request body, must be 'Accept' or 'Decline'.",
      });
      return;
    }

    // If reply was "Accepted", verify the need to create a new User
    let invitedUser: any | null = {};
    if (reply == "Accepted") {
      // Verify if user exists, and get it
      invitedUser = await prisma.user.findUnique({
        where: { email: invitation.invitedEmail },
      });

      // If the User do not exist, a new one will be created
      if (!invitedUser) {
        const newUser = await prisma.user.create({
          data: {
            name: invitation.invitedEmail,
            googleId: invitation.invitedEmail,
            email: invitation.invitedEmail,
          },
        });
        invitedUser = newUser;
      }
    }

    // update Invitation - "Accepted" or "Declined"
    const updatedInvitation = await prisma.invitation.update({
      where: { id: invitationId },
      data: {
        status: reply,
      },
    });

    let newParticipant: any | null = {};
    if (reply == "Accepted") {
      // Create the new participant, only if the reply was "Accepted"
      newParticipant = await prisma.userExpenseGroup.create({
        data: {
          userId: invitedUser.id,
          expenseGroupId: Number(updatedInvitation.expenseGroupId),
          contributionWeight: 0,
          description: "",
          locked: false,
          lockedAt: "2020-01-01T00:00:00.0Z",
        },
      });
    }

    // IMPORTANT: TODO: create new User (when needed) and create new Participant - should be on same DB Transaction!!

    res.status(200).json(newParticipant);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getBalances = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const expenseGroup = await prisma.expenseGroup.findUnique({
      include: {
        userExpenseGroups: {
          include: {
            user: true,
          },
        },
        expenses: true,
      },
      where: { id },
    });

    if (expenseGroup) {
      const expenseGroupBalances = await computeBalances(expenseGroup);

      res.status(200).json(expenseGroupBalances);
    } else {
      res
        .status(404)
        .json({ error: "Expense Group with this id can not be found." });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getPayments = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);

    const expenseGroup = await prisma.expenseGroup.findUnique({
      include: {
        userExpenseGroups: {
          include: {
            user: true,
          },
        },
        expenses: true,
      },
      where: { id },
    });

    if (expenseGroup) {
      const expenseGroupPayments = await computePayments(expenseGroup);

      res.status(200).json(expenseGroupPayments);
    } else {
      res
        .status(404)
        .json({ error: "Expense Group with this id can not be found." });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const composeEmailBody = (expenseGroupName?: string, invitingUserName?: string) => {
  return `
  
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Email Title</title>
    <style type="text/css">
        /* Add your CSS here */
    </style>
</head>
<body>
    <p>Hi there,</p>

<p>You have been invited by ${invitingUserName} to join the expense group ${expenseGroupName} on SplitIt.</p>

<p>To accept the invitation, please log in to your SplitIt account or create one if you don’t have an account yet. Once you’re logged in, you can accept the invitation.</p>

<p>Click the link below to get started: <br>
<a href="${process.env.CLIENT_HOME_PAGE_URL}/login">Log in to SplitIt</a>
</p>

<p>If the link above doesn’t work, you can also copy and paste this link into your browser: <br>
${process.env.CLIENT_HOME_PAGE_URL}/login
</p>

<p>We look forward to having you in the group!</p>


<p>Best regards, <br>
The SplitIt Team </p>
</body>
</html>
  `;
};

export default {
  createExpenseGroup,
  getExpenseGroupById,
  getExpenseGroups,
  updateExpenseGroup,
  deleteExpenseGroup,
  inviteParticipant,
  getPendingInvitations,
  replyInvitation,
  getBalances,
  getPayments,
};
