import { FaGoogle } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then(result => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photo: result.user?.photoURL,
      };
      axiosPublic.post('/users', userInfo).then(res => {
        console.log(res.data);
        navigate('/');
      });
    });
  };

  return (
    <div className="">
      <div className="flex items-center w-full my-3">
        <hr className="w-full " />
        <p className="px-3 ">OR</p>
        <hr className="w-full " />
      </div>
      <div>
        <button
          onClick={handleGoogleSignIn}
          aria-label="Login with Google"
          type="button"
          className="flex items-center justify-center font-bold text-blue-500 w-full p-3 space-x-4 border-2 rounded-md focus:ring-2 focus:ring-offset-1 border-[#399edd] focus:dark:ring-violet-600"
        >
          <FaGoogle className="" />
          <p>Login with Google</p>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
