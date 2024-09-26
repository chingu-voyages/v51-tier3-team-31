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

// Controller for the route that checks the user in the database
export const checkUserInDatabase = async (req: Request, res: Response) => {
  const user = (req as any).user; // Access the authenticated user's data (from JWT)

  if (!user || !user.id) {
    return res.status(401).json({ message: 'User not found or unauthorized' });
  }

  try {
    // Find the user in the database using Prisma
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id }, // Assumes the user ID is stored in the token
    });

    if (!dbUser) {
      return res.status(401).json({ message: 'User not found in the database' });
    }

    // Log the user’s name from the database
    console.log(`User ${dbUser.name} is authorized`);

    // Send a response with the user’s name
    return res.json({ message: `You are authorized, ${dbUser.name}` });
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
