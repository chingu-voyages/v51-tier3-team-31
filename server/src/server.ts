import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors';

import ExpenseGroupRouter from "./routes/expense-group.route";
import authenticationRoutes from "./routes/authenticationRoutes";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/passportConfig";
import CategoryRouter from "./routes/category.route";
import UserRouter from "./routes/user.route";
import ExpenseRouter from "./routes/expense.route";
import UserExpenseGroupRouter from "./routes/user-expense-group.route";
import authorizationRoutes from "./routes/authorizationRoutes";
import corsOptions from "./config/corsConfig";

import { openAPI_Definition } from "./schemas/openApiDefinition";

export const prisma = new PrismaClient();

const app = express();
const port = 8080;

async function main() {

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(passport.initialize());


  // Enable Swagger Documentation
  const swaggerUi = require("swagger-ui-express");
  const swaggerDocument = openAPI_Definition 
  app.use("/api/v1/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


  // Register API routes
  app.use("/api/v1/expense-groups", ExpenseGroupRouter);
  app.use("/api/v1/categories", CategoryRouter);
  app.use("/api/v1/expenses", ExpenseRouter);
  app.use("/api/v1/participants", UserExpenseGroupRouter);
  app.use("/api/v1/users", UserRouter);  

  app.use("/api/v1/auth", authenticationRoutes)
  app.use("/api/v1/author", authorizationRoutes)  // TODO: Remove it later (only for first testing purpose)
  // // Catch unregistered routes
  // app.all("*", (req: Request, res: Response) => {
  //   res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  // });

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
