import express from "express";
import CategoryController from "../controllers/category.controller";

const router = express.Router();

router.post("/", CategoryController.createCategory);
router.get("/:id", CategoryController.getCategoryById);
router.get("/", CategoryController.getCategories);
router.put("/:id", CategoryController.updateCategory);
router.delete("/:id", CategoryController.deleteCategory);

export default router;
