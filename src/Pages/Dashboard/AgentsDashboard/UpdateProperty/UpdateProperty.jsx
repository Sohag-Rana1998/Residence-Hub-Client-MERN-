import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import usePropertyById from '../../../../hooks/usePropertyById';
import useAuth from '../../../../hooks/useAuth';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';
import ScaleLoader from 'react-spinners/ScaleLoader';
const UpdateProperty = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { property, refetch, isLoading } = usePropertyById(id);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  console.log(property);

  useEffect(() => {
    setTimeout(setLoading, 500, false);
  }, []);
  const {
    _id,
    title,
    location,
    image,
    facilities,
    maximumPrice,
    minimumPrice,
    status,
    area,
    description,
  } = property;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: async propertyData => {
      const { data } = await axiosSecure.put(`/property/${_id}`, propertyData);
      return data;
    },
    onSuccess: () => {
      console.log('Property Saved Successfully');
      Swal.fire({
        icon: 'success',
        title: 'Property Updated Successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      reset();
      navigate('/dashboard/added-properties');

      refetch();
    },
  });
  const onSubmit = async data => {
    console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };

    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    console.log(res.data.data);
    if (res.data.success) {
      try {
        const propertyData = {
          title: data.title,
          location: data.location,
          minimumPrice: parseFloat(data.price),
          maximumPrice: parseFloat(data.price1),
          image: res?.data?.data?.display_url || image,
          description: data.description,
          facilities: data.facilities,
          area: data.area,
          status: status,
          agentName: user?.displayName,
          agentEmail: user?.email,
          agentImg: user?.photoURL,
        };
        console.log(propertyData);

        //   Post request to server
        await mutateAsync(propertyData);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  };
  return loading || isLoading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
    </div>
  ) : (
    <div className="px-10 pb-10">
      <Helmet>
        <title>RESIDENCE HUB | Update Properties</title>
      </Helmet>
      <div className="flex justify-center ">
        <div className="w-[280px]  p-3 text-center rounded-t-3xl">
          <h3 className="text-3xl font-bold border-b-2 pb-1">
            Update Property
          </h3>
          <h3 className="text-sm mt-2">Home/Dashboard/Added-Property/Update</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" ">
        <div className="space-y-4 grid grid-cols-2 gap-5">
          <div className="mt-4">
            <label htmlFor="title" className="block mb-2 font-bold text-sm">
              Property Title
            </label>
            <input
              type="text"
              name="title"
              defaultValue={title}
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
              Location
            </label>
            <input
              type="text"
              name="location"
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
            <label htmlFor="area" className="block mb-2 font-bold text-sm">
              Area
            </label>
            <input
              type="text"
              name="area"
              defaultValue={area}
              id="area"
              {...register('area')}
              placeholder="Area by sq feet"
              className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 "
            />
            {errors.area && (
              <span className="text-red-500">Area is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="facilities"
              className="block mb-2 font-bold text-sm"
            >
              Facilities
            </label>
            <input
              type="text"
              name="facilities"
              defaultValue={facilities}
              id="facilities"
              {...register('facilities')}
              placeholder="Facilities"
              className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 "
            />
            {errors.facilities && (
              <span className="text-red-500">Facilities is required</span>
            )}
          </div>
          <div>
            <label htmlFor="image" className="block mb-2 font-bold text-sm">
              Property Image
            </label>
            <input
              type="file"
              name="image"
              id="image"
              {...register('image', { required: true })}
              placeholder="Property image"
              className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 "
            />
            {errors.image && (
              <span className="text-red-500">Image is required</span>
            )}
          </div>
          <div>
            <label htmlFor="price" className="block mb-2 font-bold text-sm">
              Price Range
            </label>
            <div className="flex items-center gap-3">
              <div>
                <input
                  type="number"
                  name="price"
                  defaultValue={minimumPrice}
                  {...register('price')}
                  id="price"
                  placeholder="Minimum Price"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                />
                {errors.price && (
                  <span className="text-red-500">This is required</span>
                )}
              </div>
              <div>
                <input
                  type="number"
                  name="price1"
                  defaultValue={maximumPrice}
                  {...register('price1')}
                  id="price1"
                  placeholder="Maximum Price"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
                />
                {errors.price1 && (
                  <span className="text-red-500">This is required</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex  justify-between mb-2">
              <label htmlFor="agent_name" className="text-sm font-bold">
                Agent Name
              </label>
            </div>
            <div>
              <input
                type="text"
                name="agent_name"
                id="agent_name"
                disabled
                defaultValue={user?.displayName}
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
          </div>
          <div>
            <div className="flex  justify-between mb-2">
              <label htmlFor="agent_email" className="text-sm font-bold">
                Agent Email
              </label>
            </div>
            <div>
              <input
                type="email"
                name="agent_email"
                id="agent_email"
                disabled
                defaultValue={user?.email}
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800"
              />
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 mt-4 font-bold text-sm"
          >
            Property Description
          </label>
          <textarea
            rows="5"
            type="text"
            defaultValue={description}
            name="description"
            id="description"
            {...register('description')}
            placeholder="Description about property"
            className="w-full textarea px-3 py-2 border rounded-md border-gray-300 bg-gray-50"
          ></textarea>
          {errors.description && (
            <span className="text-red-500">Description URL is required</span>
          )}
        </div>
        <div className="space-y-2">
          <div>
            <input
              type="submit"
              value="Update Property"
              className="w-full btn px-8 mt-4 py-3 font-semibold cursor-pointer rounded-md bg-[#399edd] text-white hover:text-black"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProperty;
