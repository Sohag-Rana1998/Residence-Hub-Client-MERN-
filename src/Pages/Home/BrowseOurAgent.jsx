import { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay } from 'swiper/modules';
import SectionHeading from './SectionHeading';

export default function BrowseOurAgent() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return (
    <>
      <div className="w-screen flex justify-between items-center  my-20 py-5  h-[700px] lg:h-[400px] bg-[#F1F5F8]">
        <div className="max-w-7xl container flex-col lg:flex-row gap-5 mx-auto flex justify-between items-center">
          <div className="w-full lg:w-[30%]">
            <SectionHeading
              heading={'Browse Out Agents'}
              subheading={
                'Explore our Agents section to discover the experienced professionals ready to assist you. From seasoned veterans to specialized agents, find the perfect match to guide you through your real estate journey. '
              }
            />
          </div>
          <div className="w-full lg:w-[65%]">
            <Swiper
              slidesPerView={3}
              loop={true}
              spaceBetween={20}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              className="mySwiper    h-[400px]] "
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

              <div className="autoplay-progress hidden" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
