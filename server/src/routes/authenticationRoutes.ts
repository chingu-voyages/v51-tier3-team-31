// routes/authRoutes.ts
import express from 'express';
import passport from 'passport';
import { googleCallback, refreshAccessToken, logout} from '../controllers/authenticationControllers';

const router = express.Router();

// Google OAuth Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/', session: false }), googleCallback);

// Refresh Access Token and Logout
router.post('/refresh-token', refreshAccessToken);
router.get('/logout', logout);


export default router;
