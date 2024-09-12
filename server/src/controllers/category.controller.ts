import { Request, Response } from "express";
import { prisma } from "../server";

const createCategory = async (req: Request, res: Response) => {
  try {
    const {id, name } = req.body;
    const newCategory = await prisma.category.create({
      data: {
        id,
        name,
        
      },
    });
    res.status(201).json(newCategory);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res
        .status(404)
        .json({ error: "Category with this id can not be found." });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const updatedCategory = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    });
    res.status(200).json(updatedCategory);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deletedCategory = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    res.status(200).json(deletedCategory);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  createCategory,
  getCategoryById,
  getCategories,
  updateCategory,
  deleteCategory,
};
