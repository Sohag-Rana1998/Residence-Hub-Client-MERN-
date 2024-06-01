import PropTypes from 'prop-types';
import { CardBody } from '@material-tailwind/react';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
const Card = ({ estate, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    title,
    agentName,
    minimumPrice,
    maximumPrice,
    status,
    area,
    location,
    image,
  } = estate;

  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.delete(`/property/${id}`);
      return data;
    },
    onSuccess: data => {
      console.log(data);
      refetch();
      Swal.fire({
        title: 'Deleted!',
        text: 'Your file has been deleted.',
        icon: 'success',
      });
    },
  });

  //  Handle Delete
  const handleDelete = async id => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(id);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div className="w-full">
      <div className="w-full  h-full  rounded-2xl shadow-2xl  ">
        <div className="m-0 p-0 ">
          <div className="relative h-80 rounded-t-2xl overflow-hidden">
            <img
              src={image}
              className="w-full   h-full hover:scale-[110%] duration-700"
              alt="ui/ux review check"
            />
            <button className="px-8 py-3 rounded-bl-3xl bg-blue-500 absolute z-10 right-0 top-0 text-white font-bold bg-opacity-80">
              {status}
            </button>

            <p className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 rounded-t-lg ">
              <p className=" font-sm text-white text-sm flex items-center gap-2">
                <FaLocationDot />
                {location}
              </p>
            </p>
          </div>
        </div>
        <CardBody className="px-3 h-auto  ">
          <div className="flex h-full flex-col md:flex-row justify-between ">
            <div>
              {estate?.agentImg && (
                <img src={estate.agentImg} className="w-12 h-12 rounded-full" />
              )}

              <p className="font-semibold text-sm mt-1">
                <span className="font-bold">Agent Name:</span>
                {agentName}
              </p>
            </div>
            <div className="mt-3 md:mt-0">
              <span className="font-semibold text-sm bg-blue-400 p-2 text-white rounded-3xl">
                Price Range: ${minimumPrice}-{maximumPrice}
              </span>
            </div>
          </div>
          <div className="flex h-full flex-col justify-between">
            <p className="text-xl font-semibold">{title}</p>
            <div>
              <p className="font-semibold text-lg">
                <span className="font-bold">Area:</span>
                {area}
              </p>
            </div>

            <div className="flex justify-between items-start md:items-center mt-3">
              <button
                onClick={() => handleDelete(_id)}
                className="btn bg-red-300 hover:scale-[106%] duration-500"
              >
                {' '}
                Delete
              </button>
              <Link to={`/update-property/${_id}`}>
                <button className="bg-blue-600 btn mb-2  hover:scale-[106%] duration-500  text-white font-bold hover:bg-blue-gray-900">
                  Update
                </button>
              </Link>
            </div>
          </div>
        </CardBody>
      </div>
    </div>
  );
};

Card.propTypes = {
  estate: PropTypes.object,
  refetch: PropTypes.func,
};

export default Card;
