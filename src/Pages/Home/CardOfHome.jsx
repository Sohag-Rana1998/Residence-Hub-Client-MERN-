import PropTypes from 'prop-types';
import { GrLinkNext } from 'react-icons/gr';
import { FaLocationDot } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

const CardOfHome = ({ estate, refetch }) => {
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
            <button
              className={`px-3 py-2 rounded-bl-3xl ${
                status === 'Verified' ? 'bg-blue-500' : 'bg-red-400 '
              }  absolute z-10 right-0 top-0 text-white font-bold bg-opacity-80`}
            >
              {status}
            </button>

            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 rounded-t-lg ">
              <p className=" font-sm text-white text-sm flex items-center gap-2">
                <FaLocationDot />
                {location}
              </p>
            </div>
          </div>
        </div>
        <div className="px-3 pb-3 h-auto  ">
          <div>
            <p className="text-xl font-semibold">{title}</p>
            <p className="font-semibold text-lg">
              <span className="font-bold">Area:</span>
              {area}
            </p>
            <span className="font-semibold text-sm  ">
              Price Range: ${minimumPrice}-{maximumPrice}
            </span>
          </div>

          <div className="">
            <div className="flex w-full flex-col md:flex-row justify-between md:items-center mt-3">
              <div className="w-full">
                <img
                  src={estate?.agentImg}
                  className="w-12 h-12 rounded-full"
                />

                <p className="font-semibold text-sm mt-1">
                  <span className="font-bold">Agent Name:</span>
                  {agentName}
                </p>
              </div>
              <div className="w-full flex justify-end">
                <Link to={`/view-details/${_id}`}>
                  <button className="bg-blue-600 btn mb-2 mt-3 md:mt-0 btn-sm md:btn-md hover:scale-[106%] duration-500  text-white font-bold hover:bg-blue-gray-900">
                    View Details <GrLinkNext className="text-xl" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CardOfHome.propTypes = {
  estate: PropTypes.object,
  refetch: PropTypes.func,
};
export default CardOfHome;
