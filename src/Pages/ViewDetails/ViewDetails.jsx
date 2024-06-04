import { ScrollRestoration, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FaLocationDot } from 'react-icons/fa6';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useState } from 'react';
import usePropertyById from '../../hooks/usePropertyById';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useReviewsById from '../../hooks/useReviewsById';

const ViewDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  // const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0); // Initial value
  const [modalLoading, setModalLoading] = useState(true);

  const { property, isLoading, refetch } = usePropertyById(id);

  const { reviews, reload } = useReviewsById(id);
  console.log(reviews);
  const {
    title,
    agentName,
    description,
    minimumPrice,
    maximumPrice,
    status,
    area,
    location,
    facilities,
    image,
    agentImg,
    agentEmail,
  } = property;

  const present = new Date();

  const { mutateAsync: mutateAsync1 } = useMutation({
    mutationFn: async propertyData => {
      const { data } = await axiosSecure.post(
        `/wishlist-property`,
        propertyData
      );
      console.log(data);
      if (data.message) {
        toast.error(data.message);
      }
      if (data.insertedId) {
        reload();
        refetch();
        Swal.fire({
          icon: 'success',
          title: 'Your Property Added Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    },
  });

  const handleAddToWishList = async () => {
    if (agentEmail == user?.email) {
      return toast.error('You are not eligible bus this property.');
    }

    const email = user?.email;
    const name = user?.displayName;
    const propertyId = id;
    console.log(email);
    const propertyData = {
      propertyId,
      title,
      image,
      description,
      minimumPrice,
      maximumPrice,
      status,
      area,
      location,
      facilities,
      agentImg,
      agentName,
      agentEmail,
      date: present,
      buyerName: name,
      buyerEmail: email,
    };

    try {
      mutateAsync1(propertyData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessageSent = e => {
    e.preventDefault();
    toast.success('Message sent successfully!');
  };

  const { mutateAsync } = useMutation({
    mutationFn: async reviewData => {
      const { data } = await axiosSecure.post(`/add-review`, reviewData);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      console.log('Your Review Added Successfully');
      Swal.fire({
        icon: 'success',
        title: 'Your Review Added Successfully',
        showConfirmButton: false,
        timer: 1500,
      });

      reload();
      refetch();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    console.log(data);

    const reviewData = {
      propertyId: id,
      propertyTitle: title,
      name: data.name,
      agentName: agentName,
      email: user?.email,
      photo: user?.photoURL,
      review: data.review,
      star: rating,
      date: present,
    };
    console.log(reviewData);

    try {
      await mutateAsync(reviewData);
      reset();
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log(present);
  return isLoading ? (
    <div className="w-[80%] mx-auto min-h-screen ">
      {/* <SkeletonTheme baseColor="#a2a2b2">
        <div>
          <div className="mt-10 mb-5">
            <Skeleton height={150} />
          </div>

          <Skeleton height={30} count={10} />
        </div>
      </SkeletonTheme> */}
    </div>
  ) : (
    <div className=" ">
      <Helmet>
        <title>Job Portal | Details </title>
      </Helmet>
      <div className="h-32 mb-10 bg-[url(https://i.ibb.co/PtcPs7P/6.jpg)] bg-no-repeat bg-cover bg-center md:h-40  w-full rounded-xl flex justify-between items-center">
        <h1 className="text-2xl h-full text-white flex items-center  w-full md:text-4xl font-bold   justify-center">
          Property Details
        </h1>
      </div>

      <div className="h-auto px-4 md:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
          <div className="flex flex-col w-full lg:w-[70%]   justify-between gap-5 items-start">
            <div color="transparent" className="m-0 w-full p-0 rounded-none">
              <div className="relative overflow-hidden rounded-2xl h-[300px] md:h-[500px]">
                <img
                  src={image}
                  className="w-full rounded-2xl  h-full hover:scale-[105%] duration-700"
                  alt="ui/ux review check"
                />
                <span className="bg-blue-500 bottom-0 right-0 absolute py-3 px-5 text-white rounded-br-2xl text-sm font-bold">
                  {status}
                </span>
              </div>
            </div>

            <div className="flex w-full flex-col  justify-between h-auto  ">
              <div>
                <div>
                  <div className="">
                    <h3 className="text-2xl font-bold">Job Title: {title}</h3>
                    <h4 className="flex gap-2 items-center text-xl font-semibold">
                      <FaLocationDot /> {location}
                    </h4>
                  </div>

                  <p className="text-lg mt-2">
                    <span className="font-bold">Details About The Job: </span>
                    {description}
                  </p>
                  <p> Facilities:{facilities}</p>
                </div>
              </div>
              <div>
                <div className="font-bold">
                  <div>
                    <img
                      src={agentImg}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <h4>Agent Name: {agentName}</h4>
                  <h4>Agent Email: {agentEmail}</h4>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleAddToWishList(id)}
                  className="btn rounded-3xl text-white  bg-blue-500"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>

          <div className="w-full hidden lg:block lg:w-[27%] border rounded-2xl shadow-md p-5  ">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Contact With Agent:
            </h3>
            <form onSubmit={handleMessageSent} className="">
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  defaultValue={user?.displayName}
                  type="text"
                  disabled
                  className="block w-full px-4 py-2 mt-2  bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Your Email
                </label>
                <input
                  id="name"
                  name="name"
                  disabled
                  defaultValue={user?.email}
                  type="email"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className="" htmlFor="name">
                  Phone
                </label>
                <input
                  id="name"
                  name="phone"
                  type="number"
                  placeholder="Phone Number"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Subject
                </label>
                <input
                  id="name"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                />
              </div>
              <div className="mb-5">
                <label className=" " htmlFor="name">
                  Message
                </label>
                <textarea
                  id="name"
                  name="message"
                  type="text"
                  rows="5"
                  placeholder="Message"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                ></textarea>
              </div>
              <button className="btn rounded-3xl w-full bg-gray-900 text-white hover:bg-[#FF4153]">
                Send
              </button>
            </form>
          </div>
        </div>
        <div>
          <div>
            <div>
              <h3 className="text-3xl font-bold">Reviews:</h3>
            </div>
          </div>
          <div className="w-full lg:w-[70%]">
            {reviews && reviews?.length > 0 ? (
              <div className="border shadow-md p-5">
                {reviews.map(review => (
                  <div key={review._id} className="mb-4 bg-gray-100 p-5">
                    <div>
                      <div className="flex justify-center items-center flex-col ">
                        <p className="text-center">{review.review}</p>

                        <Rating style={{ maxWidth: 140 }} value={review.star} />
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <img
                            src={review.photo}
                            className="w-12 h-12 rounded-full"
                            alt=""
                          />
                          <h3 className="">{review.name}</h3>
                        </div>
                        <div>
                          <div>
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                          <div>
                            {new Date(review.date).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
            <div className="my-5 flex justify-end">
              {' '}
              <label
                onClick={() => {
                  setModalLoading(false);
                  setTimeout(setModalLoading, 500, true);
                }}
                htmlFor="my_modal_6"
                className="btn bg-blue-500 w-full md:w-40 rounded-3xl hover:bg-gray-500 text-white"
              >
                Add a review
              </label>
            </div>
          </div>
        </div>
        <div className="w-full lg:hidden block  border rounded-2xl shadow-md p-5  "></div>
        {/* Modal for update  */}
        <div className="w-full mx-auto">
          <input type="checkbox" id="my_modal_6" className="modal-toggle" />
          <div className="modal max-w-7xl mx-auto" role="dialog">
            <div className="modal-box !max-w-3xl !max-h-[500px] right-0 absolute!">
              {modalLoading ? (
                <div>
                  <div>
                    {/* form */}
                    <div className="w-full">
                      <div className="w-full  border rounded-md mt-5 p-5 shadow-md">
                        <h3 className="text-2xl font-bold ">
                          Add Your Review Here:
                        </h3>
                        <div>
                          <form onSubmit={handleSubmit(onSubmit)} className="">
                            <div className="mb-5">
                              <label className=" " htmlFor="name">
                                Name
                              </label>
                              <input
                                id="name"
                                name="name"
                                type="text"
                                {...register('name')}
                                defaultValue={user?.displayName}
                                readOnly
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                              />
                            </div>

                            <div className="mb-5">
                              <label className="font-bold" htmlFor="review">
                                Review
                              </label>
                              <textarea
                                id="review"
                                name="review"
                                type="text"
                                rows="5"
                                placeholder="Write something here"
                                {...register('review', { required: true })}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40  focus:outline-none focus:ring"
                              ></textarea>
                              {errors.email && (
                                <span className="text-red-500">
                                  This field is required
                                </span>
                              )}
                              <div className="flex justify-center p-4">
                                <Rating
                                  style={{ maxWidth: 200 }}
                                  value={rating}
                                  isRequired
                                  onChange={setRating}
                                />
                              </div>
                            </div>
                            <div className="mt-6">
                              <button className="modal-action w-full flex justify-center  p-3">
                                <label
                                  htmlFor="my_modal_6"
                                  className="btn w-full flex justify-center  bg-blue-500 text-white hover:bg-gray-800"
                                >
                                  Add Review
                                </label>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="w-full flex justify-end mt-2">
                        <label htmlFor="my_modal_6" className="btn">
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
      <ScrollRestoration />
    </div>
  );
};

export default ViewDetails;
