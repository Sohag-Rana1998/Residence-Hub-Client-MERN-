/* eslint-disable no-unused-vars */
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoogleSignIn = () => {
    googleSignIn().then(result => {
      // console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photo: result.user?.photoURL,
      };
      axiosPublic.post('/users', userInfo).then(res => {
        // console.log(res.data);
        Swal.fire({
          icon: 'success',
          title: 'Login successfully',
          timer: 1500,
        });
        navigate(location?.state || '/');
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
          className="flex btn  btn-outline items-center justify-center font-bold  w-full  space-x-4 border-2 rounded-md focus:ring-2 focus:ring-offset-1 border-[#399edd] "
        >
          <img
            src="https://docs.material-tailwind.com/icons/google.svg"
            alt="metamask"
            className="h-6 w-6"
          />{' '}
          <p>Login with Google</p>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
