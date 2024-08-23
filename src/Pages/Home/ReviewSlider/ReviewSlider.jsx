// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
// import required modules
import useAllReviews from "../../../hooks/useAllReviews";
import { useEffect, useState, useRef } from "react";

export default function ReviewSlider() {
  const { allReviews, refetch } = useAllReviews();

  const [slidesPerView, setSlidesPerView] = useState(
    getSlidesPerView(window.innerWidth)
  );

  const [toggle, setToggle] = useState(true);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function getSlidesPerView(width) {
    if (width > 920) {
      return 3;
    } else if (width <= 920 && width > 620) {
      return 2;
    } else {
      return 1;
    }
  }

  return (
    <>
      <div
        onMouseEnter={() => setToggle(false)}
        onMouseLeave={() => setToggle(true)}
        className="w-full mx-auto mt-10 flex justify-center items-center review-slider"
      >
        <Swiper
          slidesPerView={slidesPerView}
          loop={true}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper  max-w-7xl container mx-auto "
        >
          {allReviews &&
            allReviews?.map((review) => (
              <SwiperSlide className="h-full " key={review._id}>
                <div className="h-[280px] w-full mx-auto border p-4 flex flex-col justify-center items-center bg-white relative">
                  <img
                    className="w-10 h-8 my-2"
                    src="https://i.postimg.cc/xCfnh8DK/png-transparent-quotation-mark-apostrophe-computer-icons-quotation-text-number-sign-thumbnail.png"
                    alt=""
                  />
                  <div className="mt-1">
                    <h3 className="font-bold">
                      Property Title:{review?.propertyTitle}
                    </h3>
                  </div>
                  {review?.review?.slice(0, 220)}
                  <div className="w-10 h-10 bg-white absolute -bottom-5  left-1/2 transform -translate-x-1/2 rotate-45 "></div>
                  <div className="mt-2 w-full flex items-center justify-between">
                    <Rating style={{ maxWidth: 120 }} value={review.star} />
                    <p> {new Date(review.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mt-10">
                  <div className="flex flex-col justify-center items-center gap-1">
                    <img
                      src={review.photo}
                      className="h-20 w-20 rounded-full"
                      alt=""
                    />
                    <div className="mt-1 text-center">
                      <h3 className="text-lg font-bold">{review?.name}</h3>
                      <p className="font-medium">User</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          {toggle ? (
            <div className="autoplay-progress hidden" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          ) : (
            <></>
          )}
        </Swiper>
      </div>
      ;
    </>
  );
}
