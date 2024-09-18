// src/Pages/Login.tsx

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

const Login = () => {
  const { isLoggedIn, login } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-2xl font-bold">Login Page</h1>
      <button
        onClick={login}
        className="px-4 py-2 border flex gap-2 bg-slate-800 border-slate-700 rounded-lg my-3 text-slate-200  hover:border-slate-500  hover:text-slate-300 hover:shadow transition duration-150"
      >
        <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default Login;
