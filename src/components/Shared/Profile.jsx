import PropTypes from 'prop-types';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaPinterest,
  FaTwitter,
  FaUserGraduate,
  FaUserTie,
  FaVimeo,
} from 'react-icons/fa6';
import { IoLocationSharp } from 'react-icons/io5';
import { TbEdit } from 'react-icons/tb';
import { Helmet } from 'react-helmet-async';
import { FaEnvelope } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useMutation } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';

const Profile = ({ user, refetch }) => {
  const { updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const [modalLoading, setModalLoading] = useState(true);
  const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  // for profile update
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // for profile update
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: refresh,
  } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: async userInfo => {
      const { data } = await axiosSecure.put(
        `/update-user/${user?._id}`,
        userInfo
      );
      return data;
    },
    onSuccess: () => {
      setTimeout(refetch, 1000);
      Swal.fire({
        icon: 'success',
        title: 'Profile updated Successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      refresh();
      reset();
    },
  });

  // handle Update profile picture
  const onSubmit1 = async data => {
    const imageFile = { image: data?.image[0] };
    // console.log(imageFile);
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    // console.log(res.data.data);

    if (res.data.success) {
      const photo = res?.data?.data?.display_url;
      try {
        const userInfo = {
          email: user?.email,
          name: user?.name,
          photo: photo,
          role: user?.role,
          address: user?.address,
          phone: user?.phone,
          education: user?.education,
          profession: user?.profession,
          about: user?.about,
          gender: user?.gender,
        };
        // console.log(userInfo);

        await mutateAsync(userInfo);
        await updateUserProfile(user?.name, photo || user?.photo);
      } catch (err) {
        // console.log(err);
        toast.error(err.message);
      }
    }
  };

  // handle Update profile
  const onSubmit = async data => {
    const userInfo = {
      email: user?.email,
      name: data?.name || user?.name,
      photo: user?.photo,
      role: user?.role,
      address: data.address || user?.address,
      phone: data.phone || user?.phone,
      education: data.education || user?.education,
      profession: data.profession || user?.profession,
      about: data.about || user?.about,
      gender: data.gender || user?.gender,
    };
    // console.log(userInfo);
    try {
      await mutateAsync(userInfo);
      await updateUserProfile(data.name || user?.name, user?.photo);
    } catch (error) {
      // console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container  mx-auto    rounded-lg ">
      <Helmet>
        <title>RESIDENCE HUB | Profile</title>
      </Helmet>
      <div className=" w-full h-32  md:text-right text-center text-white py-5 px-10 bg-[#006770] overflow-hidden">
        <h3 className="text-3xl font-bold">Profile</h3>
        <h3 className="text-sm">Home/Dashboard/Profile</h3>
      </div>
      <div className="flex w-full flex-col  md:flex-row justify-between items-start">
        <div className="w-80  relative border-r-0 md:border-r">
          <div className="mx-auto w-32 h-32 relative -mt-10 border-4 border-white rounded-full overflow-hidden">
            <img className=" w-32 h-32 rounded-full" src={user?.photo} />
          </div>
          <label
            onClick={() => {
              setModalLoading(false);
              setTimeout(setModalLoading, 500, true);
            }}
            htmlFor="my_modal_9"
            className=" h-7 cursor-pointer  w-7 rounded-full absolute top-14 right-[30%]"
          >
            <TbEdit className="text-3xl " />
          </label>
          <div className="divider"></div>
          <div className="md:hidden block text-center">
            <h2 className="font-bold text-2xl">{user?.name || 'Unknown'}</h2>
            <h4 className="text-xl font-bold">{user?.role}</h4>
          </div>
          <div className="text-lg flex justify-center items-center gap-3 mt-5">
            <FaFacebook className="cursor-pointer hover:scale-[120%] duration-500"></FaFacebook>
            <FaInstagram className="cursor-pointer hover:scale-[120%] duration-500"></FaInstagram>
            <FaTwitter className="cursor-pointer hover:scale-[120%] duration-500"></FaTwitter>
            <FaLinkedin className="cursor-pointer hover:scale-[120%] duration-500"></FaLinkedin>
            <FaPinterest className="cursor-pointer hover:scale-[120%] duration-500"></FaPinterest>
            <FaVimeo className="cursor-pointer hover:scale-[120%] duration-500"></FaVimeo>
          </div>
          <div className="w-full flex justify-center mt-4">
            <label
              onClick={() => {
                setModalLoading(false);
                setTimeout(setModalLoading, 500, true);
              }}
              htmlFor="my_modal_8"
              className="btn bg-blue-500 flex items-center w-full md:w-48 rounded-xl hover:bg-gray-500 text-white"
            >
              Update Your Profile
            </label>
          </div>
        </div>
        <div className=" flex-1">
          <div className="px-5 mt-5">
            <div className="hidden md:block">
              <h2 className="font-bold text-4xl">{user?.name || 'Unknown'}</h2>
              <h4 className="text-xl font-bold">{user?.role}</h4>
            </div>
            <div className="mt-5 space-y-2">
              <p className=" font-semibold flex items-center gap-2">
                <FaEnvelope /> {user?.email || 'Not Found'}
              </p>
              <p className=" font-semibold flex items-center gap-2">
                <FaPhone /> +{user?.phone || 'Not Found'}
              </p>
              <p className=" font-semibold flex items-center gap-2">
                <IoLocationSharp /> {user?.address || 'Not Found'}
              </p>
              <p className=" font-semibold flex items-center gap-2">
                <FaUserTie /> {user?.profession || 'Not Found'}
              </p>
              <p className=" font-semibold flex items-center gap-2">
                <FaUserGraduate /> {user?.education || 'Not Found'}
              </p>
              <p className=" font-semibold flex items-center gap-2">
                Gender: {user?.gender || 'Not Found'}
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mt-5">About:</h3>
              <div className="w-full border bg-gray-50 min-h-40 rounded-md p-2 mb-10">
                {user?.about}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Filter by Price */}
      <div className=" ">
        <input type="checkbox" id="my_modal_8" className="modal-toggle" />
        <div className="modal  mx-auto h-full w-full" role="dialog">
          <div
            style={{
              scrollbarWidth: 'none',
            }}
            className="modal-box h-full  !max-w-3xl w-full right-0 !p-5 absolute!"
          >
            {modalLoading ? (
              <div>
                <div>
                  {/* form */}
                  <div className="w-full ">
                    <div className="w-full  border rounded-md mt-5 p-5 shadow-md">
                      <h3 className="text-2xl font-bold text-center">
                        Update Your Profile
                      </h3>
                      <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="mb-5">
                              <label className="font-bold" htmlFor="name">
                                Name
                              </label>
                              <input
                                id="name"
                                name="name"
                                type="text"
                                {...register('name')}
                                placeholder="Your Name"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                              />
                              {errors.name && (
                                <span className="text-red-500">
                                  This field is required
                                </span>
                              )}
                            </div>
                            <div className="mb-5">
                              <label className="font-bold" htmlFor="address">
                                Address
                              </label>
                              <input
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Your Address"
                                {...register('address')}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                              />
                            </div>
                            <div className="mb-5">
                              <label className="font-bold" htmlFor="phone">
                                Phone Number
                              </label>
                              <input
                                id="phone"
                                name="phone"
                                type="number"
                                placeholder="Phone number"
                                {...register('phone')}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                              />
                            </div>
                            <div className="mb-5">
                              <label className="font-bold" htmlFor="education">
                                Educational Qualification
                              </label>
                              <input
                                id="education"
                                name="education"
                                type="text"
                                placeholder="Education"
                                {...register('education')}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                              />
                            </div>
                            <div className="mb-5">
                              <label className="font-bold" htmlFor="profession">
                                Profession
                              </label>
                              <input
                                id="profession"
                                name="profession"
                                type="text"
                                placeholder="Your Profession"
                                {...register('profession')}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                              />
                            </div>

                            <div>
                              <h4 className="font-bold mb-2">Gender</h4>
                              <select
                                id="gender"
                                {...register('gender', { required: true })}
                                className="border rounded-lg py-2 px-5  w-full  "
                              >
                                <option value={''} disabled selected>
                                  Select one
                                </option>
                                <option value={'Male'}>Male</option>
                                <option value={'Female'}>Female</option>
                                <option value={'Custom'}>Custom</option>
                              </select>
                            </div>
                          </div>
                          <div className="mb-5">
                            <label className="font-bold" htmlFor="about">
                              About
                            </label>
                            <textarea
                              id="about"
                              name="about"
                              rows={5}
                              type="text"
                              placeholder="Write about yourself"
                              {...register('about')}
                              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="mt-6">
                            <button className="modal-action w-full flex justify-center  p-3">
                              <label
                                htmlFor="my_modal_8"
                                className="btn w-full flex justify-center  bg-blue-500 text-white hover:bg-gray-800"
                              >
                                Update
                              </label>
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="w-full flex justify-end mt-2">
                      <label htmlFor="my_modal_8" className="btn">
                        Cancel
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full  flex justify-center items-center">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            )}
          </div>
        </div>
        <div className=" mx-auto h-auto w-full md:w-48">
          <input type="checkbox" id="my_modal_9" className="modal-toggle" />
          <div className="modal  mx-auto" role="dialog">
            <div
              style={{
                scrollbarWidth: 'none',
              }}
              className="modal-box !p-2 !h-[450px] !w-80 right-0 absolute!"
            >
              {modalLoading ? (
                <div>
                  <div>
                    {/* form */}
                    <div className="w-full ">
                      <div className="w-full  border rounded-md mt-5 p-5 shadow-md">
                        <h3 className="text-2xl font-bold ">
                          Change Profile Picture:
                        </h3>
                        <div>
                          <form
                            onSubmit={handleSubmit1(onSubmit1)}
                            className=""
                          >
                            <div className="">
                              <div className="w-full flex justify-center">
                                <div className="mx-auto w-28 h-28   border-4 border-white rounded-full overflow-hidden">
                                  <img
                                    className="object-cover object-center h-32"
                                    src={user?.photo}
                                  />
                                </div>
                              </div>

                              <div className="mb-5">
                                <label className="font-bold" htmlFor="image">
                                  Choose a Picture
                                </label>
                                <input
                                  id="image"
                                  name="image"
                                  type="file"
                                  {...register1('image')}
                                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                                />
                              </div>
                            </div>

                            <div className="mt-6">
                              <button className="modal-action w-full flex justify-center  p-3">
                                <label
                                  htmlFor="my_modal_9"
                                  className="btn w-full flex justify-center  bg-blue-500 text-white hover:bg-gray-800"
                                >
                                  Change
                                </label>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="w-full flex justify-end mt-2">
                        <label htmlFor="my_modal_9" className="btn">
                          Cancel
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full  flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg"></span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};
export default Profile;
