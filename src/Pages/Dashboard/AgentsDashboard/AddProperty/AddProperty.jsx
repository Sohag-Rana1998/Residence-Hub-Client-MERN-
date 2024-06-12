import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAuth from '../../../../hooks/useAuth';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import SectionTitle from '../../../../components/Shared/SectionTitle';
import useRole from '../../../../hooks/userRole';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ScaleLoader from 'react-spinners/ScaleLoader';
const AddProperty = () => {
  const { user } = useAuth();
  const { loggedUser, isPending, refetch } = useRole();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { mutateAsync } = useMutation({
    mutationFn: async propertyData => {
      const { data } = await axiosSecure.post(`/add-property`, propertyData);
      return data;
    },
    onSuccess: () => {
      // console.log('Data Saved Successfully');
      Swal.fire({
        icon: 'success',
        title: 'Property Added Successfully!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/dashboard/added-properties');
      reset();
      refetch();
    },
  });
  const onSubmit = async data => {
    if (loggedUser?.role === 'Fraud')
      return toast.error('You are not allowed to add any properties');

    // console.log(data);
    // image upload to imgbb and then get an url
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    // console.log(res.data.data);
    if (res.data.success) {
      try {
        const propertyData = {
          title: data.title,
          location: data.location,
          minimumPrice: parseFloat(data.price),
          maximumPrice: parseFloat(data.price1),
          image: res?.data?.data?.display_url,
          description: data.description,
          facilities: data.facilities,
          area: data.area,
          status: 'Pending',
          agentName: data.agent_name,
          agentEmail: data.agent_email,
          agentImg: user?.photoURL,
        };
        // console.log(propertyData);

        //   Post request to server
        await mutateAsync(propertyData);
      } catch (err) {
        // console.log(err);
        toast.error(err.message);
      }
    }

    // console.log('with image url', data);
  };

  return isPending ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
    </div>
  ) : (
    <div className="px-10 pb-10">
      <Helmet>
        <title>RESIDENCE HUB | Add Properties</title>
      </Helmet>
      <div>
        <SectionTitle
          heading={'Add Property'}
          subheading={'Home/Dashboard/Add-Property'}
        ></SectionTitle>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" ">
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="mt-4">
            <label htmlFor="title" className="block mb-2 font-bold text-sm">
              Property Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              {...register('title', { required: true })}
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
              id="location"
              {...register('location', { required: true })}
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
              id="area"
              {...register('area', { required: true })}
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
              id="facilities"
              {...register('facilities', { required: true })}
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
                  {...register('price', { required: true })}
                  id="price"
                  placeholder="Min-Price"
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
                  {...register('price1', { required: true })}
                  id="price1"
                  placeholder="Max-Price"
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
                {...register('agent_name', {
                  required: true,
                })}
                value={user?.displayName}
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
                {...register('agent_email', {
                  required: true,
                })}
                value={user?.email}
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
            name="description"
            id="description"
            {...register('description', { required: true })}
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
              value="Add Property"
              className="w-full btn px-8 mt-4 py-3 font-semibold cursor-pointer rounded-md bg-[#399edd] text-white hover:text-black"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
