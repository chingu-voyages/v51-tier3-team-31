import express from "express";
import UserController from "../controllers/user.controller";

const router = express.Router();

router.post("/", UserController.createUser);
router.get("/:id", UserController.getUserById);
router.get("/", UserController.getUsers);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
