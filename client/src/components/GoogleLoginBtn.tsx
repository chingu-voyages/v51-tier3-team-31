import { useAuth } from '@/hooks/useAuth';
import googleLoginButton from '@/assets/Google-btn.svg';

const GoogleLoginBtn = () => {
  const { login } = useAuth();

  return (
    <button onClick={login} className='w-fit'>
      <img
        src={googleLoginButton}
        loading="lazy"
        alt="google logo"
        className='shadow-sm rounded-full hover:shadow-md hover:opacity-90'
      />
    </button>
  );
};

export default GoogleLoginBtn;
