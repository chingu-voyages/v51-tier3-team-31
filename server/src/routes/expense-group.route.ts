import express from "express";
import ExpenseGroupController from "../controllers/expense-group.controller";

const router = express.Router();

router.post("/", ExpenseGroupController.createExpenseGroup);
router.get("/:id", ExpenseGroupController.getExpenseGroupById);
router.get("/", ExpenseGroupController.getExpenseGroups);
router.put("/:id", ExpenseGroupController.updateExpenseGroup);
router.delete("/:id", ExpenseGroupController.deleteExpenseGroup);

export default router;
