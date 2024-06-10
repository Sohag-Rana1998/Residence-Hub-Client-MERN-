import toast from 'react-hot-toast';
import SectionTitle from '../../../../components/Shared/SectionTitle';
import useAuth from '../../../../hooks/useAuth';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useWishListDataById from '../../../../hooks/useWishListData';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Helmet } from 'react-helmet-async';
import ScaleLoader from 'react-spinners/ScaleLoader';
const MakeOffer = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const startDate = new Date();

  const { property, refetch, isLoading } = useWishListDataById(id);
  const navigate = useNavigate();
  const {
    
    title,
    location,
    propertyId,
    image,
    agentName,
    maximumPrice,
    minimumPrice,
    area,
    description,
    agentEmail,
    agentImg,
  } = property;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  console.log(startDate);
  const { mutateAsync } = useMutation({
    mutationFn: async offeredProperty => {
      const { data } = await axiosSecure.post(
        `/offered-property`,
        offeredProperty
      );
      console.log(data);
      if (data.message) {
        toast.error(data.message);
      }
      if (data.insertedId) {
        refetch();
         reset()
        Swal.fire({
          icon: 'success',
          title: 'Your Offer Submitted Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/dashboard/bought-properties');
      }
    },
  });
  const onSubmit = async data => {
    // console.log(data);
    if (data.amount < minimumPrice || data.amount > maximumPrice) {
      return toast.error('Offered Amount Must Be Within The Price Range');
    }

    const offeredProperty = {
      propertyId,
      title,
      location,
      minimumPrice,
      maximumPrice,
      OfferedAmount: data.amount,
      image: image,
      description,
      area,
      status: 'Pending',
      agentName,
      agentEmail,
      agentImg,
      buyingDate: startDate,
      buyerName: user?.displayName,
      buyerEmail: user?.email,
    };
    console.log(offeredProperty);

    try {
      await mutateAsync(offeredProperty);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return isLoading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
    </div>
  ) : (
    <div className="pb-10 px-10">
      <Helmet>
        <title>RESIDENCE HUB |Make an Offer</title>
      </Helmet>
      <div>
        <SectionTitle
          heading={'Make An Offer'}
          subheading={'Home/Dashboard/Wishlist/MakeAnOffer'}
        ></SectionTitle>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" ">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="title" className="block mb-2 font-bold text-sm">
              Property Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={title}
              readOnly
              id="title"
              {...register('title')}
              placeholder="Property Title"
              className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 "
            />
            {errors.title && (
              <span className="text-red-500">Title is required</span>
            )}
          </div>
          <div>
            <label htmlFor="location" className="block mb-2 font-bold text-sm">
              Property Location
            </label>
            <input
              type="text"
              name="location"
              readOnly
              defaultValue={location}
              id="location"
              {...register('location')}
              placeholder="Property Location"
              className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 "
            />
            {errors.location && (
              <span className="text-red-500">Location is required</span>
            )}
          </div>

          <div>
            <label htmlFor="amount" className="block mb-2 font-bold text-sm">
              Offered Amount
              <span className="ml-2 text-[12px]">
                (Price Rang: ${minimumPrice}-{maximumPrice})
              </span>
            </label>

            <div>
              <input
                type="number"
                name="amount"
                {...register('amount', {
                  required: 'This field is required',
                })}
                id="amount"
                placeholder="Offered Amount"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
              {errors.amount && (
                <span className=" text-red-500">{errors.amount.message}</span>
              )}
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Buying Date</label>

              {/* Date Picker Input Field */}
              <DatePicker
                className="border p-2 rounded-md w-full"
                selected={startDate}
              />
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div>
              <div className="mb-2">
                <label htmlFor="agent_name" className="text-sm font-bold">
                  Agent Name
                </label>
              </div>
              <div>
                <input
                  type="text"
                  name="agent_name"
                  id="agent_name"
                  readOnly
                  defaultValue={agentName}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="buyerName"
                className="block mb-2 font-bold text-sm"
              >
                Buyer Name
              </label>

              <div>
                <input
                  type="text"
                  name="buyerName"
                  {...register('buyerName')}
                  id="buyerName"
                  defaultValue={user?.displayName}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 font-bold text-sm">
              Buyer Email
            </label>

            <div>
              <input
                type="email"
                name="email"
                {...register('email')}
                id="email"
                defaultValue={user?.email}
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <input
              type="submit"
              value="Confirm Offer"
              className="w-full btn px-8 mt-4 py-3 font-semibold cursor-pointer rounded-md bg-[#399edd] text-white hover:text-black"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default MakeOffer;
