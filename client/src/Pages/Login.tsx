// src/Pages/Login.tsx

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';
import GoogleLoginBtn from '@/components/GoogleLoginBtn';
import manWithKey from '@/assets/man-with-key.svg';

const Login = () => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex  font-montserrat">
      <div className="flex-col min-h-screen hidden md:flex md:w-2/3 p-10 text-3xl lg:text-4xl xl:p-16">
        <h1 className="xl:text-5xl text-[#192F45] font-montserrat font-medium max-w-3xl">
          Sign in or create an account securely with Google.
        </h1>
        <div className="flex">
          <img
            src={manWithKey}
            alt="man with a key opening a lock"
            className=" w-full xl:w-2/3 mt-6"
          />
        </div>
      </div>
      <div className="flex-col gap-4 justify-center p-10 xl:p-16 min-h-screen flex w-full md:w-1/3 bg-custom-gradient-dark text-white/90">
        <h2 className="text-2xl font-medium">No fees, no fuss</h2>
        <p className="font-light">
          <span className="font-semibold">Splitit™</span>  is completely free to
          use—no credit card required. Enjoy seamless expense management without
          any hidden costs or subscriptions.
        </p>
        <div className="mt-1">
          <GoogleLoginBtn />
        </div>
      </div>
    </div>
  );
};

export default Login;
