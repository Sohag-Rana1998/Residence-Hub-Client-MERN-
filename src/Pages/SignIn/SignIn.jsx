import {
  Link,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router-dom';
// import {
//   loadCaptchaEnginge,
//   LoadCanvasTemplate,
//   validateCaptcha,
// } from 'react-simple-captcha';

import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
// import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { useForm } from 'react-hook-form';
import ScaleLoader from 'react-spinners/ScaleLoader';

const SignIn = () => {
  // const captChaRef = useRef();
  const [type, setType] = useState(false);
  const location = useLocation();
  const { signIn } = useAuth();

  const navigate = useNavigate();

  // console.log(location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    const email = data.email;
    const password = data.password;

    // const user_captcha_value = captChaRef.current.value;
    // if (validateCaptcha(user_captcha_value)) {
    //   console.log(user_captcha_value);
    // } else {
    //   return toast('CaptCha Not Verified');
    // }

    signIn(email, password)
      .then(() => {
        // console.log(result.user);
        Swal.fire({
          icon: 'success',
          title: 'Log In successful',
          showConfirmButton: false,
          timer: 1500,
        });

        navigate(location?.state || '/');
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title:
            'Something went wrong. Please provide a registered email and password.',
          showConfirmButton: true,
        });
      });
  };

  // useEffect(() => {
  //   loadCaptchaEnginge(6);
  // }, []);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(setLoading, 500, false);
  }, []);

  return loading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
    </div>
  ) : (
    <div className="container mx-auto  pt-20 ">
      <Helmet>
        <title>RESIDENCE HUB | Login</title>
      </Helmet>
      <div className="flex flex-col md:flex-row   min-h-screen  items-center border p-5">
        <div className=" w-full hidden md:block md:w-[50%]">
          <img
            className="h-[500px]"
            src="https://i.postimg.cc/W3LwZndC/Register.jpg"
            alt=""
          />
        </div>
        <div className="w-full md:w-[50%] h-[500px]">
          <div className="w-[80%] mx-auto  ">
            <div className="mb-4 h-20 rounded-3xl w-full shadow-lg bg-[#399edd] flex justify-center items-center text-3xl font-extrabold text-white">
              <h3>Sign In</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block font-bold mb-2 text-sm"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...register('email', { required: true })}
                    placeholder="Email address"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                  />
                  {errors.email && (
                    <span className="text-red-500">Email is required</span>
                  )}
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm font-bold">
                      Password
                    </label>
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="text-xs hover:underline text-gray-600"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={type ? 'text' : 'password'}
                      name="password"
                      id="password"
                      placeholder="password"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                      {...register('password', { required: true })}
                    />
                    {errors.password && (
                      <span className="text-red-500">Password is required</span>
                    )}
                    <span
                      className="absolute right-5 top-2 "
                      onClick={() => setType(!type)}
                    >
                      {type ? (
                        <IoEye className="text-2xl" />
                      ) : (
                        <IoEyeOff className="text-2xl" />
                      )}
                    </span>{' '}
                  </div>
                </div>
              </div>
              {/* <div>
                <label className="block font-bold mb-2 text-sm">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  name="captcha"
                  id="captcha"
                  ref={captChaRef}
                  required
                  placeholder="Type the text above in captcha"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                />
              </div> */}
              <div className="space-y-2">
                <div>
                  <input
                    type="submit"
                    value="Log In"
                    className="w-full btn px-8 py-3 cursor-pointer font-semibold rounded-md bg-[#399edd] text-gray-50"
                  />
                </div>
                <p className="px-6  text-center text-gray-600">
                  <span className="mr-2"> Don&apos;t have an account yet?</span>
                  <Link to={'/register'}>
                    <button
                      rel="noopener noreferrer"
                      href="#"
                      className="hover:underline text-[#399edd] cursor-pointer font-bold  "
                    >
                      Sign up
                    </button>
                  </Link>
                </p>
              </div>
            </form>
            <SocialLogin />
          </div>
        </div>
      </div>

      <ScrollRestoration />
    </div>
  );
};

export default SignIn;
