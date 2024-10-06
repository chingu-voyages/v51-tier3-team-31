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
    <div className="flex flex-col min-h-screen justify-center items-center px-3">
      <h1 className="text-xl max-w-xs text-center">
        Sign in or create an account securely with Google.
      </h1>
      <div className="mt-8 felx flex-col max-w-sm">
        <button
          onClick={login}
          className="px-4 py-2 w-full border flex gap-2  bg-primary-foreground  border-primary/10 rounded-lg my-3 text-primary   hover:text-primary/90 hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Login with Google</span>
        </button>
        <button
          onClick={login}
          className="px-4 py-2 w-full border flex gap-2 border-primary/10 rounded-lg my-3 text-secondary bg-slate-600 hover:text-secondary hover:shadow transition duration-150"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
          <span>Register with Google</span>
        </button>
      </div>
      <p className="text-center text-md my-5 font-medium text-slate-600">No fees, no fuss!</p>
      <p className="text-center max-w-sm text-sm text-slate-600">
       <span className='text-blue-600' >Splitit&#8482;</span>  is completely free to use—no credit card required. Enjoy
        seamless expense management without any hidden costs or subscriptions.
      </p>
    </div>
  );
};

export default Login;
