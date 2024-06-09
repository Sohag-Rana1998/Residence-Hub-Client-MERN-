// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';
import useAllReviews from '../../../hooks/useAllReviews';
import { Rating } from '@smastrom/react-rating';
import { useEffect, useState } from 'react';

export default function ReviewSlider() {
  const { allReviews, refetch } = useAllReviews();
  console.log(allReviews);
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
    if (width >= 720) {
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
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper h-[400px] px-5  md:!px-10"
        >
          {allReviews?.map(review => (
            <SwiperSlide key={review.id}>
              <div className="mb-4 bg-gray-100 px-10 md:px-5 py-5 text-black rounded-sm">
                <div className="">
                  <div>
                    <div className="flex items-center gap-2">
                      <img
                        src={review.photo}
                        className="h-12 w-12 rounded-full"
                        alt=""
                      />
                      <div className="mt-3">
                        <h3>{review?.name}</h3>
                        <Rating style={{ maxWidth: 100 }} value={review.star} />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center flex-col ">
                    <img
                      className="w-12 h-10 my-2"
                      src="https://i.postimg.cc/xCfnh8DK/png-transparent-quotation-mark-apostrophe-computer-icons-quotation-text-number-sign-thumbnail.png"
                      alt=""
                    />
                    <div className="mt-2">
                      <h3 className="font-bold mb-1">
                        Property Title:{review?.propertyTitle}
                      </h3>
                    </div>
                    <p className="text-center">{review.review}</p>
                  </div>
                  <div className="flex justify-end mt-3">
                    {' '}
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