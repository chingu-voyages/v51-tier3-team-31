import express from "express";
import UserExpenseGroupController from "../controllers/user-expense-group.controller";

const router = express.Router();

router.post("/", UserExpenseGroupController.createUserExpenseGroup);
router.get("/:id", UserExpenseGroupController.getUserExpenseGroupById);
router.get("/", UserExpenseGroupController.getUserExpenseGroups);
router.put("/:id", UserExpenseGroupController.updateUserExpenseGroup);
router.delete("/:id", UserExpenseGroupController.deleteUserExpenseGroup);

export default router;
