import { Request, Response } from "express";
import { prisma } from "../server";

const createUser = async (req: Request, res: Response) => {
  try {
    const { id, name, googleId, email } = req.body;
    const newUser = await prisma.user.create({
      data: {
        id,
        name,
        googleId,
        email,
      },
    });
    res.status(201).json(newUser);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User with this id can not be found." });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, googleId, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name,
        googleId,
        email,
      },
    });
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(deletedUser);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
};
