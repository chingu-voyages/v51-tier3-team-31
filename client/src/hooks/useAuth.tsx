// src/hooks/useAuth.jsx

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverBaseUrl } from '@/config';

// Define the type for the context value

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  accessToken: string | null;
  authError: string | null;
  user: {
    id: string | null;
    email: string | null;
  } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [user, setUser] = useState<{
    id: string | null;
    email: string | null;
  } | null>(null);
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = () => {
    // Redirect the user to the backend, which will initiate the Google OAuth flow
    window.location.href = `${serverBaseUrl}/api/v1/auth/google`;
  };

  // Call this function to sign out logged in user
  const logout = async () => {
    try {
      // Call the logout API
      await axios.get(`${serverBaseUrl}/api/v1/auth/logout`, {
        withCredentials: true,
      });

      // Clear local state
      setIsLoggedIn(false);
      setAccessToken(null);
      setUser(null);

      // Redirect to the login page
      navigate('/');
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  // Memoize checkSession to avoid unnecessary re-creation on every render
  const checkSession = useCallback(async () => {
    try {
      const response = await axios.post(
        `${serverBaseUrl}/api/v1/auth/refresh-token`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        setIsLoggedIn(true);
        const accessToken = response.data.accessToken;
        const user = response.data.user;
        setAccessToken(accessToken);
        setUser(user);
      }
    } catch (error: unknown) {
      console.log('You are not logged in');
      // Type check to ensure 'error' has a 'message' property
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError('An unknown error occurred');
      }
      setIsLoggedIn(false);
      setAccessToken(null);
      navigate('/');
    }
  }, [navigate]);

  // Automatically check session when AuthProvider is mounted
  useEffect(() => {
    checkSession(); // Check if there's a valid session on load
  }, [checkSession]);

  const value = { isLoggedIn, login, logout, accessToken, authError, user };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
