import PropTypes from 'prop-types';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
const WishlistCard = ({ property, refetch }) => {
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
  } = property;

  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.delete(`/wishlist/${id}`);
      return data;
    },
    onSuccess: data => {
      console.log(data);
      refetch();
      Swal.fire({
        title: 'Removed!',
        text: 'Your file has been removed.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  //  Handle Delete
  const handleDelete = async id => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove from wishlist!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
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
          <div className="relative h-64 rounded-t-2xl overflow-hidden">
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
        <div className="px-3 h-auto  py-1">
          <div>
            <p className="text-lg font-semibold">{title}</p>
            <div>
              <div className="">
                <span className="font-semibold text-sm ">
                  Price Range: ${minimumPrice}-{maximumPrice}
                </span>
              </div>
              <p className="font-semibold text-sm">
                <span>Area:</span>
                {area}
              </p>
            </div>
            <div className="mt-2">
              {property?.agentImg && (
                <img
                  src={property.agentImg}
                  className="w-12 h-12 rounded-full"
                />
              )}

              <p className="font-semibold text-sm mt-1">
                <span className="font-bold">Agent Name:</span>
                {agentName}
              </p>
            </div>

            <div className="flex mb-3 justify-between items-start md:items-center mt-3">
              <button
                onClick={() => handleDelete(_id)}
                className="btn bg-red-400 text-white btn-sm hover:scale-[106%] duration-500"
              >
                Remove
              </button>
              <Link to={`${_id}`}>
                <button className="bg-blue-500 btn  btn-sm   hover:scale-[106%] duration-500  text-white font-bold hover:bg-blue-gray-900">
                  Make an offer
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WishlistCard.propTypes = {
  property: PropTypes.object,
  refetch: PropTypes.func,
};

export default WishlistCard;
