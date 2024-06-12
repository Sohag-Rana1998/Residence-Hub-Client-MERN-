// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation } from 'swiper/modules';
import useAllReviews from '../../../hooks/useAllReviews';
import { Rating } from '@smastrom/react-rating';
import { useEffect, useState } from 'react';

export default function ReviewSlider() {
  const { allReviews, refetch } = useAllReviews();
  useEffect(() => {
    refetch();
  }, []);
  const [slidesPerView, setSlidesPerView] = useState(
    getSlidesPerView(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getSlidesPerView(width) {
    if (width >= 920) {
      return 2;
    } else {
      return 1;
    }
  }

  return (
    <>
      <div className="w-full h-[500px]">
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={50}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper h-[500px]  md:h-[350px] !px-4 md:!px-14 "
        >
          {allReviews?.map(review => (
            <SwiperSlide key={review.id}>
              <div className="mb-4 bg-gray-100 px-10 rounded-xl min-h-[500px]  md:min-h-[350px] md:px-5 py-3 text-black ">
                <div className="">
                  <div></div>
                  <div className="flex justify-center items-center flex-col ">
                    <img
                      className="w-12 h-10 my-2"
                      src="https://i.postimg.cc/xCfnh8DK/png-transparent-quotation-mark-apostrophe-computer-icons-quotation-text-number-sign-thumbnail.png"
                      alt=""
                    />

                    <Rating style={{ maxWidth: 150 }} value={review.star} />
                    <div className="mt-2">
                      <h3 className="font-bold">
                        Property Title:{review?.propertyTitle}
                      </h3>
                    </div>

                    <p className="text-center mb-5">
                      {review?.review?.slice(0, 200)}
                    </p>
                  </div>
                  <div className="flex justify-between gap-5 mt-3 mb-3 items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src={review.photo}
                        className="h-12 w-12 rounded-full"
                        alt=""
                      />
                      <div className="mt-3">
                        <h3 className="font-bold">{review?.name}</h3>
                        <p>User</p>
                      </div>
                    </div>{' '}
                    Posted on:{new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
