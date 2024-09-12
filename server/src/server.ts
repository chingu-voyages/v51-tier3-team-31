import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import ExpenseGroupRouter from "./routes/expense-group.route";
import CategoryRouter from "./routes/category.route";
import UserRouter from "./routes/user.route";
import ExpenseRouter from "./routes/expense.route";
import UserExpenseGroupRouter from "./routes/user-expense-group.route";

export const prisma = new PrismaClient();

const app = express();
const port = 8080;

async function main() {
  app.use(express.json());

  // Register API routes
  app.use("/api/v1/expense-group", ExpenseGroupRouter);
  app.use("/api/v1/category", CategoryRouter);
  app.use("/api/v1/user", UserRouter);
  app.use("/api/v1/expense", ExpenseRouter);
  app.use("/api/v1/user-expense-group", UserExpenseGroupRouter);

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
