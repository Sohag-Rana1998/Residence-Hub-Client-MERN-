import { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay } from 'swiper/modules';

export default function TrustedCompany() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

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
      return 7;
    } else {
      return 4;
    }
  }

  return (
    <>
      <div className="max-w-full  px-2 md:px-20 py-5 h-auto  md:h-[150px] bg-[#F1F5F8]">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-center mb-3">
            Trusted By 2000+ Companies
          </h3>
          <Swiper
            slidesPerView={slidesPerView}
            loop={true}
            spaceBetween={20}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper  h-auto md:h-[100px] "
            onAutoplayTimeLeft={onAutoplayTimeLeft}
          >
            <SwiperSlide>
              <img src="https://i.postimg.cc/RCDZ1tSs/slack.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.postimg.cc/R0SmxCCJ/pp.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.postimg.cc/7hDd0mCG/spotify.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.postimg.cc/nrcTn5jk/samsung.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.postimg.cc/636CZZW6/googl.png" alt="" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="https://i.postimg.cc/sD90Pqtf/amazon.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.postimg.cc/sfWY7Wt3/airbnb.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.postimg.cc/RCDZ1tSs/slack.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.postimg.cc/R0SmxCCJ/pp.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.postimg.cc/7hDd0mCG/spotify.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.postimg.cc/nrcTn5jk/samsung.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.postimg.cc/636CZZW6/googl.png" alt="" />
            </SwiperSlide>

            <SwiperSlide>
              <img src="https://i.postimg.cc/sD90Pqtf/amazon.png" alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://i.postimg.cc/sfWY7Wt3/airbnb.png" alt="" />
            </SwiperSlide>

            <div className="autoplay-progress hidden" slot="container-end">
              <svg viewBox="0 0 48 48" ref={progressCircle}>
                <circle cx="24" cy="24" r="20"></circle>
              </svg>
              <span ref={progressContent}></span>
            </div>
          </Swiper>
        </div>
      </div>
    </>
  );
}
