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
import toast from 'react-hot-toast';
import ScaleLoader from 'react-spinners/ScaleLoader';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const [type, setType] = useState(false);
  const { updateUserProfile, createUser } = useAuth();
  const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const date = new Date();
  console.log(date);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async data => {
    // image upload to imgbb and then get an url
    const imageFile = { image: data.photo[0] };

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    console.log(res.data.data);
    if (res.data.success) {
      const photo = res?.data?.data?.display_url;

      try {
        //2. User Registration
        const result = await createUser(data.email, data.password);
        console.log(result);

        // 3. Save username and photo in firebase
        await updateUserProfile(data.name, photo);
        const userInfo = {
          name: data.name,
          email: data.email,
          photo: photo,
          date: date,
        };
        const { data: data1 } = await axiosPublic.post('/users', userInfo);
        console.log(data1);
        reset();
        Swal.fire({
          icon: 'success',
          title:
            'Congratulation! Your account has been registered successfully',
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(location.state || '/');
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(setLoading, 500, false);
  }, []);
  return loading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
    </div>
  ) : (
    <div className=" container mx-auto  pt-20 ">
      <Helmet>
        <title>RESIDENCE HUB| Register</title>
      </Helmet>
      <div className="flex flex-col md:flex-row-reverse  items-center border p-5">
        <div className=" w-full hidden md:block md:w-[50%]">
          <img
            className="h-[500px]"
            src="https://i.postimg.cc/W3LwZndC/Register.jpg"
            alt=""
          />
        </div>
        <div className="w-full md:w-[50%] ">
          <div className="w-[80%] mx-auto  ">
            <div className="mb-4 h-20 rounded-3xl w-full shadow-lg bg-[#399edd] flex justify-center items-center text-3xl font-extrabold text-white">
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
                    Your Profile Picture
                  </label>
                  <input
                    type="file"
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
