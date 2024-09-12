import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import ExpenseGroupRouter from "./routes/expense-group.route";
import authenticationRoutes from "./routes/authenticationRoutes";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/passportConfig";

export const prisma = new PrismaClient();

const app = express();
const port = 8080;

async function main() {

  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(passport.initialize());

  // Register API routes
  app.use("/api/v1/expense-group", ExpenseGroupRouter);

  app.use("/api/v1/auth", authenticationRoutes)

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