import express from "express";
import ExpenseController from "../controllers/expense.controller";

const router = express.Router();

router.post("/", ExpenseController.createExpense);
router.get("/:id", ExpenseController.getExpenseById);
router.get("/", ExpenseController.getExpenses);
router.put("/:id", ExpenseController.updateExpense);
router.delete("/:id", ExpenseController.deleteExpense);

export default router;
