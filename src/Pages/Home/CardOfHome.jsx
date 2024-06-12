/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { GrLinkNext } from 'react-icons/gr';
import { FaLocationDot } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useState } from 'react';
const CardOfHome = ({ estate, refetch }) => {
  const [toggle, setToggle] = useState(false);
  const {
    _id,
    title,
    minimumPrice,
    maximumPrice,
    status,
    area,
    location,
    image,
    image_url2,
    image_url3,
  } = estate;
  // console.log(toggle);
  return (
    <div className="w-full">
      <div className="w-full  h-full  rounded-2xl shadow-xl  ">
        <div className="m-0 p-0 ">
          <div
            onMouseEnter={() => setToggle(true)}
            onMouseLeave={() => setToggle(false)}
            className="relative h-60 rounded-t-xl "
          >
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              pagination={{
                clickable: true,
              }}
              navigation={toggle}
              modules={[Pagination, Navigation]}
              className="mySwiper h-60 rounded-t-xl"
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
              className={`px-3 py-2 rounded-tr-xl rounded-bl-xl  ${
                status === 'Verified' ? 'bg-blue-500' : 'bg-red-400 '
              }  absolute z-10 right-0 top-0 text-white font-bold bg-opacity-80`}
            >
              {status}
            </button>

            <div className="absolute bottom-0 z-10 left-0 bg-black/60  p-2 rounded-tr-lg ">
              <p className=" font-sm text-white text-sm flex items-center gap-2">
                <FaLocationDot />
                {location}
              </p>
            </div>
          </div>
        </div>
        <div className="px-3 pb-3 h-auto  ">
          <div>
            <div className=" text-blue-500 font-bold text-xl ">
              ${minimumPrice}-{maximumPrice}
            </div>
            <p className="text-xl font-semibold">{title}</p>
            <p className="font-semibold text-lg">
              <span className="font-bold">Area:</span>
              {area}
            </p>
          </div>

          <div className="">
            <div className="">
              <div className="w-full flex justify-end">
                <Link to={`/view-details/${_id}`}>
                  <button className="bg-blue-500 btn  text-white font-bold hover:bg-blue-gray-900">
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
