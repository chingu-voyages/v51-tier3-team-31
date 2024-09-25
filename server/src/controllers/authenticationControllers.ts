import { Request, Response } from 'express';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../middleware/jwt';
import { PrismaClient } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

export const googleCallback = async (req: Request, res: Response) => {
  if (req.user) {
    const googleUser = req.user as any;

    try {
      // Extract Google ID, name, and email correctly
      const googleId = googleUser.id;
      const name = googleUser.name;
      const email = googleUser.email;

      // Check for missing fields
      if (!googleId || !email || !name) {
        return res
          .status(400)
          .json({ message: 'Google authentication data is incomplete' });
      }

      // Check if the user exists in the database
      let dbUser = await prisma.user.findUnique({
        where: { googleId: String(googleId) }, // Ensure googleId is passed as a string
      });

      // If the user does not exist, register them
      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            googleId: String(googleId), // Ensure googleId is passed correctly
            name,
            email,
          },
        });
        console.log('User registered:', dbUser);
      }

      // Generate access and refresh tokens for the authenticated user
      const accessToken = generateAccessToken(dbUser.id);
      const refreshToken = generateRefreshToken(dbUser.id);

      // Set the cookies for the tokens
      res.cookie('access_token', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 3600000, // 1 hour
        sameSite: 'none',
      });

      res.cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: 'none',
      });

      const googleRedirectAddress = process.env.GOOGLE_REDIRECT_ADDRESS;

      if (googleRedirectAddress) {
        res.redirect(googleRedirectAddress);
      } else {
        return res
          .status(500)
          .json({ message: 'Google redirect address is not configured' });
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(401).json({ error: 'Authentication failed' });
  }
};

// Logout Controller
export const logout = (req: Request, res: Response) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.clearCookie('refresh_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.json({ message: 'Logged out successfully' });
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    // Check if the decoded token is of type JwtPayload
    if (typeof decoded === 'string') {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Type assertion
    const userId = (decoded as JwtPayload).id; // Type assertion

    if (!userId) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Retrieve the user's email from the database using the userId
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, email: true },
    });

    const accessToken = generateAccessToken(userId);
    res.json({ accessToken, user });
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
