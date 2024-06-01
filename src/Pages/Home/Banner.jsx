// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// import required modules
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { Button } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className=" relative mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        effect={'fade'}
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        className="mySwiper h-[550px]"
      >
        <SwiperSlide>
          <img
            src="https://i.ibb.co/tHLXr9K/image-2.jpg"
            alt="image 1"
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <img
            src="https://i.ibb.co/yFgKDNH/villa-1900-1900x790.webp"
            alt="image 5"
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co/ng0pBKZ/Golf-Oasis-Pool.jpg"
            alt="image 4"
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <img
            src="https://i.ibb.co/0Ycz8vn/image-1.jpg"
            alt="image 2"
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          {' '}
          <img
            src="https://i.ibb.co/0yV33WH/image-3.jpg"
            alt="image 3"
            className="h-full w-full object-cover"
          />
        </SwiperSlide>
      </Swiper>
      <div>
        <div className=" absolute z-20 left-0 top-10 mx-16  lg:left-24 md:top-28 text-white animate__animated animate__fadeInDown ">
          <p className="font-bold mb-5 ">Luxury Houses</p>
          <h1 className=" text-3xl md:text-5xl font-bold  border-l-2 border-white pl-5 ">
            Luxury <br /> Residence Here
          </h1>
          <p className="mt-5">
            Whether you&apos;re looking to sell or let your home or want to buy
            or rent a <br /> home, we really are the people for you to come to.
          </p>
          <div className="mt-5 flex flex-col  md:flex-row w-full md:w-full mx-auto md:mr-auto gap-5">
            <Link to="/buy-house">
              <Button
                size="lg"
                className="px-4 w-40 md:w-32 md:px-10 bg-teal-500 hover:bg-blue-gray-900"
              >
                Buy
              </Button>
            </Link>
            <Link to="/rent-house">
              <Button
                size="lg"
                className="px-4 w-40 md:w-32 md:px-10 bg-teal-500 hover:bg-blue-gray-900"
              >
                Rent
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
