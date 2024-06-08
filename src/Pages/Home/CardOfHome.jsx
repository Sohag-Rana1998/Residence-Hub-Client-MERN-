import PropTypes from 'prop-types';
import { GrLinkNext } from 'react-icons/gr';
import { FaLocationDot } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
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
    image_url2,
    image_url3,
  } = estate;

  return (
    <div className="w-full">
      <div className="w-full  h-full  rounded-2xl shadow-2xl  ">
        <div className="m-0 p-0 ">
          <div className="relative h-80 rounded-t-xl ">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
              className="mySwiper h-80 rounded-t-xl"
            >
              <SwiperSlide>
                <div className=" h-full w-full rounded-t-xl">
                  <img
                    className="h-full w-full rounded-t-xl overflow-hidden hover:scale-105 duration-300"
                    src={image}
                    alt=""
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" h-full w-full rounded-xl  ">
                  <img
                    className="h-full w-full rounded-xl overflow-hidden hover:scale-105 duration-300"
                    src={image_url2}
                    alt=""
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className=" h-full w-full rounded-t-xl ">
                  <img
                    className="h-full w-full rounded-t-xl overflow-hidden hover:scale-105 duration-500"
                    src={image_url3}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            </Swiper>
            <button
              className={`px-3 py-2 rounded-tr-xl ${
                status === 'Verified' ? 'bg-blue-500' : 'bg-red-400 '
              }  absolute z-10 right-0 top-0 text-white font-bold bg-opacity-80`}
            >
              {status}
            </button>

            <div className="absolute bottom-0 z-50 left-0 bg-black/60  p-2 rounded-tr-lg ">
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
