import {
  Link,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import Swal from 'sweetalert2';

import SocialLogin from '../../components/SocialLogin/SocialLogin';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const axiosPublic = useAxiosPublic();
  const [type, setType] = useState(false);
  const { updateUserProfile, createUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = data => {
    createUser(data.email, data.password)
      .then(result => {
        navigate(location.state || '/');
        const userInfo = {
          name: data.name,
          email: data.email,
          photo: data.photo,
        };
        axiosPublic.post('/users', userInfo).then(res => {
          console.log(res.data);
          console.log(result.user);
          updateUserProfile(data.name, data.photo);
          reset();
          Swal.fire({
            icon: 'success',
            title:
              'Congratulation! Your account has been registered successfully',
            showConfirmButton: true,
          });
          navigate(location.state || '/');
        });
      })
      .catch(errors => console.log(errors.message));
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(setLoading, 500, false);
  }, []);
  return loading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  ) : (
    <div className="flex  min-h-screen container mx-auto  flex-col justify-between items-center mb-10 ">
      <Helmet>
        <title>Bistro Boss Restaurant | Register</title>
      </Helmet>
      <div className="flex flex-col px-2 md:px-20 md:flex-row-reverse  items-center  p-5 ">
        <div className=" w-full  md:w-[50%]">
          <img
            className="h-[500px]"
            src="https://i.postimg.cc/W3LwZndC/Register.jpg"
            alt=""
          />
        </div>
        <div className="w-full h-auto md:w-[50%] px-20">
          <div className="flex flex-col  justify-center items-center  w-full  ">
            <div className="mb-4 h-20 rounded-3xl w-60 shadow-lg bg-[#399edd] flex justify-center items-center text-3xl font-extrabold text-white">
              <h3>Sign Up</h3>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 font-bold text-sm"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    {...register('name', { required: true })}
                    placeholder="Your Name"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 "
                  />
                  {errors.name && (
                    <span className="text-red-500">Name is required</span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="photo"
                    className="block mb-2 font-bold text-sm"
                  >
                    Your Photo URL
                  </label>
                  <input
                    type="text"
                    name="photo"
                    id="photo"
                    {...register('photo', { required: true })}
                    placeholder="Your PhotoURL"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50"
                  />
                  {errors.photo && (
                    <span className="text-red-500">Photo URL is required</span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 font-bold text-sm"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    {...register('email', { required: true })}
                    id="email"
                    placeholder="Email address"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                  />
                  {errors.email && (
                    <span className="text-red-500">Email is required</span>
                  )}
                </div>
                <div>
                  <div className="flex  justify-between mb-2">
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
                      {...register('password', {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/,
                      })}
                      placeholder="password"
                      className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                    />{' '}
                    {errors.password?.type === 'required' && (
                      <p className="text-red-500">Password is required</p>
                    )}
                    {errors.password?.type === 'minLength' && (
                      <p className="text-red-500">
                        Password must be six character
                      </p>
                    )}
                    {errors.password?.type === 'pattern' && (
                      <p className="text-red-500">
                        Password must have one Uppercase and one special
                        characters.
                      </p>
                    )}
                    <span
                      className="absolute right-5 top-2 "
                      onClick={() => setType(!type)}
                    >
                      {type ? (
                        <IoEye className="text-2xl text-black" />
                      ) : (
                        <IoEyeOff className="text-2xl text-black" />
                      )}
                    </span>{' '}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <input
                    type="submit"
                    value="Register"
                    className="w-full px-8 py-3 font-semibold cursor-pointer rounded-md bg-[#399edd] text-gray-50"
                  />
                </div>
                <p className="px-6 text-sm text-center ">
                  Already have an account yet?
                  <Link to={'/login'}>
                    {' '}
                    <button className="hover:underline cursor-pointer font-bold text-xl text-[#399edd]">
                      Log In
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

export default SignUp;
