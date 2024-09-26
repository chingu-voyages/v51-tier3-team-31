import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controller for the protected page (API response version)
export const getProtectedPage = (req: Request, res: Response) => {
  const user = (req as any).user; // Access the authenticated user's data (from JWT)

  if (!user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  // Respond with a JSON object containing user information
  return res.status(200).json({
    message: 'Access to protected page granted',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,  // Assuming email is part of the token payload
    },
  });
};
