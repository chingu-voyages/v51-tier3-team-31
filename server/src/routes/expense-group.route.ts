import express from "express";
import ExpenseGroupController from "../controllers/expense-group.controller";

const router = express.Router();

router.get(
  "/pending-invitations",
  ExpenseGroupController.getPendingInvitations
);
router.post("/reply-invitation", ExpenseGroupController.replyInvitation);
router.get("/:id/balances", ExpenseGroupController.getBalances);
router.get("/:id/payments", ExpenseGroupController.getPayments);

router.post("/", ExpenseGroupController.createExpenseGroup);
router.get("/:id", ExpenseGroupController.getExpenseGroupById);
router.get("/", ExpenseGroupController.getExpenseGroups);
router.put("/:id", ExpenseGroupController.updateExpenseGroup);
router.delete("/:id", ExpenseGroupController.deleteExpenseGroup);

router.post("/invite-participant", ExpenseGroupController.inviteParticipant);

router.get("/balances", ExpenseGroupController.getBalances);

export default router;
