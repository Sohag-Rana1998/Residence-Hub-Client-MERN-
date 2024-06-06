// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

export default function Banner() {
  return (
    <>
      {' '}
      <div className=" mx-auto">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper h-[650px]"
        >
          <SwiperSlide>
            <div className="bg-[url(https://i.postimg.cc/Ssb0P9kL/banner-2.jpg)] h-full w-full bg-cover bg-center bg-no-repeat flex justify-center items-center flex-col text-white text-center">
              <h1 className="text-3xl md:text-5xl font-bold pl-5 ">
                Discover A Beautiful <br /> House With Us
              </h1>
              <p className="mt-5">
                Whether you&apos;re looking to sell or let your home or <br />{' '}
                want to buy a home, we really are the people for you to come to.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[url(https://i.postimg.cc/6pxmtXDw/banner-5.jpg)] h-full w-full bg-cover bg-center bg-no-repeat ">
              <div className="h-full w-full bg-black/25  flex justify-center items-center flex-col text-white text-center">
                <h1 className="text-3xl md:text-5xl font-bold    pl-5 ">
                  Your Gateway to Exceptional <br /> Living
                </h1>
                <p className="mt-5">
                  Unlock the door to exceptional living with <br /> our
                  handpicked selection of homes. Discover the epitome of
                  elegance and comfort
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[url(https://i.postimg.cc/g2HF7DgY/banner-3.jpg)] h-full w-full bg-cover bg-center bg-no-repeat ">
              <div className="h-full w-full bg-black/25  flex justify-center items-center flex-col text-white text-center">
                <h1 className="text-3xl md:text-5xl font-bold    pl-5 ">
                  Discover Endless Possibilities
                </h1>
                <p className="mt-5">
                  Embark on a journey of discovery with our <br /> diverse range
                  of properties. Explore endless possibilities for your next
                  chapter.
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[url(https://i.ibb.co/tHLXr9K/image-2.jpg)] h-full w-full bg-cover bg-center bg-no-repeat ">
              <div className="h-full w-full bg-black/10  flex justify-center items-center flex-col text-white text-center">
                <h1 className="text-3xl md:text-5xl font-bold    pl-5 ">
                  Your Dream Home Awaits
                </h1>
                <p className="mt-5">
                  Discover a world of possibilities with our extensive
                  collection of homes. <br /> Find the perfect fit for your
                  lifestyle today!
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
